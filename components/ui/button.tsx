import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  'cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-primary text-text-primary hover:bg-primary-hover active:bg-primary-active shadow-sm',
        primary: 'bg-primary text-text-primary hover:bg-primary-hover active:bg-primary-active shadow-sm',
        secondary:
          'bg-secondary text-text-primary border border-border hover:bg-neutral-100',
        outline:
          'border border-border bg-transparent hover:bg-secondary text-text-primary',
        ghost: 'hover:bg-secondary text-text-primary',
        link: 'text-text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'px-4 text-sm',
        default: 'px-6 text-base',
        lg: 'px-8 text-lg',
        icon: 'w-10',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonSizeStyles = {
  sm: { height: 'var(--button-height-sm)' },
  default: { height: 'var(--button-height)' },
  lg: { height: 'var(--button-height-lg)' },
  icon: { height: 'var(--button-height)' },
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size = 'default', fullWidth, style, ...props }, ref) => {
    const sizeKey = size || 'default';
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        style={{ ...buttonSizeStyles[sizeKey], ...style }}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
