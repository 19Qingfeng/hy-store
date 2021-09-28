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
import { Icon } from "../icon";
import classNames from "classnames";
var NAMESPACE = "hy";
var Input = forwardRef(function (props, ref) {
    var _a;
    var className = props.className, disabled = props.disabled, size = props.size, prefix = props.prefix, suffix = props.suffix, onChange = props.onChange, rest = __rest(props, ["className", "disabled", "size", "prefix", "suffix", "onChange"]);
    var classes = classNames(NAMESPACE + "-input", (_a = {
            "is-disabled": disabled
        },
        _a[NAMESPACE + "-input__prefix"] = prefix,
        _a[NAMESPACE + "-input__suffix"] = suffix,
        _a), className);
    // 受控 非受控两种模式
    var isControl = "value" in rest; // 传递value属性 就是受控
    if (isControl) {
        delete rest.defaultValue;
        if (typeof rest.value === "undefined" || rest.value === null) {
            rest.value = "";
        }
    }
    var handleInputChange = function (e) {
        onChange && onChange(e);
    };
    var renderInput = function () {
        return (React.createElement(React.Fragment, null,
            prefix && renderPrefix(),
            React.createElement("input", __assign({ className: NAMESPACE + "-input__inner", type: "text", ref: ref, disabled: disabled }, rest, { onChange: handleInputChange })),
            suffix && renderSuffix()));
    };
    var renderPrefix = function () {
        return (React.createElement("span", { "data-testid": "prefix-icon", className: NAMESPACE + "-input__icon " + NAMESPACE + "-input__prefix-icon" },
            React.createElement(Icon, { icon: prefix })));
    };
    var renderSuffix = function () {
        return (React.createElement("span", { "data-testid": "suffix-icon", className: NAMESPACE + "-input__icon " + NAMESPACE + "-input__suffix-icon" },
            React.createElement(Icon, { icon: suffix }, " ")));
    };
    return React.createElement("div", { className: classes }, renderInput());
});
export { Input };
