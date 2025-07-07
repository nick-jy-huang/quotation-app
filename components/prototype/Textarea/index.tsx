import { forwardRef } from 'react';
import { TextareaProps } from './types';
import { useDebouncedInputValue } from '@/hooks/useDebouncedInputValue';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps & { debounce?: number }>(
  (
    {
      label,
      error,
      helperText,
      onChange,
      debounce = 300,
      containerClassName = '',
      labelClassName = 'mb-1 block text-sm font-medium text-gray-700',
      textareaClassName = 'w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none',
      errorClassName = 'mt-1 text-sm text-red-600',
      helperTextClassName = 'mt-1 text-sm text-gray-500',
      className = '',
      rows = 4,
      value,
      ...props
    },
    ref
  ) => {
    const getValue = (val: any): string => {
      if (Array.isArray(val)) return val[0] ?? '';
      if (typeof val === 'string') return val;
      if (typeof val === 'number') return String(val);
      return '';
    };

    const [localValue, setLocalValue] = useDebouncedInputValue(getValue(value), onChange, debounce);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      let v: string = e.target.value;
      v = getValue(v);
      setLocalValue(v);
    };

    const baseTextareaClassName = `${textareaClassName} ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`;

    return (
      <div className={containerClassName}>
        {label && <label className={labelClassName}>{label}</label>}
        <textarea
          ref={ref}
          rows={rows}
          onChange={handleChange}
          value={localValue}
          className={baseTextareaClassName}
          {...props}
        />
        {error && <p className={errorClassName}>{error}</p>}
        {helperText && !error && <p className={helperTextClassName}>{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
