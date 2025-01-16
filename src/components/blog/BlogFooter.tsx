'use client';

import ClientImageWrapper from '@/src/components/client-image-wrapper';
import { useTranslations } from 'next-intl';
import { Link } from '@/src/navigation';
import { Button } from '@/src/components/ui/button';

export function BlogFooter() {
  const t = useTranslations('blog-footer');

  return (
    <div className='mt-16 border-t pt-16'>
      <div className='flex flex-col gap-8 md:flex-row md:items-center md:gap-12'>
        <div className='relative aspect-square w-full overflow-hidden rounded-lg md:w-1/4'>
          <ClientImageWrapper
            src='/about-page/about-jeremydan-wedding-photographer-optimized-square.webp'
            alt='Jeremy Fiori - Wedding Photographer'
            className='absolute inset-0 h-full w-full object-cover'
          />
        </div>
        <div className='flex-1 space-y-4'>
          <h2 className='font-serif text-2xl'>{t('title')}</h2>
          <p className='text-base leading-relaxed text-muted-foreground'>
            {t('description')}
          </p>
          <Button
            variant='default'
            size='default'
            className='mx-auto mt-8 w-fit md:mx-0'
          >
            <Link href='/about'>{t('button-label')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
