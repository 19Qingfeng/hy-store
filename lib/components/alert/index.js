import React, { forwardRef, useState } from "react";
import classNames from "classnames";
import { Icon } from "../icon";
import { isValidValue } from "../../utils";
var iconMaps = {
    primary: "exclamation-circle",
    success: "check-circle",
    info: "info-circle",
    warning: "exclamation-triangle",
    danger: "radiation-alt",
};
var prefix = "hy";
var Alert = forwardRef(function (props, ref) {
    var _a;
    var className = props.className, _b = props.type, type = _b === void 0 ? "info" : _b, _c = props.showIcon, showIcon = _c === void 0 ? false : _c, _d = props.showClose, showClose = _d === void 0 ? false : _d, children = props.children;
    var _e = useState(true), isShow = _e[0], setShow = _e[1];
    var hasChildren = isValidValue(children);
    var classes = classNames(prefix + "-alert", (_a = {},
        _a[prefix + "-alert--" + type] = type,
        _a), className);
    var handleClose = function () {
        setShow(false);
    };
    var renderIcon = function () {
        var currentIcon = iconMaps[type];
        var classes = classNames(prefix + "-alert__icon", {
            "is-scale": hasChildren,
        });
        return (React.createElement("div", { className: classes, "data-testid": "icon" },
            React.createElement(Icon, { className: prefix + "-alert__svg", icon: currentIcon })));
    };
    var renderClose = function () {
        return (React.createElement(Icon, { className: prefix + "-alert__close", onClick: handleClose, icon: "times-circle" }));
    };
    var renderTitle = function () {
        var classes = classNames(prefix + "-alert__title", {
            "is-bold": hasChildren,
        });
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: classes }, props.message),
            hasChildren ? renderDescription() : null));
    };
    var renderDescription = function () {
        var childrenElement = children;
        return React.Children.map(childrenElement, function (child, index) {
            if (!React.isValidElement(child)) {
                return child;
            }
            else {
                // 这里直接非React元素 比如string/number 并不会经过babel转译 cloneElement会报错丢失type
                return React.cloneElement(child, {
                    key: index,
                });
            }
        });
    };
    return !isShow ? null : (React.createElement("div", { "data-testid": "alert", className: classes, ref: ref },
        showIcon && renderIcon(),
        React.createElement("div", { className: prefix + "-alert__content" }, renderTitle()),
        showClose ? (React.createElement("div", { className: prefix + "-alert__description" }, renderClose())) : null));
});
export { Alert };
