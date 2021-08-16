import Button, { ButtonProps } from '../button';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

const prefix = 'hy';

const defaultProps = {
  onClick: jest.fn(),
};

const primaryProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'wang.haoyu',
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe('button component', () => {
  test('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>Hello World</Button>);
    const element = wrapper.getByText('Hello World');
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass(`${prefix}-btn ${prefix}-btn__default`);
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  test('should render the correct component based on difference props', () => {
    const wrapper = render(<Button {...primaryProps}>Hello World</Button>);
    const element = wrapper.getByText('Hello World');
    // 期待出现在document上
    expect(element).toBeInTheDocument();
    // 标签名
    expect(element.tagName).toEqual('BUTTON');
    // 测试类名
    expect(element).toHaveClass(
      `${prefix}-btn ${prefix}-btn__primary ${prefix}-btn__lg wang.haoyu`
    );
  });
  test('should render a link when btnType equal link and href is provided', () => {
    const wrapper = render(<Button btnType="link">Link</Button>);
    const element = wrapper.getByText('Link');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
  });
  test('should render a disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>Hello World</Button>);
    const element = wrapper.getByText('Hello World');
    // 是否disabled
    expect(element).toBeDisabled();
    // disabled调用
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
