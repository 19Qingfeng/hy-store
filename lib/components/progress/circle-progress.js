import React from "react";
var prefix = "hy";
var CircleProgress = function (props) {
    var percentage = props.percentage, _a = props.progressColor, progressColor = _a === void 0 ? "#20a0ff" : _a, _b = props.baseColor, baseColor = _b === void 0 ? "#e5e9f2" : _b, _c = props.strokeWidth, strokeWidth = _c === void 0 ? 2 : _c, showText = props.showText;
    // 使用svg 的 dasharray和dashoffset
    var circlePerimeter = Math.PI * 2 * 30;
    var dashArray = "" + circlePerimeter;
    var dashOffset = "" + ((100 - percentage) / 100) * circlePerimeter;
    return (React.createElement("div", { className: prefix + "-progress-circle" },
        React.createElement("span", { className: prefix + "-progress-circle__text" }, showText && percentage + "%"),
        React.createElement("svg", { viewBox: "0 0 100 100", className: prefix + "-progress-circle__svg" },
            React.createElement("circle", { cx: "50", cy: "50", r: "30", strokeWidth: strokeWidth, stroke: baseColor, className: prefix + "-progress-circle__path" }),
            React.createElement("circle", { cx: "50", cy: "50", r: "30", strokeWidth: strokeWidth, stroke: progressColor, strokeDasharray: dashArray, strokeLinecap: "round", strokeDashoffset: dashOffset, className: prefix + "-progress-circle__track" }))));
};
export { CircleProgress };
CircleProgress.defaultProps = {
    progressColor: '"#20a0ff"',
    baseColor: "#e5e9fw",
};
