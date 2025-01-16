import { Link } from '@/src/i18n/routing';
import { Button } from '@/src/components/ui/button';

interface BlogButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
  external?: boolean;
}

export default function BlogButton({
  href,
  children,
  variant = 'default',
  className,
  external = false
}: BlogButtonProps) {
  const buttonContent = (
    <Button variant={variant} className={className}>
      {children}
    </Button>
  );

  if (external) {
    return (
      <a href={href} target='_blank' rel='noopener noreferrer'>
        {buttonContent}
      </a>
    );
  }

  return <Link href={href}>{buttonContent}</Link>;
}
