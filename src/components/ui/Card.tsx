import { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '', style, ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl p-6 ${className}`}
      style={{
        backgroundColor: 'var(--color-card-bg)',
        border: '1px solid var(--color-card-border)',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardChildProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardChildProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }: CardChildProps) {
  return (
    <h3 className={`text-lg font-semibold text-white ${className}`}>
      {children}
    </h3>
  );
}

export function CardContent({ children, className = '' }: CardChildProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
