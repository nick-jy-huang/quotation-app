import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

export function useDebouncedInputValue<T extends string | number>(
  value: T,
  onChange?: (v: T) => void,
  debounce: number = 300,
) {
  const [localValue, setLocalValue] = useState<T>(value);
  const debouncedValue = useDebounce(localValue, debounce);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (onChange && debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue]);

  return [localValue, setLocalValue] as const;
}
