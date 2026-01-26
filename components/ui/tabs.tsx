import { cn } from '@/lib/utils';
import * as React from 'react';

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

const useTabsContext = (): TabsContextValue => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs component');
  }
  return context;
};

export interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ value, onValueChange, children, className }, ref) => {
    return (
      <TabsContext.Provider value={{ value, onValueChange }}>
        <div ref={ref} className={cn('w-full', className)}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = 'Tabs';

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center border border-neutral-200 bg-transparent p-1',
      className
    )}
    style={{ borderRadius: 'var(--radius-full)', gap: 'var(--spacing-2)', ...style }}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, style, ...props }, ref) => {
    const { value: selectedValue, onValueChange } = useTabsContext();
    const isActive = selectedValue === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        onClick={() => onValueChange(value)}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap px-4 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50',
          isActive
            ? 'bg-neutral-900 text-text-inverse'
            : 'text-neutral-600 hover:text-neutral-900',
          className
        )}
        style={{ borderRadius: 'var(--radius-full)', ...style }}
        {...props}
      />
    );
  }
);
TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, style, ...props }, ref) => {
    const { value: selectedValue } = useTabsContext();
    const isActive = selectedValue === value;

    if (!isActive) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="tabpanel"
        className={cn('', className)}
        style={{ marginTop: 'var(--spacing-4)', ...style }}
        {...props}
      />
    );
  }
);
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsContent, TabsList, TabsTrigger };
