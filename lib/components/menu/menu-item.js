import classNames from "classnames";
import React, { useContext } from "react";
import { MenuContext } from "./menu";
var prefix = "hy";
var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, className = props.className, style = props.style, children = props.children;
    var _a = useContext(MenuContext), activeIndex = _a.activeIndex, onSelect = _a.onSelect;
    var classes = classNames(prefix + "-menu-item", className, {
        "is-disabled": disabled,
        "is-active": activeIndex === index,
    });
    var handleClick = function () {
        if (onSelect && !disabled && typeof index === "string") {
            onSelect(index);
        }
    };
    return (React.createElement("li", { className: classes, style: style, onClick: handleClick }, children));
};
MenuItem.displayName = "MenuItem";
export { MenuItem };
