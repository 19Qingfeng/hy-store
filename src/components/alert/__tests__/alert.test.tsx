import React from "react";
import Alert, { AlertProps } from "..";
import { fireEvent, render } from "@testing-library/react";

const renderDefaultAlert = () => {
  return <Alert message="hello world."></Alert>;
};

describe("test Alert Component", () => {
  beforeEach(() => {
    const wrapper = render(renderDefaultAlert());
  });

  test("should render a correct alert by default props", () => {});
});
