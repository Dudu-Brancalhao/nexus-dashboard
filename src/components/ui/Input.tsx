import { forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string;
  error?: FieldError | string;
  icon?: React.ReactNode;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, helperText, ...rest }, ref) => {
    const errorMessage = typeof error === 'string' ? error : error?.message;

    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm">
          {label}
          {rest.required && <span className="text-red-500 ml-1">*</span>}
        </label>

        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            className={`
              w-full rounded-[6px] p-4 border-1 bg-[var(--color-card-bg)] border-[var(--color-border)] shadow-md transition-colors
              ${icon ? 'pl-12' : 'pl-3'}
              ${errorMessage ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-[#33323A] focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]'}
              disabled:bg-gray-100 disabled:cursor-not-allowed
              focus:outline-none
            `}
            {...rest}
          />
        </div>

        {errorMessage && (
          <p className="text-sm text-red-500 mt-1">
            {errorMessage}
          </p>
        )}

        {helperText && !errorMessage && (
          <p className="text-sm text-gray-500 mt-1">
            {helperText}
          </p>
        )}

      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;