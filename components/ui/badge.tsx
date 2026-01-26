import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva(
  'inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-neutral-900 text-text-inverse',
        secondary: 'border-transparent bg-neutral-100 text-neutral-900',
        outline: 'text-neutral-950 border-neutral-200',
        success: 'border-transparent bg-green-100 text-green-800',
        warning: 'border-transparent bg-yellow-100 text-yellow-800',
        error: 'border-transparent bg-red-100 text-red-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        style={{ borderRadius: 'var(--radius-full)', ...style }}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
