import { RefObject, useEffect } from "react";

/**
 * 判断是否点击的是元素外部
 * @param ref  元素区域
 * @param handler 点击外部触发的函数
 */

export default function useOutside(
  ref: RefObject<HTMLElement>,
  handler: Function
) {
  const listener = function (e: MouseEvent) {
    if (!ref || ref.current?.contains(e.target as HTMLElement)) {
      return;
    }
    handler(e);
  };

  useEffect(() => {
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
}
