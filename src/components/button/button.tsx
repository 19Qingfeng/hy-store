import React, { forwardRef } from "react";
import { ButtonSize, ButtonType } from "./constant";
import classnames from "classnames";

interface BaseButtonProps {
  /**
   * 组件传入的内容
   */
  children?: React.ReactNode;
  /**
   * Button尺寸，存在两种设置：
   */
  size?: ButtonSize;
  /**
   * Button类型：
   */
  btnType?: ButtonType;
  /**
   * 是否禁用按钮
   */
  disabled?: boolean;
  /**
   * 当btnType为link时 设置点击跳转
   */
  href?: string;
}

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement> &
  BaseButtonProps;
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement> &
  BaseButtonProps;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const prefix = "hy";

/**
 * 常用操作按钮。
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, btnType, disabled, size, children, href, ...restProps } =
    props;
  const classes = classnames(
    `${prefix}-btn`,
    `${prefix}-btn__${size}`, // 大小
    `${prefix}-btn__${btnType}`, // 类型
    { "is-disabled": disabled }, // 是否禁用
    className // 用户自定义className
  );

  if (btnType === "link") {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button ref={ref} className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
});

Button.defaultProps = {
  btnType: "default",
  size: "lg",
  disabled: false,
};

export { Button };
