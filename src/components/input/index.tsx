import React, { forwardRef, useRef, useState } from "react";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  // value?: string;
  disabled?: boolean;
  size?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { disabled, size, onChange, ...rest } = props;
  const inputRef = useRef(null);
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

  return <input ref={inputRef} {...rest} onChange={handleInputChange} />;
});

export default Input;
