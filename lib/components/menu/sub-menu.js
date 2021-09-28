var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState, useContext } from "react";
import classNames from "classnames";
import { Icon } from "../icon";
import { MenuContext } from "./menu";
import { Transition } from "../transition";
var prefix = "hy";
var SubMenuItem = function (props) {
    // props
    var index = props.index, title = props.title, className = props.className, children = props.children;
    // provide
    var _a = useContext(MenuContext), trigger = _a.trigger, mode = _a.mode, defaultSubExtend = _a.defaultSubExtend;
    // data
    var isDefaultExpend = defaultSubExtend === null || defaultSubExtend === void 0 ? void 0 : defaultSubExtend.includes(index);
    var _b = useState(isDefaultExpend), menuOpen = _b[0], setMenuOpen = _b[1];
    // 是否是true 如果是true 默认给他一个箭头展开的效果
    var classes = classNames(prefix + "-menu-item", prefix + "-submenu-item", { "is-open": menuOpen }, { "is-vertical": mode === "vertical" }, className);
    // methods
    var handleClick = function (e) {
        setMenuOpen(!menuOpen);
        e.preventDefault();
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setMenuOpen(toggle);
        }, 300);
    };
    var clickEvents = trigger === "click"
        ? {
            onClick: handleClick,
        }
        : {};
    var hoverEvents = trigger === "hover"
        ? {
            onMouseEnter: function (e) { return handleMouse(e, true); },
            onMouseLeave: function (e) { return handleMouse(e, false); },
        }
        : {};
    var renderChildren = function () {
        var subMenuClasses = classNames(prefix + "-submenu", {
            "menu-opened": menuOpen,
        });
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === "MenuItem") {
                return React.cloneElement(childElement, {
                    index: childElement.props.index
                        ? childElement.props.index
                        : index + "-" + i,
                });
            }
            else {
                console.warn("Warning: subMenu has a child which is not a MenuItem Component.");
            }
        });
        return React.createElement("ul", { className: subMenuClasses }, childrenComponent);
    };
    return (React.createElement("li", __assign({ key: index, className: classes }, hoverEvents),
        React.createElement("div", __assign({ className: prefix + "-submenu__title" }, clickEvents),
            title,
            React.createElement(Icon, { icon: "angle-down", className: prefix + "-submenu__icon" })),
        React.createElement(Transition, { animationName: "zoom-in-top", timeout: 30000, in: menuOpen }, renderChildren())));
};
SubMenuItem.displayName = "SubMenu";
export { SubMenuItem };
