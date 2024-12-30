'use client';

import React from 'react';
import CarouselHero from '@/src/components/carousel-hero';
import CarouselTestimonials from '@/src/components/carousel-testimonials';
import GridBlog from '@/src/components/grid-blog';
import { Button } from '@/src/components/ui/button';
import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/routing';
import { PhotoTiles } from '@/src/components/photo-tiles';
import VerticalLine from '@/src/components/vertical-line';
import FadeInImage from '@/src/components/fade-in-image';
import { blogPosts } from '@/src/data/blog-posts';

interface PhotoTileProps {
  src: string;
  alt: string;
  priority?: boolean;
}

const HomePage: React.FC = () => {
  const t = useTranslations('home-page');
  const pt = useTranslations('photo-tiles');
  const [loadedImages, setLoadedImages] = React.useState<{
    [key: string]: boolean;
  }>({});

  const filteredBlogPosts = blogPosts
    .filter(post => post.slug !== 'seance-couple-paris')
    .slice(0, 3);

  const images: PhotoTileProps[] = [
    {
      src: '/home-page/home-tiles-jeremydan-wedding-photography-001-lscape-optimized.webp',
      alt: pt('alt1'),
      priority: true
    },
    {
      src: '/home-page/home-tiles-jeremydan-wedding-photography-002-ptrait-optimized.webp',
      alt: pt('alt2')
    },
    {
      src: '/home-page/home-tiles-jeremydan-wedding-photography-003-ptrait-optimized.webp',
      alt: pt('alt3')
    },
    {
      src: '/home-page/home-tiles-jeremydan-wedding-photography-004-ptrait-optimized.webp',
      alt: pt('alt4')
    }
  ];

  return (
    <div className='mx-auto p-4'>
      <div className='relative'>
        <CarouselHero />
      </div>
      <div className='mx-auto flex max-w-4xl flex-col-reverse border-b pb-16 sm:flex-col md:flex-row md:gap-16 md:border-0 md:pb-24 md:pt-16'>
        <div className='relative sm:w-[70%] md:mx-0'>
          <FadeInImage
            src='/home-page/subhero-jeremydan-wedding-photography-001-ptrait-optimized.webp'
            alt='Two people hanging upside down'
            className='mx-auto h-auto w-full max-w-[720px] object-cover md:border md:p-8'
            onImageLoad={path =>
              setLoadedImages(prev => ({ ...prev, [path]: true }))
            }
          />
        </div>
        <div className='flex flex-col text-center md:mx-auto md:w-1/2 md:max-w-xl md:text-left'>
          <h2 className='mb-12 mt-8 font-serif text-5xl md:mx-0 md:mt-8 md:text-left'>
            {t('subtitle')}
          </h2>
          <p className='pb-8 text-muted-foreground md:mt-0'>
            {t('description')}
          </p>

          <Button
            variant='default'
            size='default'
            className='mx-auto mb-16 w-fit md:mx-0'
          >
            <Link href='/blog'>{t('button-label')}</Link>
          </Button>
        </div>
      </div>

      <PhotoTiles images={images} />

      <div className='mx-auto max-w-7xl'>
        <div className='my-16'>
          <div className='my-8 flex justify-center'>
            <VerticalLine />
          </div>
          <h2 className='text-center font-serif text-4xl'>
            {t('grid-blog-section.title')}
          </h2>
          <div className='my-8 flex justify-center'>
            <VerticalLine />
          </div>
        </div>

        <GridBlog blogPosts={filteredBlogPosts} />
        <Button
          variant='default'
          size='default'
          className='mx-auto mt-16 flex w-fit'
        >
          <Link href='/blog'>{t('grid-blog-section.button-label')}</Link>
        </Button>
      </div>

      <div className='align-center my-16 flex flex-col items-center'>
        <CarouselTestimonials />
      </div>
    </div>
  );
};

export default HomePage;
