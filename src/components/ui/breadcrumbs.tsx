'use client';

import { Link } from '@/src/i18n/routing';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className='mb-4 flex items-center space-x-2 text-sm text-muted-foreground'>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={item.href} className='flex items-center'>
            {index > 0 && <ChevronRight className='mx-2 h-4 w-4' />}
            <Link
              href={item.href}
              className={cn(
                'transition-colors',
                isLast
                  ? 'font-medium text-primary-foreground'
                  : 'hover:text-secondary'
              )}
              aria-current={isLast ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
