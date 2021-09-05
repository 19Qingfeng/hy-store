import React, { forwardRef, useRef, useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Icon } from "../icon";
import classNames from "classnames";
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  /**
   * 前缀Icon图标
   */
  prefix?: IconProp;
  /**
   * 后缀Icon图标
   */
  suffix?: IconProp;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 尺寸
   */
  size?: string;
  /**
   * 受控传入value值,存在时defaultValue无效
   */
  value?: string;
  /**
   * 非受控传入defaultValue值
   */
  defaultValue?: string;
  /**
   * change事件
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NAMESPACE = "hy";

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, disabled, size, prefix, suffix, onChange, ...rest } =
    props;
  const classes = classNames(
    `${NAMESPACE}-input`,
    {
      "is-disabled": disabled,
      [`${NAMESPACE}-input__prefix`]: prefix,
      [`${NAMESPACE}-input__suffix`]: suffix,
    },
    className
  );
  // 受控 非受控两种模式
  const isControl = "value" in rest; // 传递value属性 就是受控

  if (isControl) {
    delete rest.defaultValue;
    if (typeof rest.value === "undefined" || rest.value === null) {
      rest.value = "";
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };

  const renderInput = () => {
    return (
      <>
        {prefix && renderPrefix()}
        <input
          className={`${NAMESPACE}-input__inner`}
          type="text"
          ref={ref}
          disabled={disabled}
          {...rest}
          onChange={handleInputChange}
        />
        {suffix && renderSuffix()}
      </>
    );
  };

  const renderPrefix = () => {
    return (
      <span
        data-testid="prefix-icon"
        className={`${NAMESPACE}-input__icon ${NAMESPACE}-input__prefix-icon`}
      >
        <Icon icon={prefix!}></Icon>
      </span>
    );
  };

  const renderSuffix = () => {
    return (
      <span
        data-testid="suffix-icon"
        className={`${NAMESPACE}-input__icon ${NAMESPACE}-input__suffix-icon`}
      >
        <Icon icon={suffix!}> </Icon>
      </span>
    );
  };

  return <div className={classes}>{renderInput()}</div>;
});

export { Input };
