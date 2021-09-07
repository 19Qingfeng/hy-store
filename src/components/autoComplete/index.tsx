import React, { ChangeEvent, useEffect, useState } from "react";
import { Input, InputProps } from "../input";
import { Icon } from "../icon";
import useDebounce from "../../hooks/use-debounce";

export interface AutoCompleteOptionsType {
  value: string;
  [props: string]: string;
}

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  /**
   * 搜索框debounce时间，默认300ms.
   */
  debounceTime?: number;
  /**
   * 返回输入建议的方法，返回一直数组或者Promise
   */
  fetchSuggestion: (
    value: string
  ) => AutoCompleteOptionsType[] | Promise<AutoCompleteOptionsType[]>;
  /**
   * 选中输入建议回调函数
   */
  onSelect?: (value: string) => void;
  /**
   * 自定义渲染每条输入建议模板函数
   */
  renderOptions?: (value: AutoCompleteOptionsType) => React.ReactNode;
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestion,
    onSelect,
    debounceTime = 300,
    renderOptions,
    ...rest
  } = props;

  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState<string>();
  const [suggestions, setSuggestions] = useState<AutoCompleteOptionsType[]>();
  const debounceValue = useDebounce(inputValue, debounceTime);

  // effect
  useEffect(() => {
    if (inputValue) {
      const result = fetchSuggestion(inputValue);
      if (result instanceof Promise) {
        setLoading(true);
        result.then((res) => {
          setLoading(false);
          setSuggestions(res);
        });
      } else {
        setSuggestions(result);
      }
    } else {
      setSuggestions([]);
    }
  }, [debounceValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleClick = (value: AutoCompleteOptionsType) => {
    if (value) {
      const emitValue = value.value;
      setInputValue(emitValue);
      onSelect && onSelect(emitValue);
    }
  };

  const renderTemplate = (value: AutoCompleteOptionsType) => {
    return renderOptions ? renderOptions(value) : value.value;
  };

  return (
    <div>
      <Input value={inputValue} onChange={handleChange} {...rest}></Input>
      <ul>
        {loading && <Icon className="fa-spin" icon="spinner"></Icon>}
        {suggestions?.map((item, index) => {
          return (
            <li onClick={() => handleClick(item)} key={index}>
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

AutoComplete.defaultProps = {
  debounceTime: 300,
};

export { AutoComplete };
