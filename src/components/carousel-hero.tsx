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
  const alt = useTranslations('alt-images');

  const heroImages = [
    {
      src: '/wedding/jeremydan-wedding-photographer-ca-036-optimized.webp',
      alt: alt('wedding.ca.alt36')
    },
    {
      src: '/company/jeremydan-company-photographer-farm-011-optimized.webp',
      alt: alt('company.farm.alt11')
    },
    {
      src: '/family/jeremydan-lifestyle-family-photographer-gf-010-optimized.webp',
      alt: alt('family.gf.alt10')
    },
    {
      src: '/event/jeremydan-event-photographer-cc-058-optimized.webp',
      alt: alt('event.cc.alt58')
    },
    {
      src: '/couple/jeremydan-couple-lifestyle-photographer-rt-025-optimized.webp',
      alt: alt('couple.rt.alt25')
    },
    {
      src: '/company/jeremydan-company-photographer-df-004-optimized.webp',
      alt: alt('company.df.alt4')
    },
    {
      src: '/wedding/jeremydan-wedding-photographer-mjb-004-optimized.webp',
      alt: alt('wedding.mjb.alt4')
    },
    {
      src: '/couple/jeremydan-couple-lifestyle-photographer-wm-012-optimized.webp',
      alt: alt('couple.wm.alt12')
    },
    {
      src: '/wedding/jeremydan-wedding-photographer-cf-007-optimized.webp',
      alt: alt('wedding.cf.alt7')
    },
    {
      src: '/wedding/jeremydan-wedding-photographer-ce-033-optimized.webp',
      alt: alt('wedding.ce.alt33')
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
    <div
      className='embla relative mx-auto h-[70vh] w-full shadow-lg shadow-card md:h-[90vh] lg:max-w-[80vw]'
      ref={emblaRef}
    >
      <div className='embla__container h-full w-full'>
        {heroImages.map((image, index) => (
          <div
            key={image.src}
            className='embla__slide relative flex h-full w-full items-center justify-center'
          >
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
      <div className='absolute top-[44%] z-10 flex w-full justify-center text-center'>
        <h2 className='z-10 bg-black/20 px-4 py-2 font-serif text-5xl text-muted'>
          {t('title')}
        </h2>
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
