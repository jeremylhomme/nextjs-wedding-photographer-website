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
import { getLocalizedService } from '@/src/config/services';
import { serviceGroups } from '@/src/config/service-groups';
import { categories, getLocalizedCategory } from '@/src/config/categories';
import { ServicePopupMenu } from '@/src/components/ui/service-popup-menu';
import { Metadata } from 'next';
import { ParallaxScrollSecond } from '@/src/components/ui/parallax-scroll';
import Script from 'next/script';
import {
  generateWebsiteSchema,
  generateLocalBusinessSchema
} from '@/src/lib/structured-data';

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

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations('home-page');

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr';
  const url = `${siteUrl}/${params.locale}`;

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    openGraph: {
      title: t('metadata.openGraph.title'),
      description: t('metadata.openGraph.description'),
      type: 'website',
      url: url,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: t('metadata.openGraph.alt')
        }
      ]
    },
    alternates: {
      canonical: url,
      languages: {
        fr: `${siteUrl}/fr`,
        en: `${siteUrl}/en`
      }
    }
  };
}

const HomePage = async ({ params }: HomePageProps) => {
  const alt = await getTranslations('alt-images');
  const t = await getTranslations('home-page');
  const fs = await getTranslations('faq-section');
  const s = await getTranslations('services');
  const posts = await getBlogPosts(params.locale);

  // Get the latest 3 blog posts
  const latestPosts = posts.slice(0, 3);

  // Generate structured data using the metadata from generateMetadata
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr';
  const url = `${siteUrl}/${params.locale}`;
  const metadata = {
    title: t('metadata.title'),
    description: t('metadata.description'),
    openGraph: {
      title: t('metadata.openGraph.title'),
      description: t('metadata.openGraph.description'),
      type: 'website',
      url: url,
      siteName: t('metadata.openGraph.siteName'),
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: t('metadata.openGraph.alt')
        }
      ]
    }
  };

  const websiteSchema = generateWebsiteSchema(metadata);
  const localBusinessSchema = generateLocalBusinessSchema(metadata);
  const parallaxImages = [
    {
      src: '/wedding/jeremydan-wedding-photographer-ca-032-optimized.webp',
      alt: alt('wedding.ca.alt32')
    },
    {
      src: '/event/jeremydan-event-photographer-cc-037-optimized.webp',
      alt: alt('event.cc.alt37')
    },
    {
      src: '/company/jeremydan-company-photographer-df-037-optimized.webp',
      alt: alt('company.df.alt37')
    },
    {
      src: '/event/jeremydan-event-photographer-cc-056-optimized.webp',
      alt: alt('event.cc.alt56')
    },
    {
      src: '/family/jeremydan-lifestyle-family-photographer-gf-004-optimized.webp',
      alt: alt('family.gf.alt4')
    },
    {
      src: '/wedding/jeremydan-wedding-photographer-rth-047-optimized.webp',
      alt: alt('wedding.rth.alt47')
    },
    {
      src: '/wedding/jeremydan-wedding-photographer-rth-044-optimized.webp',
      alt: alt('wedding.rth.alt44')
    },
    {
      src: '/wedding/jeremydan-wedding-photographer-la-003-optimized.webp',
      alt: alt('wedding.la.alt3')
    },
    {
      src: '/wedding/jeremydan-wedding-photographer-rta-030-optimized.webp',
      alt: alt('wedding.rta.alt30')
    }
  ];
  const images: PhotoTileProps[] = [
    {
      src: '/event/jeremydan-event-photographer-cc-039-optimized.webp',
      alt: alt('event.cc.alt39'),
      priority: true
    },
    {
      src: '/wedding/jeremydan-wedding-photographer-ce-038-optimized.webp',
      alt: alt('wedding.ce.alt38')
    },
    {
      src: '/company/jeremydan-company-photographer-df-019-optimized.webp',
      alt: alt('company.df.alt19')
    },
    {
      src: '/family/jeremydan-lifestyle-family-photographer-gf-002-optimized.webp',
      alt: alt('family.gf.alt2')
    }
  ];

  return (
    <div className='mx-auto p-4'>
      <div className='relative'>
        <CarouselHero />
      </div>
      <div className='pt-10 md:pt-16'>
        <div className='mx-auto flex max-w-7xl flex-col gap-4'>
          <h1 className='font-serif text-4xl font-semibold lg:text-5xl'>
            {t('hero-title')}
          </h1>
          <p className='text-muted-foreground'>{t('hero-description1')}</p>
          <ul className='text-muted-foreground'>
            <li>
              <span className='text-primary-foreground'>
                {t('hero-bullet1-title')}
              </span>
              {t('hero-bullet1')}
            </li>
            <li>
              <span className='text-primary-foreground'>
                {t('hero-bullet2-title')}
              </span>
              {t('hero-bullet2')}
            </li>
            <li>
              <span className='text-primary-foreground'>
                {t('hero-bullet3-title')}
              </span>
              {t('hero-bullet3')}
            </li>
            <li>
              <span className='text-primary-foreground'>
                {t('hero-bullet4-title')}
              </span>
              {t('hero-bullet4')}
            </li>
          </ul>
          <p className='text-muted-foreground'>{t('hero-description2')}</p>
          <div className='flex flex-wrap justify-start gap-2'>
            {categories.map(category => (
              <ServicePopupMenu
                key={category}
                category={category}
                groupName={s(`groups.${category}`)}
                services={serviceGroups[category].map(service => ({
                  type: service,
                  label: s(`${category}-${service}`),
                  href: `${getLocalizedService(service, params.locale)}/${getLocalizedCategory(category, params.locale)}`
                }))}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:gap-16 md:border-0 md:py-16'>
        <div className='relative h-[50vh] pb-6 pt-10 sm:h-[50vh] md:mx-0 md:w-[80%] md:pb-0 md:pt-0'>
          <ClientImageWrapper
            src='/profil/jeremydan-photographer-sceaux-002-optimized.webp'
            alt={alt(`profil.alt2`)}
            className='h-full w-full object-cover md:border md:p-4'
          />
        </div>
        <div className='flex flex-col gap-4 text-left md:mx-auto md:w-2/3 md:py-0'>
          <h2 className='font-serif text-3xl md:mx-0 lg:text-4xl'>
            {t('subtitle')}
          </h2>
          <p className='text-muted-foreground'>{t('description1')}</p>
          <p className='text-muted-foreground'>{t('description2')}</p>
          <Button variant='default' size='default' className='w-fit md:mx-0'>
            <Link href='/about'>{t('button-label')}</Link>
          </Button>
        </div>
      </div>

      <PhotoTiles images={images} />
      <div className='mx-auto flex max-w-7xl flex-col pt-10 lg:pt-4'>
        <div className='flex flex-col gap-4'>
          <h2 className='font-serif text-3xl lg:text-4xl'>
            {t('photo-title2')}
          </h2>
          <p className='text-muted-foreground'>{t('photo-bullets-title')}</p>
          <ul className='list-disc pl-4 text-muted-foreground md:pl-8'>
            <li>{t('photo-bullet1')}</li>
            <li>{t('photo-bullet2')}</li>
            <li>{t('photo-bullet3')}</li>
          </ul>
          <p className='text-muted-foreground'>{t('photo-description4')}</p>
        </div>
      </div>
      <div className='prose dark:prose-invert mx-auto max-w-7xl pt-10 md:pt-12'>
        <ParallaxScrollSecond images={parallaxImages} />
      </div>
      <div className='mx-auto flex max-w-7xl flex-col pt-10'>
        <div className='flex flex-col gap-4'>
          <h2 className='font-serif text-3xl lg:text-4xl'>
            {t('video-title2')}
          </h2>
          <p className='text-muted-foreground'>{t('video-bullets-title')}</p>
          <ul className='list-disc pl-4 text-muted-foreground md:pl-8'>
            <li>{t('video-bullet1')}</li>
            <li>{t('video-bullet2')}</li>
          </ul>
          <p className='text-muted-foreground'>{t('video-description4')}</p>
          <h2 className='pt-4 font-serif text-3xl lg:text-4xl'>
            {t('title3')}
          </h2>
          <div className='relative h-[40vh]'>
            <ClientImageWrapper
              src='/wedding/jeremydan-wedding-photographer-ca-020-optimized.webp'
              alt={alt('wedding.ca.alt20')}
              className='h-full w-full object-cover'
            />
          </div>
          <p className='text-muted-foreground'>{t('description3')}</p>
          <p className='text-muted-foreground'>{t('description4')}</p>
          <p className='text-muted-foreground'>{t('description5')}</p>
          <Button
            variant='default'
            size='default'
            className='w-fit md:mx-0 md:mt-12'
          >
            <Link href='/contact'>{t('button-label2')}</Link>
          </Button>
        </div>
      </div>

      <div className='mx-auto max-w-7xl'>
        <div className='py-8 md:py-16'>
          <div className='mb-4 flex justify-center md:mb-8'>
            <VerticalLine />
          </div>
          <h2 className='text-center font-serif text-3xl lg:text-4xl'>
            {t('grid-blog-section.title')}
          </h2>
          <div className='mt-4 flex justify-center md:mt-8'>
            <VerticalLine />
          </div>
        </div>

        <GridBlog blogPosts={latestPosts} />

        <Button
          variant='default'
          size='default'
          className='mx-auto mt-8 flex w-fit md:mt-16'
        >
          <Link href='/blog'>{t('grid-blog-section.button-label3')}</Link>
        </Button>
      </div>

      <div className='align-center flex flex-col items-center pb-16'>
        <CarouselTestimonials />
      </div>
      <div className='mx-auto max-w-7xl pb-4 md:pb-16'>
        <div className=''>
          <h2 className='text-center font-serif text-3xl lg:text-4xl'>
            {fs('title')}
          </h2>
        </div>
        <FAQ />
      </div>
      <Script
        id='website-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id='local-business-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema)
        }}
      />
    </div>
  );
};

export default HomePage;
