import { forwardRef } from 'react';
import type { ButtonProps, ButtonVariant, ButtonSize } from './types';

const baseClass =
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600 dark:bg-blue-400 dark:hover:bg-blue-400 dark:focus:ring-blue-400',
  secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-gray-500',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 border border-transparent focus:ring-gray-400 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-500',
  error: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-700',
  warning: 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500 focus:ring-yellow-400 dark:bg-yellow-600 dark:text-yellow-100 dark:hover:bg-yellow-700 dark:focus:ring-yellow-600',
};

const sizeClass: Record<ButtonSize, string> = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      type = 'button',
      className = '',
      disabled = false,
      variant = 'primary',
      size = 'md',
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        className={`${baseClass} ${variantClass[variant as ButtonVariant]} ${sizeClass[size as ButtonSize]} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
