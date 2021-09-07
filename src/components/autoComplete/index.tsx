import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useState,
  useRef,
} from "react";
import classNames from "classnames";
import { Input, InputProps } from "../input";
import { Icon } from "../icon";
import useDebounce from "../../hooks/use-debounce";
import useOutside from "../../hooks/use-outside";

export interface AutoCompleteOptionsType {
  value: string;
  [props: string]: string;
}

// TODO 支持点击外层关闭
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

/**
 * 远程搜索AutoComplete组件。
 */
const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestion,
    onSelect,
    debounceTime = 300,
    renderOptions,
    ...rest
  } = props;

  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActive] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState<string>();
  const [suggestions, setSuggestions] = useState<AutoCompleteOptionsType[]>([]);
  const debounceValue = useDebounce(inputValue, debounceTime);
  useOutside(componentRef, () => {
    handleCloseSuggestion();
  });

  // effect
  useEffect(() => {
    if (inputValue && triggerSearch.current) {
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
      handleCloseSuggestion();
    }
    setActive(-1);
  }, [debounceValue]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const code = event.code;
    switch (code) {
      case "ArrowDown":
        toggleMenuItem("next");
        break;
      case "ArrowUp":
        toggleMenuItem("pre");
        break;
      case "Escape":
        handleCloseSuggestion();
        break;
      case "Enter":
        selectSuggestion();
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    triggerSearch.current = true;
    setInputValue(value);
  };

  // 鼠标点击选中
  const handleClick = (value: AutoCompleteOptionsType) => {
    if (value) {
      triggerSearch.current = false;
      const emitValue = value.value;
      setInputValue(emitValue);
      onSelect && onSelect(emitValue);
    }
  };

  // 回车事件选中item
  const selectSuggestion = () => {
    if (activeIndex > -1 && suggestions.length > 0) {
      const item = suggestions[activeIndex];
      handleClick(item);
    }
  };

  // 关闭搜索弹窗
  const handleCloseSuggestion = () => {
    setSuggestions([]);
  };

  // 键盘切换MenuItem
  const toggleMenuItem = (direction: "next" | "pre") => {
    if (direction === "next") {
      const index =
        activeIndex === suggestions?.length! - 1
          ? suggestions?.length! - 1
          : activeIndex + 1;
      setActive(index);
    } else {
      const index = activeIndex === 0 ? 0 : activeIndex - 1;
      setActive(index);
    }
  };

  const renderTemplate = (value: AutoCompleteOptionsType) => {
    return renderOptions ? renderOptions(value) : value.value;
  };

  return (
    <div ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...rest}
      ></Input>
      <ul>
        {loading && <Icon className="fa-spin" icon="spinner"></Icon>}
        {suggestions?.map((item, index) => {
          const classes = classNames({
            "is-active": index === activeIndex,
          });
          return (
            <li
              className={classes}
              onClick={() => handleClick(item)}
              key={index}
            >
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
