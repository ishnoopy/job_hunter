import { cn } from '@/lib/utils';
import * as React from 'react';

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, style, ...props }, ref) => {
    return (
      <select
        className={cn(
          'flex w-full items-center justify-between border border-neutral-300 bg-bg-primary px-4 py-3 text-base transition-colors hover:border-border-hover focus:outline-none focus:ring-2 focus:ring-border-focus focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        style={{ borderRadius: 'var(--radius-lg)', height: 'var(--input-height)', ...style }}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = 'Select';

export { Select };
