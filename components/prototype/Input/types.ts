import { InputHTMLAttributes } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  onChange?: (value: string | number) => void;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  helperTextClassName?: string;
  className?: string;
  size?: InputSize;
}

export interface InputRef {
  focus: () => void;
  blur: () => void;
  select: () => void;
}
