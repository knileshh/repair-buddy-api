
import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, fullWidth, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col space-y-2", fullWidth && "w-full")}>
        {label && (
          <label 
            htmlFor={props.id} 
            className="text-sm font-medium text-foreground transition-colors"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none input-focus",
            error && "border-destructive focus:ring-destructive/50",
            fullWidth && "w-full",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-destructive animate-slide-up">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
