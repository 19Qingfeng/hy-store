import { useEffect, useRef, useState } from "react";
import Input, { InputProps } from "../index";
import { fireEvent, render } from "@testing-library/react";

const renderInputByProps = (props: InputProps) => {
  return <Input {...props}></Input>;
};

const renderUnControlledInput = function () {
  return <Input defaultValue={12} placeholder="input element"></Input>;
};

const ControlledInput = () => {
  const [value] = useState<string>("hello");
  return <Input value={value} placeholder="input element"></Input>;
};

const FocusInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current!.focus();
  });
  return <Input placeholder="focus input" ref={inputRef} />;
};

const renderControlledInput = () => {
  return <ControlledInput />;
};

const renderFocusInput = () => {
  return <FocusInput />;
};

describe("Test Input Component", () => {
  test("should render a correct controlled input Component by Incoming value to props", () => {
    const wrapper = render(renderControlledInput());
    const inputElement = wrapper.getByPlaceholderText(
      "input element"
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 12 } });
    expect(inputElement.value).toEqual("hello");
  });

  test("should render a correct uncontrolled input Component by Incoming defaultValue to props without value", () => {
    const wrapper = render(renderUnControlledInput());
    const inputElement = wrapper.getByPlaceholderText(
      "input element"
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 12 } });
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toEqual("12");
  });

  test("should render a correct input Component with prefix Icon by Incoming a prefix iconValue", () => {
    const props: InputProps = {
      prefix: "user",
    };
    const wrapper = render(renderInputByProps(props));
    const prefixEl = wrapper.getByTestId("prefix-icon");
    expect(prefixEl).toBeInTheDocument();
    expect(prefixEl).toHaveClass(`hy-input__icon hy-input__prefix-icon`);
  });

  test("should render a correct input Component with suffix Icon by Incoming a suffix iconValue", () => {
    const props: InputProps = {
      suffix: "user",
    };
    const wrapper = render(renderInputByProps(props));
    const prefixEl = wrapper.getByTestId("suffix-icon");
    expect(prefixEl).toBeInTheDocument();
    expect(prefixEl).toHaveClass(`hy-input__icon hy-input__suffix-icon`);
  });

  test("should focus a input when use ref to focus()", () => {
    const wrapper = render(renderFocusInput());
    const inputElement = wrapper.getByPlaceholderText(
      "focus input"
    ) as HTMLInputElement;
    expect(inputElement).toHaveFocus();
  });
});
