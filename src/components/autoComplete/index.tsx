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
import { Transition } from "../transiton";

// TODO: test case
const nameSpace = "hy";

export interface AutoCompleteOptionsType {
  value: string;
  [props: string]: string;
}

// TODO 支持点击外层关闭
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  /**
   * 自定义建议宽度
   */
  width?: number;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 自定义AutoComplete Suggestion list样式
   */
  style?: React.CSSProperties;
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
    style,
    width = 300,
    fetchSuggestion,
    onSelect,
    className,
    debounceTime = 300,
    renderOptions,
    ...rest
  } = props;

  const classes = classNames(`${nameSpace}-autocomplete`, className);

  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const suggestionItemRef = useRef<HTMLLIElement>(null);
  const [activeIndex, setActive] = useState(-1);
  const [shouldRender, setRender] = useState(false);
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
      setRender(true);
      setSuggestions([]);
      const result = fetchSuggestion(inputValue);
      if (result instanceof Promise) {
        setLoading(true);
        result.then((res) => {
          setLoading(false); // 关闭loading
          setSuggestions(res); // 回填结果
        });
      } else {
        setSuggestions(result); // 回填结果
      }
    } else {
      handleCloseSuggestion(); // 清空value-关闭清空弹窗
    }
    setActive(-1); // 每次搜索重置index
  }, [debounceValue]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const code = event.code;
    switch (code) {
      case "ArrowDown":
        event.preventDefault();
        toggleMenuItem("next");
        break;
      case "ArrowUp":
        event.preventDefault();
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
    setRender(false);
  };

  // 动画结束后
  const handleAnimationExited = () => {
    setSuggestions([]);
  };

  // 键盘切换MenuItem
  const toggleMenuItem = (direction: "next" | "pre") => {
    let index;
    if (direction === "next") {
      index =
        activeIndex === suggestions?.length! - 1
          ? suggestions?.length! - 1
          : activeIndex + 1;
      setActive(index);
    } else {
      index = activeIndex === 0 ? 0 : activeIndex - 1;
      setActive(index);
    }
    const suggestionWrapperRef = componentRef.current?.querySelector(
      `.${nameSpace}-autocomplete__list`
    );
    const suggestionRefs = componentRef.current?.querySelectorAll<HTMLLIElement>(
      `li.${nameSpace}-autocomplete__item`
    );
    if (suggestionWrapperRef && suggestionRefs && suggestionRefs.length > 0) {
      const hightItemEl = suggestionRefs[index];
      const { scrollTop, clientHeight } = suggestionWrapperRef; // 当前wrapper滚动距离
      const { scrollHeight, offsetTop } = hightItemEl; // 每一个元素的高度 外部传入都不一定所以单个都要计算
      const currentElTop = offsetTop + scrollHeight; // 元素底部距离 parent顶部位置
      const screenMaxHeight = scrollTop + clientHeight; // 当前屏幕所在最大高度
      if (currentElTop > screenMaxHeight) {
        suggestionWrapperRef.scrollTop += scrollHeight;
      }
      if (offsetTop < scrollTop) {
        suggestionWrapperRef.scrollTop -= scrollHeight;
      }
    }
  };

  const renderTemplate = (value: AutoCompleteOptionsType) => {
    return renderOptions ? renderOptions(value) : value.value;
  };

  const renderSuggestion = () => {
    return (
      <ul
        className={`${nameSpace}-autocomplete__list`}
        style={{ width: width + "px", ...style }}
      >
        {loading && (
          <span className={`${nameSpace}-autocomplete__icon`}>
            <Icon className="fa-spin" icon="spinner"></Icon>
          </span>
        )}
        {suggestions.map((item, index) => {
          const classes = classNames(`${nameSpace}-autocomplete__item`, {
            "is-active": index === activeIndex,
          });
          return (
            <li
              className={classes}
              onClick={() => handleClick(item)}
              ref={suggestionItemRef}
              key={index}
            >
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={classes} ref={componentRef}>
      <Input
        className={`${nameSpace}-autocomplete__input`}
        value={inputValue}
        style={{ width: width + "px" }}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...rest}
      ></Input>
      <Transition
        in={shouldRender}
        timeout={300}
        animationName="zoom-in-top"
        onExited={handleAnimationExited}
        unmountOnExit
      >
        {renderSuggestion()}
      </Transition>
    </div>
  );
};

AutoComplete.defaultProps = {
  debounceTime: 300,
};

export { AutoComplete };
