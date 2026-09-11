import { useState, useEffect } from "react";

/**
 * useDebounce — delay giá trị input để tránh gọi API liên tục
 * @param {any} value — giá trị cần debounce
 * @param {number} delay — thời gian delay (ms), default 400ms
 */
const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;