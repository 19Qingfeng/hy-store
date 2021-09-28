import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
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
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export { Input };
