import { forwardRef } from "react";
import { InputProps } from "./types";
import { useDebouncedInputValue } from "@/hooks/useDebouncedInputValue";

const sizeClass = {
  sm: "px-2 py-1 text-xs h-8",
  md: "px-3 py-2 text-sm h-10",
  lg: "px-4 py-3 text-base h-12",
};

const Input = forwardRef<HTMLInputElement, InputProps & { debounce?: number }>(
  (
    {
      label,
      error,
      helperText,
      onChange,
      debounce = 300,
      containerClassName = "",
      labelClassName = "mb-1 block text-sm font-medium text-gray-700",
      inputClassName = "w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-700 focus:outline-none",
      errorClassName = "mt-1 text-sm text-red-600",
      helperTextClassName = "mt-1 text-sm text-gray-700",
      className = "",
      type = "text",
      size = "md",
      value,
      ...props
    },
    ref,
  ) => {
    const getValue = (val: any): string | number => {
      if (Array.isArray(val)) return val[0] ?? "";
      if (typeof val === "string" || typeof val === "number") return val;
      return "";
    };

    const [localValue, setLocalValue] = useDebouncedInputValue(
      getValue(value),
      onChange,
      debounce,
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let v: string | number =
        type === "number" ? Number(e.target.value) || 0 : e.target.value;
      v = getValue(v);
      setLocalValue(v);
    };

    const baseInputClassName = `${inputClassName} ${sizeClass[size]} ${error ? "border-red-500 focus:ring-red-500" : ""} ${className}`;

    return (
      <div className={containerClassName}>
        {label && <label className={labelClassName}>{label}</label>}
        <input
          ref={ref}
          type={type}
          onChange={handleChange}
          value={localValue}
          className={baseInputClassName}
          {...props}
        />
        {error && <p className={errorClassName}>{error}</p>}
        {helperText && !error && (
          <p className={helperTextClassName}>{helperText}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
