import { useEffect } from "react";
/**
 * 判断是否点击的是元素外部
 * @param ref  元素区域
 * @param handler 点击外部触发的函数
 */
export default function useOutside(ref, handler) {
    var listener = function (e) {
        var _a;
        if (!ref || ((_a = ref.current) === null || _a === void 0 ? void 0 : _a.contains(e.target))) {
            return;
        }
        handler(e);
    };
    useEffect(function () {
        document.addEventListener("click", listener);
        return function () {
            document.removeEventListener("click", listener);
        };
    }, [ref, handler]);
}
