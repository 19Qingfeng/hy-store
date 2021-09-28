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
import React from "react";
import classNames from "classnames";
import { CircleProgress } from "./circle-progress";
var nameSpace = "hy";
var Progress = function (props) {
    var percentage = props.percentage, theme = props.theme, _a = props.strokeWidth, strokeWidth = _a === void 0 ? 15 : _a, circle = props.circle, showText = props.showText, className = props.className, style = props.style, _b = props.progressColor, progressColor = _b === void 0 ? "#20a0ff" : _b, _c = props.baseColor, baseColor = _c === void 0 ? "#e5e9f2" : _c;
    var progressHeight = strokeWidth;
    if (strokeWidth && strokeWidth < 12) {
        progressHeight = 12;
        console.warn("The width property of the progress bar must be greater than 12");
    }
    var classes = classNames(nameSpace + "-progress", {
        "el-progress--circle": circle,
    }, className);
    return (React.createElement("div", { className: classes }, circle ? (React.createElement(CircleProgress, { baseColor: baseColor, progressColor: progressColor, showText: showText, percentage: percentage })) : (React.createElement("div", { className: nameSpace + "-progress__wrapper", style: __assign({ height: progressHeight + "px" }, style) },
        React.createElement("div", { className: nameSpace + "-progress__inner " + nameSpace + "-progress__inner--" + theme, style: { width: percentage + "%", height: strokeWidth + "px" } },
            React.createElement("span", { className: nameSpace + "-progress__text" },
                " ",
                showText && percentage + "%"))))));
};
Progress.defaultProps = {
    circle: false,
    showText: true,
    strokeWidth: 15,
    theme: "primary",
    progressColor: '"#20a0ff"',
    baseColor: "#e5e9fw",
};
export { Progress };
