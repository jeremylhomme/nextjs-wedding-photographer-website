'use client';
import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ClientImageWrapper from '@/src/components/client-image-wrapper';
import ImageModal from '@/src/components/image-modal';
import { useTranslations } from 'next-intl';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { generateCanonicalUrl } from '@/src/lib/url';
interface ImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  category: 'wedding' | 'lifestyle' | 'event' | 'company' | 'couple' | 'family';
}

type Category = 'all' | ImageProps['category'];

const PortfolioPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const t = useTranslations('portfolio-page');
  const pathname = usePathname() || '';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr';

  const categories: Category[] = [
    'all',
    'wedding',
    'lifestyle',
    'event',
    'company',
    'couple',
    'family'
  ];

  const images: ImageProps[] = [
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-001-optimized.webp',
      alt: `${t('images.alt1')}`,
      priority: true,
      category: 'wedding'
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-002-optimized.webp',
      alt: `${t('images.alt2')}`,
      category: 'wedding'
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-003-optimized.webp',
      alt: `${t('images.alt3')}`,
      category: 'wedding'
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-004-optimized.webp',
      alt: `${t('images.alt4')}`,
      category: 'wedding'
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-005-optimized.webp',
      alt: `${t('images.alt5')}`,
      category: 'wedding'
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-006-optimized.webp',
      alt: `${t('images.alt6')}`,
      category: 'wedding'
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-007-optimized.webp',
      alt: `${t('images.alt7')}`,
      category: 'wedding'
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-008-optimized.webp',
      alt: `${t('images.alt8')}`,
      category: 'wedding'
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-009-optimized.webp',
      alt: `${t('images.alt9')}`,
      category: 'wedding'
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-010-optimized.webp',
      alt: `${t('images.alt10')}`,
      category: 'wedding'
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-011-optimized.webp',
      alt: `${t('images.alt11')}`,
      category: 'wedding'
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-012-optimized.webp',
      alt: `${t('images.alt12')}`,
      category: 'wedding'
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-013-optimized.webp',
      alt: `${t('images.alt13')}`,
      category: 'wedding'
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-014-optimized.webp',
      alt: `${t('images.alt14')}`,
      category: 'wedding'
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-015-optimized.webp',
      alt: `${t('images.alt15')}`,
      category: 'wedding'
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-016-optimized.webp',
      alt: `${t('images.alt16')}`,
      category: 'wedding'
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-017-optimized.webp',
      alt: `${t('images.alt17')}`,
      category: 'wedding'
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-018-optimized.webp',
      alt: `${t('images.alt18')}`,
      category: 'wedding'
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-019-optimized.webp',
      alt: `${t('images.alt19')}`,
      category: 'wedding'
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-020-optimized.webp',
      alt: `${t('images.alt20')}`,
      category: 'wedding'
    }
  ];

  const filteredImages =
    activeCategory === 'all'
      ? images
      : images.filter(image => image.category === activeCategory);

  // Create image gallery schema for structured data
  // ImageGallery schema for structured data
  const imageGallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: t('metadata.title'),
    description: t('metadata.description'),
    url: generateCanonicalUrl(pathname.replace(/^\/[^/]+\//, '')),
    author: {
      '@type': 'Person',
      name: 'Jeremy Dan',
      url: baseUrl
    },
    about: {
      '@type': 'Thing',
      name: 'Photography Portfolio',
      description: t('metadata.description')
    },
    image: images.map(img => ({
      '@type': 'ImageObject',
      contentUrl: `${baseUrl}${img.src}`,
      name: img.alt,
      description: img.alt
    }))
  };

  // Ensure we have enough images for the grid layout
  const displayedImages = filteredImages.slice(
    0,
    Math.min(filteredImages.length, 20)
  );

  return (
    <>
      <Script
        id='image-gallery-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }}
      />

      <div className='relative w-screen'>
        <div className='relative h-[70vh] w-full'>
          <ClientImageWrapper
            src='/portfolio-page/portfolio-jeremydan-wedding-photography-001-optimized.webp'
            alt='Hero image for blog'
            className='h-[70vh] w-full object-cover object-center'
          />
          <div className='absolute inset-0 flex items-center justify-center bg-black/30'>
            <h1 className='font-serif text-4xl text-white md:text-5xl'>
              {t('hero-title')}
            </h1>
          </div>
        </div>
        <div className='mx-auto max-w-4xl'>
          <div className='my-16 flex flex-col justify-center px-8 text-center'>
            <h2 className='mb-8 font-serif text-3xl'>{t('subtitle')}</h2>
            <p className='text-muted-foreground'>{t('description')}</p>
          </div>

          <div className='mb-16 flex flex-wrap justify-center gap-2'>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                }}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'border text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
                }`}
              >
                {t(`categories.${category}`)}
              </button>
            ))}
          </div>
        </div>
        {filteredImages.length === 0 ? (
          <div className='flex items-center justify-center py-12'>
            <p className='text-lg text-muted-foreground'>
              {t('no-images-message')}
            </p>
          </div>
        ) : (
          <div className='mx-auto grid grid-cols-1 gap-4 px-4 pb-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {displayedImages.map(image => (
              <motion.div
                key={image.src}
                onClick={() => setSelectedImage(image)}
                className='group relative cursor-pointer overflow-hidden'
              >
                <div className='relative aspect-[3/4] w-full'>
                  <ClientImageWrapper
                    src={image.src}
                    alt={image.alt}
                    className='absolute inset-0 h-full w-full object-cover object-center'
                  />
                  <div className='absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100' />
                </div>
              </motion.div>
            ))}
          </div>
        )}
        <ImageModal
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      </div>
    </>
  );
};

export default PortfolioPage;
