import { cleanup, render, RenderResult } from "@testing-library/react";
import { Progress, ProgressProps } from "..";

const defaultProps: ProgressProps = {
  percentage: 20,
  strokeWidth: 20,
  showText: true,
};

const renderProgress = (props: ProgressProps) => {
  return <Progress {...props}></Progress>;
};

let wrapper: RenderResult, ProgressItem: HTMLElement | null;
describe("Test Progress Component", () => {
  beforeEach(() => {
    wrapper = render(renderProgress(defaultProps));
    ProgressItem = wrapper.container.querySelector(".hy-progress__wrapper");
  });
  test("Base Progress", () => {
    expect(ProgressItem).toBeInTheDocument();
    expect(ProgressItem?.style.height).toEqual("20px");
    expect(ProgressItem?.querySelector(".hy-progress__inner")).toHaveClass(
      "hy-progress__inner--primary"
    );
    expect(wrapper.queryByText("20%")).toBeInTheDocument();
  });
  test("Circle Progress", () => {
    cleanup();
    wrapper = render(
      renderProgress({ ...defaultProps, circle: true, baseColor: "red" })
    );
    ProgressItem = wrapper.container.querySelector(".hy-progress");
    const circleProgress = ProgressItem?.querySelector(".hy-progress-circle");
    expect(ProgressItem).toBeInTheDocument();
    expect(circleProgress).toBeInTheDocument();
    expect(wrapper.queryByText("20%")).toBeInTheDocument();
    expect(
      (ProgressItem?.querySelector(
        ".hy-progress-circle__path"
      ) as SVGElement).getAttribute("stroke")
    ).toEqual("red");
  });
});
