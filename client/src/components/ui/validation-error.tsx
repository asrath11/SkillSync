import type { ValidationError } from '../../types/profile';
import { AlertCircle } from 'lucide-react';

interface ValidationErrorDisplayProps {
  errors: ValidationError[];
  field?: string;
  className?: string;
}

export function ValidationErrorDisplay({
  errors,
  field,
  className = ''
}: ValidationErrorDisplayProps) {
  // If field is specified, only show errors for that field
  const relevantErrors = field
    ? errors.filter(error => error.field === field)
    : errors;

  if (relevantErrors.length === 0) return null;
  console.log(relevantErrors)

  return (
    <div className={`space-y-1 ${className}`}>
      {relevantErrors.map((error, index) => (
        <div
          key={index}
          className="flex items-center gap-2 text-sm text-destructive"
        >
          <AlertCircle size={14} />
          <span>{error.message}</span>
        </div>
      ))}
    </div>
  );
} 