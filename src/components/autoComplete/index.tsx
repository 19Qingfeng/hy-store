import React, { ChangeEvent, useState } from 'react';
import Input, { InputProps } from '../input';

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestion: (value: string) => string[];
  onSelect: (value: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestion, onSelect, ...rest } = props;

  // 当输入值的时候 我需要实时拿到这个值 controlled
  const [inputValue, setInputValue] = useState<string>();
  const [suggestions, setSuggestions] = useState<string[]>();

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

  return (
    <div>
      <Input value={inputValue} onChange={handleChange} {...rest}></Input>;
      <ul>
        {suggestions?.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
};

export default AutoComplete;
