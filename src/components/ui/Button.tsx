import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  disabled,
  className,
  ...rest
}: ButtonProps) {
  const baseStyles = 'flex items-center justify-center gap-2 cursor-pointer font-semibold rounded-lg transition-all focus:outline-none focus:ring-1 focus:ring-offset-0 hover:translate-y-[-2px]';

  const variants = {
    primary: 'bg-[var(--color-accent)] text-white focus:ring-[var(--color-accent)] hover:shadow-[0_8px_24px_rgba(239,25,60,0.2)] disabled:bg-gray-500/15 disabled:cursor-not-allowed disabled:shadow-none',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 disabled:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300',
    ghost: 'bg-transparent text-white border-1 border-gray-700 hover:bg-[#151923] focus:ring-gray-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${loading || disabled ? 'cursor-not-allowed opacity-50' : ''}
        ${className || ''}
      `}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  )

}