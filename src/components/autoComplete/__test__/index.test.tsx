import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
  cleanup,
  act,
} from "@testing-library/react";
import { AutoComplete, AutoCompleteProps } from "../index";
import { config } from "react-transition-group";

config.disabled = true;

const testArray = [
  { value: "ab", number: 11 },
  { value: "abc", number: 1 },
  { value: "b", number: 4 },
  { value: "c", number: 15 },
];

const renderDefaultEl = (props: AutoCompleteProps) => {
  return <AutoComplete {...props}></AutoComplete>;
};

const defaultProps: AutoCompleteProps = {
  fetchSuggestion: (inputValue) =>
    testArray.filter((i) => i.value.indexOf(inputValue) !== -1),
  placeholder: "autocomplete",
  onSelect: jest.fn(),
};

const withRenderOptionsProps: AutoCompleteProps = {
  ...defaultProps,
  renderOptions: (item) => {
    return <div>name:{item.value}</div>;
  },
};

let wrapper: RenderResult;
let completeElement: HTMLInputElement;

describe("Test AutoComplete Component", () => {
  beforeEach(() => {
    wrapper = render(renderDefaultEl(defaultProps));
    completeElement = wrapper.getByPlaceholderText(
      "autocomplete"
    ) as HTMLInputElement;
  });

  test("should render a correct autoComplete by default Props", async () => {
    fireEvent.change(completeElement, { target: { value: "ab" } });
    // 这里有一个debounce定时器
    await waitFor(
      () => {
        expect(
          wrapper.container.querySelector(".hy-autocomplete__list")
        ).toBeInTheDocument();
      },
      {
        timeout: 400,
      }
    );
    expect(
      wrapper.container.querySelectorAll(".hy-autocomplete__item").length
    ).toEqual(2);
    expect(wrapper.getByText("ab")).toBeInTheDocument();
    expect(wrapper.getByText("abc")).toBeInTheDocument();
    expect(wrapper.queryByText("c")).toBeNull();
    fireEvent.click(wrapper.getByText("abc"));
    expect(defaultProps.onSelect).toHaveBeenCalledWith("abc");
    expect(completeElement.value).toEqual("abc");
  });

  test("should provide keyboard support", async () => {
    fireEvent.change(completeElement, { target: { value: "ab" } });
    await waitFor(() => {
      expect(
        wrapper.container.querySelector(".hy-autocomplete__list")
      ).toBeInTheDocument();
    });
    const firstResult = wrapper.getByText("ab");
    const secondResult = wrapper.getByText("abc");
    completeElement.focus();
    fireEvent.keyDown(completeElement, {
      code: "ArrowDown",
    });
    expect(firstResult).toHaveClass("is-active");
    fireEvent.keyDown(completeElement, {
      code: "ArrowDown",
    });
    expect(firstResult).not.toHaveClass("is-active");
    expect(secondResult).toHaveClass("is-active");
    fireEvent.keyDown(completeElement, {
      code: "ArrowUp",
    });
    expect(firstResult).toHaveClass("is-active");
    expect(secondResult).not.toHaveClass("is-active");
    fireEvent.keyDown(completeElement, {
      code: "Enter",
    });
    expect(completeElement.value).toEqual("ab");
  });

  test("click outside should hide the dropdown", async () => {
    fireEvent.change(completeElement, { target: { value: "ab" } });
    await waitFor(() => {
      expect(
        wrapper.container.querySelector(".hy-autocomplete__list")
      ).toBeInTheDocument();
    });
    fireEvent.click(document);
    expect(
      wrapper.container.querySelector(".hy-autocomplete__list")
    ).not.toBeInTheDocument();
  });

  test("renderOptions should generate the right template", async () => {
    cleanup();
    wrapper = render(renderDefaultEl(withRenderOptionsProps));
    completeElement = wrapper.getByPlaceholderText(
      "autocomplete"
    ) as HTMLInputElement;
    fireEvent.change(completeElement, {
      target: {
        value: "a",
      },
    });
    await waitFor(() => {
      expect(wrapper.queryByText("name:ab")).toBeInTheDocument();
    });
  });

  test("render the remote return data when fetchSuggestion return a promise", async () => {
    cleanup();
    jest.useFakeTimers();
    // https://stackoverflow.com/questions/65092376/jest-fn-returns-undefined-when-called
    // resetMocks create-react-app 默认为true 会导致每个case开始前清除对应所有的mock实现
    // 解决方法: 要么jest.config.js中关闭resetMocks 要么将mock实际逻辑写在case内
    const asyncSuggestionProps: AutoCompleteProps = {
      placeholder: "autocomplete",
      onSelect: jest.fn(),
      fetchSuggestion: jest.fn((value) => {
        return new Promise((resolve) => {
          resolve([{ value }]);
        });
      }),
    };
    wrapper = render(renderDefaultEl(asyncSuggestionProps));
    completeElement = wrapper.getByPlaceholderText(
      "autocomplete"
    ) as HTMLInputElement;
    fireEvent.change(completeElement, {
      target: {
        value: "wang.haoyu",
      },
    });
    await waitFor(() => {
      expect(wrapper.queryByTestId("icon")).toBeInTheDocument();
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(wrapper.queryByTestId("icon")).not.toBeInTheDocument();
    expect(wrapper.queryByText("wang.haoyu")).toBeInTheDocument();
  });
});
