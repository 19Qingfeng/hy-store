import { useEffect, useState } from "react";
/**
 * debounce hooks
 * @param value 原始变化值
 * @param delay 延迟，ms。默认300s
 */
export default function useDebounce(value, delay) {
    if (delay === void 0) { delay = 300; }
    var _a = useState(value), debounceValue = _a[0], setDebounceValue = _a[1];
    useEffect(function () {
        var timer = setTimeout(function () {
            setDebounceValue(value);
        }, delay);
        return function () {
            clearTimeout(timer);
        };
    }, [value, delay]);
    return debounceValue;
}
