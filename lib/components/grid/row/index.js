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
import React, { createContext } from "react";
import classNames from "classnames";
export var RowContext = createContext({
    gap: 0,
});
var prefix = "hy";
/**
 * Grid布局系统
 */
var Row = function (props) {
    var _a;
    var className = props.className, style = props.style, _b = props.gap, gap = _b === void 0 ? 0 : _b, _c = props.tag, tag = _c === void 0 ? "div" : _c, justify = props.justify, children = props.children;
    var classes = classNames(prefix + "-row", (_a = {},
        _a["is-" + justify] = justify,
        _a), className);
    var provideContext = {
        gap: gap,
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child) {
            var childElement = child;
            if (typeof child === "object" &&
                childElement.type.displayName === "Col") {
                return child;
            }
            else {
                console.warn("Row children must be a ColItem");
                return null;
            }
        });
    };
    var mergeStyle = {};
    if (gap && gap > 0) {
        mergeStyle.marginLeft = 0 - gap / 2 + "px";
        mergeStyle.marginRight = mergeStyle.marginLeft;
    }
    return (React.createElement(RowContext.Provider, { value: provideContext }, React.createElement(tag, {
        className: classes,
        style: __assign(__assign({}, mergeStyle), style),
    }, renderChildren())));
};
export { Row };
