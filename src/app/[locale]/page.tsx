'use server';

import React from 'react';
import CarouselHero from '@/src/components/carousel-hero';
import CarouselTestimonials from '@/src/components/carousel-testimonials';
import { Button } from '@/src/components/ui/button';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/src/i18n/routing';
import { PhotoTiles } from '@/src/components/photo-tiles';
import VerticalLine from '@/src/components/vertical-line';
import ClientImageWrapper from '@/src/components/client-image-wrapper';
import { getBlogPosts } from '@/src/lib/mdx';
import GridBlog from '@/src/components/grid-blog';
import FAQ from '@/src/components/faq';

interface PhotoTileProps {
  src: string;
  alt: string;
  priority?: boolean;
}

interface HomePageProps {
  params: {
    locale: string;
  };
}

const HomePage = async ({ params }: HomePageProps) => {
  const t = await getTranslations('home-page');
  const pt = await getTranslations('photo-tiles');
  const fs = await getTranslations('faq-section');
  const posts = await getBlogPosts(params.locale);

  // Get the latest 3 blog posts
  const latestPosts = posts.slice(0, 3);

  const images: PhotoTileProps[] = [
    {
      src: '/home-page/home-tiles-jeremydan-wedding-photography-001-optimized.webp',
      alt: pt('alt1'),
      priority: true
    },
    {
      src: '/home-page/home-tiles-jeremydan-wedding-photography-002-optimized.webp',
      alt: pt('alt2')
    },
    {
      src: '/home-page/home-tiles-jeremydan-wedding-photography-003-optimized.webp',
      alt: pt('alt3')
    },
    {
      src: '/home-page/home-tiles-jeremydan-wedding-photography-004-optimized.webp',
      alt: pt('alt4')
    }
  ];

  return (
    <div className='mx-auto p-4'>
      <div className='relative'>
        <CarouselHero />
      </div>
      <div className='container border-b py-16 text-center'>
        <div className='mx-auto flex max-w-screen-lg flex-col gap-6'>
          <h1 className='font-serif text-4xl font-semibold lg:text-5xl'>
            {t('hero-title')}
          </h1>
          <p className='text-balance text-muted-foreground'>
            {t('hero-description')}
          </p>
        </div>
      </div>
      <div className='mx-auto flex max-w-4xl flex-col-reverse border-b md:flex-row md:gap-16 md:border-0 md:py-16'>
        <div className='relative h-[50vh] pb-16 sm:h-[60vh] md:mx-0 md:w-[80%] md:pb-0'>
          <ClientImageWrapper
            src='/home-page/subhero-jeremydan-wedding-photography-001-optimized.webp'
            alt='Two people hanging upside down'
            className='h-full w-full object-cover md:border md:p-4'
          />
        </div>
        <div className='flex flex-col py-16 text-center md:mx-auto md:w-2/3 md:py-0 md:text-left'>
          <h2 className='mb-8 font-serif text-3xl md:mx-0 md:text-left lg:text-4xl'>
            {t('subtitle')}
          </h2>
          <p className='text-muted-foreground md:mt-0'>{t('description1')}</p>
          <p className='mt-4 pb-8 text-muted-foreground'>{t('description2')}</p>

          <Button
            variant='default'
            size='default'
            className='mx-auto w-fit md:mx-0'
          >
            <Link href='/about'>{t('button-label')}</Link>
          </Button>
        </div>
      </div>

      <PhotoTiles images={images} />
      <div className='mx-auto flex max-w-4xl flex-col'>
        <h2 className='mb-4 mt-12 font-serif text-4xl'>{t('title2')}</h2>
        <p className='mt-4 text-muted-foreground'>{t('bullets-title')}</p>
        <ul className='list-disc pl-8 text-muted-foreground'>
          <li className='mt-4'>{t('bullet1')}</li>
          <li>{t('bullet2')}</li>
          <li>{t('bullet3')}</li>
        </ul>
        <p className='mt-4 text-muted-foreground'>{t('description3')}</p>
        <h2 className='mb-4 mt-12 font-serif text-4xl'>{t('title3')}</h2>
        <div className='relative my-8 h-[40vh]'>
          <ClientImageWrapper
            src='/home-page/subhero-jeremydan-wedding-photography-002-optimized.webp'
            alt='Two people hanging upside down'
            className='h-full w-full object-cover'
          />
        </div>
        <p className='mt-4 text-muted-foreground'>{t('description5')}</p>
        <p className='mt-4 text-muted-foreground'>{t('description6')}</p>
        <p className='mt-4 text-muted-foreground'>{t('description7')}</p>
        <Button
          variant='default'
          size='default'
          className='mx-auto mt-8 w-fit md:mx-0'
        >
          <Link href='/contact'>{t('button-label2')}</Link>
        </Button>
      </div>

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

        <GridBlog blogPosts={latestPosts} />

        <Button
          variant='default'
          size='default'
          className='mx-auto mt-16 flex w-fit'
        >
          <Link href='/blog'>{t('grid-blog-section.button-label3')}</Link>
        </Button>
      </div>

      <div className='align-center mb-16 flex flex-col items-center'>
        <CarouselTestimonials />
      </div>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-12'>
          <h2 className='text-center font-serif text-4xl'>{fs('title')}</h2>
        </div>
        <FAQ />
      </div>
    </div>
  );
};

export default HomePage;
