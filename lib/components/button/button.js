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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { forwardRef } from "react";
import classnames from "classnames";
var prefix = "hy";
/**
 * 常用操作按钮。
 */
var Button = forwardRef(function (props, ref) {
    var className = props.className, btnType = props.btnType, disabled = props.disabled, size = props.size, children = props.children, href = props.href, restProps = __rest(props, ["className", "btnType", "disabled", "size", "children", "href"]);
    var classes = classnames(prefix + "-btn", prefix + "-btn__" + size, // 大小
    prefix + "-btn__" + btnType, // 类型
    { "is-disabled": disabled }, // 是否禁用
    className // 用户自定义className
    );
    if (btnType === "link") {
        return (React.createElement("a", __assign({ className: classes, href: href }, restProps), children));
    }
    else {
        return (React.createElement("button", __assign({ ref: ref, className: classes, disabled: disabled }, restProps), children));
    }
});
Button.defaultProps = {
    btnType: "default",
    size: "lg",
    disabled: false,
};
export { Button };
