import { cn } from '@/src/lib/utils';
import { createElement } from 'react';

interface BlogTitleProps {
  level?: 1 | 2 | 3;
  className?: string;
  children: React.ReactNode;
}

export default function BlogTitle({
  level = 1,
  className,
  children
}: BlogTitleProps) {
  const baseStyles = 'font-serif font-semibold text-primary-foreground';
  const styles = {
    1: 'text-4xl md:text-5xl mt-12 mb-8',
    2: 'text-3xl md:text-4xl !mt-10 mb-6',
    3: 'text-2xl md:text-2xl mt-8 mb-4'
  };

  return createElement(
    `h${level}`,
    { className: cn(baseStyles, styles[level], className) },
    children
  );
}
