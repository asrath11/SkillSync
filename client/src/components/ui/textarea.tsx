import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from './label';
interface TextareaProps extends React.ComponentProps<'textarea'> {
  className?: string;
  error?: string;
  label?: string;
  required?: boolean;
}
function Textarea({
  className,
  error,
  label,
  required = false,
  ...props
}: TextareaProps) {
  return (
    <div className='space-y-3'>
      {label && (
        <Label className='text-sm font-semibold' htmlFor={label}>
          {label}
          {required || (error && <span className='text-red-500'>*</span>)}
        </Label>
      )}
      <textarea
        data-slot='textarea'
        className={cn(
          'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
          error && 'border-destructive'
        )}
        {...props}
      />
      {error && <p className='text-sm text-destructive'>{error}</p>}
    </div>
  );
}

export { Textarea };
