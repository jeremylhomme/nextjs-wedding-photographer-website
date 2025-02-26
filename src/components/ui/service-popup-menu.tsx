'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/src/components/ui/button';
import { Link } from '@/src/i18n/routing';
import { ServiceType } from '@/src/config/services';
import { CategoryType } from '@/src/config/categories';

interface ServicePopupMenuProps {
  category: CategoryType;
  groupName: string;
  services: {
    type: ServiceType;
    label: string;
    href: string;
  }[];
}

export function ServicePopupMenu({
  groupName,
  services
}: ServicePopupMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Close the popup when clicking outside
  const popupRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative' ref={popupRef}>
      {/* Hidden links for SEO - visible to screen readers and search engines */}
      <div className='sr-only'>
        {services.map(service => (
          <Link key={service.type} href={`/${service.href}`}>
            {service.label}
          </Link>
        ))}
      </div>

      <Button
        variant='category'
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {groupName}
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className='absolute left-1/2 z-50 mt-2 flex -translate-x-1/2 flex-col gap-1 rounded-md border bg-card p-1 text-muted-foreground shadow-md'
          >
            {services.map(service => (
              <Button
                key={service.type}
                variant='ghost'
                className='whitespace-nowrap'
                asChild
              >
                <Link href={`/${service.href}`}>{service.label}</Link>
              </Button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
