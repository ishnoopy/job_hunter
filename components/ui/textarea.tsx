import { cn } from '@/lib/utils';
import * as React from 'react';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, style, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full border border-neutral-300 bg-bg-primary px-4 py-3 text-base transition-colors placeholder:text-neutral-400 hover:border-border-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        style={{ borderRadius: 'var(--radius-lg)', ...style }}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
