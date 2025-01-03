'use client';
import React, { useCallback, useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';
import ArrowLeft from './arrow-left';
import ArrowRight from './arrow-right';
import { useTranslations } from 'next-intl';
import FadeInImage from '@/src/components/fade-in-image';
import { Skeleton } from '@/src/components/ui/skeleton';

const CarouselHero: React.FC = () => {
  const t = useTranslations('carousel-hero');

  const heroImages = [
    {
      src: '/carousel-hero/hero-jeremydan-wedding-photography-001-optimized.webp',
      alt: t('alt1')
    },
    {
      src: '/carousel-hero/hero-jeremydan-wedding-photography-002-optimized.webp',
      alt: t('alt2')
    },
    {
      src: '/carousel-hero/hero-jeremydan-wedding-photography-003-optimized.webp',
      alt: t('alt3')
    },
    {
      src: '/carousel-hero/hero-jeremydan-wedding-photography-004-optimized.webp',
      alt: t('alt4')
    },
    {
      src: '/carousel-hero/hero-jeremydan-wedding-photography-005-optimized.webp',
      alt: t('alt5')
    },
    {
      src: '/carousel-hero/hero-jeremydan-wedding-photography-006-optimized.webp',
      alt: t('alt6')
    },
    {
      src: '/carousel-hero/hero-jeremydan-wedding-photography-007-optimized.webp',
      alt: t('alt7')
    }
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 20 }, [
    Fade()
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loadedImages, setLoadedImages] = React.useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className='embla relative h-[90vh] w-full pb-4' ref={emblaRef}>
      <div className='embla__container h-full w-full'>
        {heroImages.map((image, index) => (
          <div
            key={image.src}
            className='embla__slide relative flex h-full w-full items-center justify-center'
          >
            {/* Uncomment to add title */}
            <div className='absolute z-10 flex translate-y-[48%] justify-center'>
              <h1 className='z-10 bg-black/20 px-4 py-2 font-serif text-5xl text-muted'>
                {t('title')}
              </h1>
            </div>

            <div className='relative h-full w-full'>
              {!loadedImages[image.src] && (
                <Skeleton className='absolute inset-0 h-full w-full rounded-none' />
              )}
              <FadeInImage
                src={image.src}
                alt={image.alt}
                className='h-full overflow-hidden object-cover opacity-0 transition-opacity duration-300 data-[loaded=true]:opacity-100'
                onImageLoad={path =>
                  setLoadedImages(prev => ({ ...prev, [path]: true }))
                }
                priority={index === 0 || index === 1}
              />
            </div>
          </div>
        ))}
      </div>
      <div className='embla__pagination'>
        <button className='embla__prev' onClick={scrollPrev}>
          <ArrowLeft />
        </button>
        <button className='embla__next' onClick={scrollNext}>
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default CarouselHero;
