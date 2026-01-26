import { cn } from '@/lib/utils';
import * as React from 'react';

interface DialogContextValue {
  isOpen: boolean;
  onClose: () => void;
}

const DialogContext = React.createContext<DialogContextValue | undefined>(
  undefined
);

const useDialogContext = (): DialogContextValue => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog component');
  }
  return context;
};

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children }) => {
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <DialogContext.Provider value={{ isOpen, onClose }}>
      {children}
    </DialogContext.Provider>
  );
};
Dialog.displayName = 'Dialog';

const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { onClose } = useDialogContext();

  return (
    <div
      ref={ref}
      className={cn(
        'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
        className
      )}
      onClick={onClose}
      {...props}
    />
  );
});
DialogOverlay.displayName = 'DialogOverlay';

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <DialogOverlay />
    <div
      ref={ref}
      className={cn(
        'relative z-50 w-full max-w-lg bg-bg-primary p-6',
        className
      )}
      style={{ borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', ...style }}
      onClick={(e) => e.stopPropagation()}
      {...props}
    />
  </div>
));
DialogContent.displayName = 'DialogContent';

const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col text-center sm:text-left', className)}
    style={{ gap: 'var(--spacing-2)', ...style }}
    {...props}
  />
));
DialogHeader.displayName = 'DialogHeader';

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('text-2xl font-semibold text-neutral-900', className)}
    {...props}
  />
));
DialogTitle.displayName = 'DialogTitle';

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-text-secondary', className)}
    {...props}
  />
));
DialogDescription.displayName = 'DialogDescription';

const DialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    style={{ marginTop: 'var(--spacing-6)', ...style }}
    {...props}
  />
));
DialogFooter.displayName = 'DialogFooter';

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
};
