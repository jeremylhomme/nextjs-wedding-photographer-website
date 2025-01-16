import { cn } from '@/src/lib/utils';

interface BlogBoldProps {
  children: React.ReactNode;
  className?: string;
}

export default function BlogBold({ children, className }: BlogBoldProps) {
  return (
    <span className={cn('font-semibold text-primary-foreground', className)}>
      {children}
    </span>
  );
}
