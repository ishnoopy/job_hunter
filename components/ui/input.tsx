import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const inputVariants = cva(
  'flex w-full rounded-md border bg-bg-primary px-4 py-3 text-base text-text-primary transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-border hover:border-border-hover',
        error: 'border-destructive focus-visible:ring-destructive',
      },
      inputSize: {
        sm: 'h-10 px-3 py-2 text-sm',
        default: 'px-4 py-3 text-base',
        lg: 'h-14 px-4 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize = 'default', type, style, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, inputSize, className }))}
        style={{
          height: inputSize === 'default' ? 'var(--input-height)' : undefined,
          ...style,
        }}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input, inputVariants };
