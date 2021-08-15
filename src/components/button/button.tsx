import React from 'react';
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

type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const prefix = 'hy';

const Button: React.FC<ButtonProps> = (props) => {
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
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  btnType: 'default',
  size: 'lg',
};

export default Button;
