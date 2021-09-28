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
import { useContext } from "react";
import { RowContext } from "../row";
var prefix = "hy";
var Col = function (props) {
    var _a;
    var span = props.span, _b = props.className, className = _b === void 0 ? "" : _b, _c = props.offset, offset = _c === void 0 ? 0 : _c, _d = props.style, style = _d === void 0 ? {} : _d;
    var gap = useContext(RowContext).gap;
    var allSizes = ["xs", "sm", "md", "lg", "xl"];
    // 响应式相关 使用css相关媒体查询实现对应不同宽度
    var mediaClassList = {};
    allSizes.forEach(function (size) {
        var count = props[size];
        mediaClassList[prefix + "-col-" + size + "-" + count] = count;
    });
    console.log(mediaClassList, "mediaClassList");
    var mergeStyle = {};
    // 计算元素padding
    if (gap && gap > 0) {
        var singleGap = gap / 2;
        mergeStyle.paddingLeft = singleGap + "px";
        mergeStyle.paddingRight = mergeStyle.paddingLeft;
    }
    var classes = classNames(prefix + "-col", __assign((_a = {}, _a[prefix + "-col-" + span] = span !== undefined, _a[prefix + "-col-offset--" + offset] = offset, _a), mediaClassList), className);
    return (React.createElement("span", { className: classes, style: __assign(__assign({}, mergeStyle), style) }, props.children));
};
Col.displayName = "Col";
export { Col };
