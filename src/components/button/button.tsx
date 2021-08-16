import React, { forwardRef } from 'react';
import { ButtonSize, ButtonType } from './constant';
import classnames from 'classnames';

interface BaseButtonProps {
  children?: React.ReactNode;
  size?: ButtonSize;
  btnType?: ButtonType;
  disabled?: boolean;
  href?: string;
}

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement> &
  BaseButtonProps;
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement> &
  BaseButtonProps;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const prefix = 'hy';

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, btnType, disabled, size, children, href, ...restProps } =
    props;
  const classes = classnames(
    `${prefix}-btn`,
    `${prefix}-btn__${size}`, // 大小
    `${prefix}-btn__${btnType}`, // 类型
    { 'is-disabled': disabled }, // 是否禁用
    className // 用户自定义className
  );

  if (btnType === 'link') {
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
  btnType: 'default',
  size: 'lg',
};

export default Button;
