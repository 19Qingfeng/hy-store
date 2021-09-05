import React, { ChangeEvent, useState } from "react";
import { Input, InputProps } from "../input";

export interface AutoCompleteOptionsType {
  value: string;
  [props: string]: string;
}

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  /**
   * 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它
   */
  fetchSuggestion: (value: string) => AutoCompleteOptionsType[];
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
  const { fetchSuggestion, onSelect, renderOptions, ...rest } = props;

  // 当输入值的时候 我需要实时拿到这个值 controlled
  const [inputValue, setInputValue] = useState<string>();
  const [suggestions, setSuggestions] = useState<AutoCompleteOptionsType[]>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      // 新的值存在 进行刷新列表过滤
      const list = fetchSuggestion(value);
      setSuggestions(list);
    } else {
      setSuggestions([]);
    }
  };

  const handleClick = (value: AutoCompleteOptionsType) => {
    if (value) {
      const emitValue = value.value;
      setInputValue(emitValue);
      onSelect && onSelect(emitValue);
    }
  };

  const renderTemplate = (value: AutoCompleteOptionsType) => {
    return renderOptions ? renderOptions(value) : value;
  };

  return (
    <div>
      <Input value={inputValue} onChange={handleChange} {...rest}></Input>
      <ul>
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

export { AutoComplete };
