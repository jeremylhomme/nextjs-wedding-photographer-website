'use client';

import { cn } from '@/src/lib/utils';
import { Skeleton } from '@/src/components/ui/skeleton';
import React from 'react';
import FadeInImage from '@/src/components/fade-in-image';
import { useTranslations } from 'next-intl';

interface PhotoTileProps {
  src: string;
  alt: string;
  priority?: boolean;
}

interface PhotoTilesProps {
  images: PhotoTileProps[];
}

export function PhotoTiles({ images }: PhotoTilesProps) {
  const t = useTranslations('photo-tiles');
  const [loadedImages, setLoadedImages] = React.useState<{
    [key: string]: boolean;
  }>({});

  return (
    <div
      className={cn(
        'relative mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3'
      )}
    >
      <div className='col-start-1 row-start-1 gap-4 pt-10 md:col-start-2 md:row-start-2 md:gap-0 md:pt-0 lg:col-start-2 lg:row-start-2 lg:block'>
        <h2 className='mb-4 font-serif text-3xl md:text-right lg:text-4xl'>
          {t('title')}
        </h2>
        <p className='pb-6 text-muted-foreground md:pb-0 md:text-right'>
          {t('description')}
        </p>
      </div>
      {images.map((photo, index) => (
        <div
          key={photo.src}
          className={cn('group relative aspect-[2/3] overflow-hidden', {
            'aspect-[3/2] md:col-span-2': index === 0,
            'lg:row-span-2': index === 3
          })}
        >
          {!loadedImages[photo.src] && (
            <Skeleton className='absolute inset-0 h-full w-full rounded-none' />
          )}
          <FadeInImage
            src={photo.src}
            alt={photo.alt}
            priority={photo.priority}
            className='object-cover opacity-0 transition-opacity duration-300 data-[loaded=true]:opacity-100'
            onImageLoad={path =>
              setLoadedImages(prev => ({ ...prev, [path]: true }))
            }
          />
        </div>
      ))}
    </div>
  );
}
