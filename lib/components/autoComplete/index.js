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
import React, { useEffect, useState, useRef, } from "react";
import classNames from "classnames";
import { Input } from "../input";
import { Icon } from "../icon";
import useDebounce from "../../hooks/use-debounce";
import useOutside from "../../hooks/use-outside";
import { Transition } from "../transition";
// TODO: test case
var nameSpace = "hy";
/**
 * 远程搜索AutoComplete组件。
 */
var AutoComplete = function (props) {
    var style = props.style, _a = props.width, width = _a === void 0 ? 300 : _a, fetchSuggestion = props.fetchSuggestion, onSelect = props.onSelect, className = props.className, _b = props.debounceTime, debounceTime = _b === void 0 ? 300 : _b, renderOptions = props.renderOptions, rest = __rest(props, ["style", "width", "fetchSuggestion", "onSelect", "className", "debounceTime", "renderOptions"]);
    var classes = classNames(nameSpace + "-autocomplete", className);
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    var suggestionItemRef = useRef(null);
    var _c = useState(-1), activeIndex = _c[0], setActive = _c[1];
    var _d = useState(false), shouldRender = _d[0], setRender = _d[1];
    var _e = useState(false), loading = _e[0], setLoading = _e[1];
    var _f = useState(), inputValue = _f[0], setInputValue = _f[1];
    var _g = useState([]), suggestions = _g[0], setSuggestions = _g[1];
    var debounceValue = useDebounce(inputValue, debounceTime);
    useOutside(componentRef, function () {
        handleCloseSuggestion();
    });
    // effect
    useEffect(function () {
        if (inputValue && triggerSearch.current) {
            setRender(true);
            setSuggestions([]);
            var result = fetchSuggestion(inputValue);
            if (result instanceof Promise) {
                setLoading(true);
                result.then(function (res) {
                    setLoading(false); // 关闭loading
                    setSuggestions(res); // 回填结果
                });
            }
            else {
                setSuggestions(result); // 回填结果
            }
        }
        else {
            handleCloseSuggestion(); // 清空value-关闭清空弹窗
        }
        setActive(-1); // 每次搜索重置index
    }, [debounceValue]);
    var handleKeyDown = function (event) {
        var code = event.code;
        switch (code) {
            case "ArrowDown":
                event.preventDefault();
                toggleMenuItem("next");
                break;
            case "ArrowUp":
                event.preventDefault();
                toggleMenuItem("pre");
                break;
            case "Escape":
                handleCloseSuggestion();
                break;
            case "Enter":
                selectSuggestion();
                break;
        }
    };
    var handleChange = function (e) {
        var value = e.target.value;
        triggerSearch.current = true;
        setInputValue(value);
    };
    // 鼠标点击选中
    var handleClick = function (value) {
        if (value) {
            triggerSearch.current = false;
            var emitValue = value.value;
            setInputValue(emitValue);
            onSelect && onSelect(emitValue);
        }
    };
    // 回车事件选中item
    var selectSuggestion = function () {
        if (activeIndex > -1 && suggestions.length > 0) {
            var item = suggestions[activeIndex];
            handleClick(item);
        }
    };
    // 关闭搜索弹窗
    var handleCloseSuggestion = function () {
        setRender(false);
    };
    // 动画结束后
    var handleAnimationExited = function () {
        setSuggestions([]);
    };
    // 键盘切换MenuItem
    var toggleMenuItem = function (direction) {
        var _a, _b;
        var index;
        if (direction === "next") {
            index =
                activeIndex === (suggestions === null || suggestions === void 0 ? void 0 : suggestions.length) - 1
                    ? (suggestions === null || suggestions === void 0 ? void 0 : suggestions.length) - 1
                    : activeIndex + 1;
            setActive(index);
        }
        else {
            index = activeIndex === 0 ? 0 : activeIndex - 1;
            setActive(index);
        }
        var suggestionWrapperRef = (_a = componentRef.current) === null || _a === void 0 ? void 0 : _a.querySelector("." + nameSpace + "-autocomplete__list");
        var suggestionRefs = (_b = componentRef.current) === null || _b === void 0 ? void 0 : _b.querySelectorAll("li." + nameSpace + "-autocomplete__item");
        if (suggestionWrapperRef && suggestionRefs && suggestionRefs.length > 0) {
            var hightItemEl = suggestionRefs[index];
            var scrollTop = suggestionWrapperRef.scrollTop, clientHeight = suggestionWrapperRef.clientHeight; // 当前wrapper滚动距离
            var scrollHeight = hightItemEl.scrollHeight, offsetTop = hightItemEl.offsetTop; // 每一个元素的高度 外部传入都不一定所以单个都要计算
            var currentElTop = offsetTop + scrollHeight; // 元素底部距离 parent顶部位置
            var screenMaxHeight = scrollTop + clientHeight; // 当前屏幕所在最大高度
            if (currentElTop > screenMaxHeight) {
                suggestionWrapperRef.scrollTop += scrollHeight;
            }
            if (offsetTop < scrollTop) {
                suggestionWrapperRef.scrollTop -= scrollHeight;
            }
        }
    };
    var renderTemplate = function (value) {
        return renderOptions ? renderOptions(value) : value.value;
    };
    var renderSuggestion = function () {
        return (React.createElement("ul", { className: nameSpace + "-autocomplete__list", style: __assign({ width: width + "px" }, style) },
            loading && (React.createElement("span", { "data-testid": "icon", className: nameSpace + "-autocomplete__icon" },
                React.createElement(Icon, { className: "fa-spin", icon: "spinner" }))),
            suggestions.map(function (item, index) {
                var classes = classNames(nameSpace + "-autocomplete__item", {
                    "is-active": index === activeIndex,
                });
                return (React.createElement("li", { className: classes, onClick: function () { return handleClick(item); }, ref: suggestionItemRef, key: index }, renderTemplate(item)));
            })));
    };
    return (React.createElement("div", { className: classes, ref: componentRef },
        React.createElement(Input, __assign({ className: nameSpace + "-autocomplete__input", value: inputValue, style: { width: width + "px" }, onChange: handleChange, onKeyDown: handleKeyDown }, rest)),
        React.createElement(Transition, { in: shouldRender, timeout: 300, animationName: "zoom-in-top", onExited: handleAnimationExited, unmountOnExit: true }, renderSuggestion())));
};
AutoComplete.defaultProps = {
    debounceTime: 300,
};
export { AutoComplete };
