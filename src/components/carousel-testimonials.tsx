'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FadeInImage from '@/src/components/fade-in-image';
import { useTranslations } from 'next-intl';
import { Button } from '@/src/components/ui/button';
import VerticalLine from '@/src/components/vertical-line';

const CarouselTestimonials: React.FC = () => {
  const t = useTranslations('carousel-testimonials');
  const testimonials = [
    {
      name: t('name1'),
      description: t('description1'),
      location: t('location1'),
      image:
        '/testimonials/testimony-jeremydan-wedding-photography-001-optimized.webp',
      alt: t('alt1')
    },
    {
      name: t('name2'),
      description: t('description2'),
      location: t('location2'),
      image:
        '/testimonials/testimony-jeremydan-wedding-photography-002-optimized.webp',
      alt: t('alt2')
    },
    {
      name: t('name3'),
      description: t('description3'),
      location: t('location3'),
      image:
        '/testimonials/testimony-jeremydan-wedding-photography-003-optimized.webp',
      alt: t('alt3')
    },
    {
      name: t('name4'),
      description: t('description4'),
      location: t('location4'),
      image:
        '/testimonials/testimony-jeremydan-wedding-photography-004-optimized.webp',
      alt: t('alt4')
    },
    {
      name: t('name5'),
      description: t('description5'),
      location: t('location5'),
      image:
        '/testimonials/testimony-jeremydan-wedding-photography-005-optimized.webp',
      alt: t('alt5')
    },
    {
      name: t('name6'),
      description: t('description6'),
      location: t('location6'),
      image:
        '/testimonials/testimony-jeremydan-wedding-photography-006-optimized.webp',
      alt: t('alt6')
    }
  ];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Fade()]);
  const [loadedImages, setLoadedImages] = React.useState<{
    [key: string]: boolean;
  }>({});

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className='relative w-full max-w-[1080px]'>
      <div className='my-16'>
        <div className='my-8 flex justify-center'>
          <VerticalLine />
        </div>
        <h2 className='text-center font-serif text-4xl'>{t('title')}</h2>
        <div className='my-8 flex justify-center'>
          <VerticalLine />
        </div>
      </div>
      <div ref={emblaRef} className='overflow-hidden'>
        <div className='backface-hidden flex touch-pan-y bg-black'>
          {testimonials.map((testimony, index) => (
            <div
              key={testimony.name}
              className='relative flex min-w-full flex-col items-center'
            >
              <div className='relative mx-auto h-[400px] w-full'>
                <div className='absolute inset-0 flex'>
                  <FadeInImage
                    src={testimony.image}
                    alt={testimony.alt}
                    className='h-full overflow-hidden object-cover opacity-0 transition-opacity duration-300 data-[loaded=true]:opacity-100'
                    onImageLoad={path =>
                      setLoadedImages(prev => ({ ...prev, [path]: true }))
                    }
                  />
                </div>
                {/* Overlay directly on top of the image */}
                <div className='absolute inset-0 bg-black/60' />

                {/* Content container with fixed height */}
                <div className='absolute inset-0 flex flex-col items-center justify-center px-4'>
                  <div className='w-full max-w-2xl text-center'>
                    <p className='mb-4 font-serif text-xl text-white'>
                      {testimony.name}
                    </p>
                    <p className='mb-4 whitespace-pre-wrap text-sm text-white/80'>
                      {testimony.description}
                    </p>
                    <p className='text-xs text-white/60'>
                      {testimony.location}
                    </p>
                    <div className='mt-4 flex justify-center gap-4'>
                      <button onClick={scrollPrev}>
                        <ChevronLeft className='text-white' />
                      </button>
                      <button onClick={scrollNext}>
                        <ChevronRight className='text-white' />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='align-center flex flex-col items-center'>
          <Button variant='default' size='default' className='mt-16 w-fit'>
            <a href='https://g.page/r/CSwUMLY4jFaNEAE/review' target='_blank'>
              {t('button-label')}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarouselTestimonials;
