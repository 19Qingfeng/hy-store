import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
  cleanup,
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

const asyncSuggestionProps: AutoCompleteProps = {
  placeholder: "autocomplete",
  fetchSuggestion: jest.fn((queryValue) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([{ name: queryValue, value: "1" }]);
      }, 3000);
    });
  }),
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
    // jest.useFakeTimers();
    wrapper = render(renderDefaultEl(asyncSuggestionProps));
    completeElement = wrapper.getByPlaceholderText(
      "autocomplete"
    ) as HTMLInputElement;
    console.log(
      asyncSuggestionProps.fetchSuggestion("1"),
      "asyncSuggestionProps"
    );

    // 输入一个a的时候 首先出入loading
    fireEvent.change(completeElement, {
      target: {
        value: "a",
      },
    });
    // 希望调用远程请求函数
    // 希望loading出现
    await waitFor(() => {
      // expect(asyncSuggestionProps.fetchSuggestion).toHaveBeenCalledWith("a");
      expect(wrapper.queryByTestId("icon")).toBeInTheDocument();
    });
  });
});
