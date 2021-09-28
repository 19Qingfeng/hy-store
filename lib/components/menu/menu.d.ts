import React from "react";
declare type MenuMode = "horizontal" | "vertical";
declare type MenuTriggerWay = "hover" | "click";
declare type SelectFn = (index: string) => void;
export interface MenuProps {
    activeIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    trigger?: MenuTriggerWay;
    defaultSubExtend?: string[];
    onSelect?: SelectFn;
}
export interface IMenuContext {
    activeIndex: string;
    trigger: MenuTriggerWay;
    mode: MenuMode;
    defaultSubExtend?: string[];
    onSelect?: SelectFn;
}
export declare const MenuContext: React.Context<IMenuContext>;
declare const Menu: React.FC<MenuProps>;
export { Menu };
