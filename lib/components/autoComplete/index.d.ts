import React from "react";
import { InputProps } from "../input";
export interface AutoCompleteOptionsType {
    value: string;
    [props: string]: string | number;
}
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
     * 返回输入建议的方法，返回数组或者Promise
     */
    fetchSuggestion: (value: string) => AutoCompleteOptionsType[] | Promise<AutoCompleteOptionsType[]>;
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
declare const AutoComplete: React.FC<AutoCompleteProps>;
export { AutoComplete };
