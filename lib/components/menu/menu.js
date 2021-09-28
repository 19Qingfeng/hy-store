import classNames from "classnames";
import React, { createContext, useState } from "react";
var prefix = "hy";
export var MenuContext = createContext({
    activeIndex: "0",
    trigger: "hover",
    mode: "horizontal",
});
var Menu = function (props) {
    var _a;
    var className = props.className, activeIndex = props.activeIndex, trigger = props.trigger, mode = props.mode, style = props.style, children = props.children, defaultSubExtend = props.defaultSubExtend, onSelect = props.onSelect;
    var _b = useState(activeIndex), active = _b[0], setActive = _b[1];
    var classes = classNames(prefix + "-menu", className, (_a = {},
        _a[prefix + "-menu__vertical"] = mode === "vertical",
        _a[prefix + "-menu__horizontal"] = mode === "horizontal",
        _a));
    var transmitContext = {
        activeIndex: active === undefined ? "0" : active,
        trigger: trigger ? trigger : "hover",
        defaultSubExtend: defaultSubExtend,
        mode: mode ? mode : "horizontal",
        onSelect: function (index) {
            setActive(index);
            if (onSelect) {
                onSelect(index);
            }
        },
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var _a, _b;
            var childrenElement = child;
            if (((_a = childrenElement === null || childrenElement === void 0 ? void 0 : childrenElement.type) === null || _a === void 0 ? void 0 : _a.displayName) === "MenuItem" ||
                ((_b = childrenElement === null || childrenElement === void 0 ? void 0 : childrenElement.type) === null || _b === void 0 ? void 0 : _b.displayName) === "SubMenu") {
                // React中元素是不可变的 变化元素只能新建一个元素去替换
                return React.cloneElement(childrenElement, {
                    index: childrenElement.props.index
                        ? childrenElement.props.index
                        : index.toString(),
                });
            }
            else {
                // nothing
                console.warn("Warning: menu has a child which is not a MenuItem Component.");
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "menu" },
        React.createElement(MenuContext.Provider, { value: transmitContext }, renderChildren())));
};
export { Menu };
Menu.defaultProps = {
    mode: "horizontal",
    activeIndex: "0",
    trigger: "hover",
};
