import { TextareaHTMLAttributes, forwardRef } from "react";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  label?: string;
  error?: string;
  helperText?: string;
  onChange?: (value: string) => void;
  containerClassName?: string;
  labelClassName?: string;
  textareaClassName?: string;
  errorClassName?: string;
  helperTextClassName?: string;
}

export interface TextareaRef {
  focus: () => void;
  blur: () => void;
  select: () => void;
}
