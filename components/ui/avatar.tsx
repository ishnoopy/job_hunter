import { cn } from '@/lib/utils';
import * as React from 'react';

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden',
      className
    )}
    style={{ borderRadius: 'var(--radius-full)', ...style }}
    {...props}
  />
));
Avatar.displayName = 'Avatar';

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn('aspect-square h-full w-full object-cover', className)}
    {...props}
  />
));
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center bg-neutral-100 text-neutral-600 text-sm font-medium',
      className
    )}
    style={{ borderRadius: 'var(--radius-full)', ...style }}
    {...props}
  />
));
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarFallback, AvatarImage };
