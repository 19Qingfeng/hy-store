import { useEffect, useState } from "react";
/**
 * debounce hooks
 * @param value 原始变化值
 * @param delay 延迟，ms。默认300s
 */
export default function useDebounce(value: any, delay: number = 300) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debounceValue;
}
