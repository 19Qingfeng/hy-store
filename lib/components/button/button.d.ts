import React from "react";
import { ButtonSize, ButtonType } from "./constant";
interface BaseButtonProps {
    /**
     * 组件传入的内容
     */
    children?: React.ReactNode;
    /**
     * Button尺寸，存在两种设置：
     */
    size?: ButtonSize;
    /**
     * Button类型：
     */
    btnType?: ButtonType;
    /**
     * 是否禁用按钮
     */
    disabled?: boolean;
    /**
     * 当btnType为link时 设置点击跳转
     */
    href?: string;
}
declare type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement> & BaseButtonProps;
declare type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement> & BaseButtonProps;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 常用操作按钮。
 */
declare const Button: React.ForwardRefExoticComponent<Partial<React.ButtonHTMLAttributes<HTMLElement> & BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>> & React.RefAttributes<HTMLButtonElement>>;
export { Button };
