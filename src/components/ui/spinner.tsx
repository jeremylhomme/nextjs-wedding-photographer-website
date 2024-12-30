import React from 'react';
import { cn } from '@/src/lib/utils';

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

export function Spinner({ size = 'md', className, ...props }: SpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4'
  };

  return (
    <div role='status' className='flex items-center justify-center' {...props}>
      <div
        className={cn(
          'animate-spin rounded-full border-muted-foreground/20',
          'border-t-muted-foreground',
          sizeClasses[size],
          className
        )}
      />
      <span className='sr-only'>Loading...</span>
    </div>
  );
}

export function PageSpinner() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Spinner size='lg' />
    </div>
  );
}
