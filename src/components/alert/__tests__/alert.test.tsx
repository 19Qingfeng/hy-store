import React from "react";
import Alert, { AlertProps } from "..";
import {
  act,
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from "@testing-library/react";

const defaultProps: AlertProps = {
  message: "hello world.",
};

const withIconProps: AlertProps = {
  message: "hello world.",
  showIcon: true,
};

const withCloseProps: AlertProps = {
  message: "hello world.",
  showClose: true,
};

const renderDefaultAlert = (props: AlertProps) => {
  return <Alert {...props}>{props.children}</Alert>;
};

let wrapper: RenderResult,
  wrapperElement: HTMLElement,
  defaultAlert: HTMLElement;

describe("test Alert Component", () => {
  beforeEach(() => {
    wrapper = render(renderDefaultAlert(defaultProps));
    wrapperElement = wrapper.getByTestId("alert");
    defaultAlert = wrapper.getByText("hello world.");
  });

  test("should render a correct alert by default props", () => {
    expect(defaultAlert).toBeVisible();
    expect(wrapperElement).toHaveClass(`hy-alert hy-alert--info`);
  });

  test("should render a correct icon when icon set true", () => {
    cleanup();
    wrapper = render(renderDefaultAlert(withIconProps));
    const iconElement = wrapper.getByTestId("icon");
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass("hy-alert__icon");
  });

  test("close element disappears when click close", () => {
    let closeElement = wrapperElement.querySelector(".hy-alert__close");
    expect(closeElement).not.toBeInTheDocument();
    const { rerender } = wrapper;
    act(() => {
      rerender(<Alert {...withCloseProps}></Alert>);
    });
    closeElement = wrapperElement.querySelector(".hy-alert__close");
    expect(closeElement).toBeInTheDocument();
    act(() => {
      fireEvent.click(closeElement!);
    });
    // 消息了 container为一个空的div节点
    expect(wrapper.container.firstChild).toBeNull();
  });
});
