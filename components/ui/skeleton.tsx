import { cn } from '@/lib/utils';
import * as React from 'react';

const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('animate-pulse bg-neutral-200', className)}
    style={{ borderRadius: 'var(--radius-md)', ...style }}
    {...props}
  />
));
Skeleton.displayName = 'Skeleton';

export { Skeleton };
