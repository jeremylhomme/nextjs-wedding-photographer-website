'use client';
import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/src/components/ui/button';
import ClientImageWrapper from '@/src/components/client-image-wrapper';
import ImageModal from '@/src/components/image-modal';
import { useTranslations } from 'next-intl';
import { Link } from '@/src/navigation';

interface ImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

const PortfolioPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);
  const t = useTranslations('portfolio-page');

  const images: ImageProps[] = [
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-001-optimized.webp',
      alt: `${t('images.alt1')}`,
      priority: true
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-002-optimized.webp',
      alt: `${t('images.alt2')}`
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-003-optimized.webp',
      alt: `${t('images.alt3')}`
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-004-optimized.webp',
      alt: `${t('images.alt4')}`
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-005-optimized.webp',
      alt: `${t('images.alt5')}`
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-006-optimized.webp',
      alt: `${t('images.alt6')}`
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-007-optimized.webp',
      alt: `${t('images.alt7')}`
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-008-optimized.webp',
      alt: `${t('images.alt8')}`
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-009-optimized.webp',
      alt: `${t('images.alt9')}`
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-010-optimized.webp',
      alt: `${t('images.alt10')}`
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-011-optimized.webp',
      alt: `${t('images.alt11')}`
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-012-optimized.webp',
      alt: `${t('images.alt12')}`
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-013-optimized.webp',
      alt: `${t('images.alt13')}`
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-014-optimized.webp',
      alt: `${t('images.alt14')}`
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-015-optimized.webp',
      alt: `${t('images.alt15')}`
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-016-optimized.webp',
      alt: `${t('images.alt16')}`
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-017-optimized.webp',
      alt: `${t('images.alt17')}`
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-018-optimized.webp',
      alt: `${t('images.alt18')}`
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-019-optimized.webp',
      alt: `${t('images.alt19')}`
    },
    {
      src: '/portfolio-page/portfolio-tiles-jeremydan-wedding-photography-020-optimized.webp',
      alt: `${t('images.alt20')}`
    }
  ];

  return (
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
      <div className='mx-auto max-w-7xl'>
        <div className='my-16 flex flex-col justify-center px-8 text-center md:w-1/2 md:max-w-lg md:text-left'>
          <h2 className='mb-8 font-serif text-3xl'>{t('subtitle')}</h2>
          <p className='mb-8 text-muted-foreground'>{t('description')}</p>
          <Link href='/contact'>
            <Button>{t('button-label')}</Button>
          </Link>
        </div>

        <div className='mx-auto grid grid-cols-2 gap-2 px-4 pb-4 lg:grid-cols-3'>
          {/* Row 1: portrait left, landscape right */}
          <motion.div
            onClick={() => setSelectedImage(images[0])}
            className='cursor-pointer'
          >
            <div
              className='relative h-full w-full'
              style={{ aspectRatio: '2/3' }}
            >
              <ClientImageWrapper
                src={images[0].src}
                alt={images[0].alt}
                className='absolute inset-0 h-full w-full object-cover object-center'
              />
            </div>
          </motion.div>
          <motion.div
            onClick={() => setSelectedImage(images[1])}
            className='cursor-pointer lg:col-span-2'
          >
            <div
              className='relative h-full w-full'
              style={{ aspectRatio: '3/2' }}
            >
              <ClientImageWrapper
                src={images[1].src}
                alt={images[1].alt}
                className='absolute inset-0 h-full w-full object-cover object-center'
              />
            </div>
          </motion.div>

          {/* Row 2: landscape left, portrait right */}
          <motion.div
            onClick={() => setSelectedImage(images[2])}
            className='cursor-pointer lg:col-span-2'
          >
            <div
              className='relative h-full w-full'
              style={{ aspectRatio: '3/2' }}
            >
              <ClientImageWrapper
                src={images[2].src}
                alt={images[2].alt}
                className='absolute inset-0 h-full w-full object-cover object-center'
              />
            </div>
          </motion.div>
          <motion.div
            onClick={() => setSelectedImage(images[3])}
            className='cursor-pointer'
          >
            <div
              className='relative h-full w-full'
              style={{ aspectRatio: '2/3' }}
            >
              <ClientImageWrapper
                src={images[3].src}
                alt={images[3].alt}
                className='absolute inset-0 h-full w-full object-cover object-center'
              />
            </div>
          </motion.div>

          {/* Row 3: single landscape */}
          <motion.div
            onClick={() => setSelectedImage(images[4])}
            className='col-span-2 cursor-pointer lg:col-span-3'
          >
            <div
              className='relative h-full w-full'
              style={{ aspectRatio: '3/2' }}
            >
              <ClientImageWrapper
                src={images[4].src}
                alt={images[4].alt}
                className='absolute inset-0 h-full w-full object-cover object-center'
              />
            </div>
          </motion.div>

          {/* Row 4: portrait left, landscape right */}
          <motion.div
            onClick={() => setSelectedImage(images[5])}
            className='cursor-pointer'
          >
            <div
              className='relative h-full w-full'
              style={{ aspectRatio: '2/3' }}
            >
              <ClientImageWrapper
                src={images[5].src}
                alt={images[5].alt}
                className='absolute inset-0 h-full w-full object-cover object-center'
              />
            </div>
          </motion.div>
          <motion.div
            onClick={() => setSelectedImage(images[6])}
            className='cursor-pointer lg:col-span-2'
          >
            <div
              className='relative h-full w-full'
              style={{ aspectRatio: '3/2' }}
            >
              <ClientImageWrapper
                src={images[6].src}
                alt={images[6].alt}
                className='absolute inset-0 h-full w-full object-cover object-center'
              />
            </div>
          </motion.div>

          {/* Row 5: landscape left, portrait right */}
          <motion.div
            onClick={() => setSelectedImage(images[7])}
            className='cursor-pointer lg:col-span-2'
          >
            <div
              className='relative h-full w-full'
              style={{ aspectRatio: '3/2' }}
            >
              <ClientImageWrapper
                src={images[7].src}
                alt={images[7].alt}
                className='absolute inset-0 h-full w-full object-cover object-center'
              />
            </div>
          </motion.div>
          <motion.div
            onClick={() => setSelectedImage(images[8])}
            className='cursor-pointer'
          >
            <div
              className='relative h-full w-full'
              style={{ aspectRatio: '2/3' }}
            >
              <ClientImageWrapper
                src={images[8].src}
                alt={images[8].alt}
                className='absolute inset-0 h-full w-full object-cover object-center'
              />
            </div>
          </motion.div>

          {/* Row 6: single landscape */}
          <motion.div
            onClick={() => setSelectedImage(images[9])}
            className='col-span-2 cursor-pointer lg:col-span-3'
          >
            <div
              className='relative h-full w-full'
              style={{ aspectRatio: '3/2' }}
            >
              <ClientImageWrapper
                src={images[9].src}
                alt={images[9].alt}
                className='absolute inset-0 h-full w-full object-cover object-center'
              />
            </div>
          </motion.div>

          {/* Row 7: portrait left, landscape right */}
          <motion.div
            onClick={() => setSelectedImage(images[10])}
            className='cursor-pointer'
          >
            <div
              className='relative h-full w-full'
              style={{ aspectRatio: '2/3' }}
            >
              <ClientImageWrapper
                src={images[10].src}
                alt={images[10].alt}
                className='absolute inset-0 h-full w-full object-cover object-center'
              />
            </div>
          </motion.div>
          <motion.div
            onClick={() => setSelectedImage(images[11])}
            className='cursor-pointer lg:col-span-2'
          >
            <div
              className='relative h-full w-full'
              style={{ aspectRatio: '3/2' }}
            >
              <ClientImageWrapper
                src={images[11].src}
                alt={images[11].alt}
                className='absolute inset-0 h-full w-full object-cover object-center'
              />
            </div>
          </motion.div>

          {/* Row 8: landscape left, portrait right */}
          <motion.div
            onClick={() => setSelectedImage(images[12])}
            className='cursor-pointer lg:col-span-2'
          >
            <div
              className='relative h-full w-full'
              style={{ aspectRatio: '3/2' }}
            >
              <ClientImageWrapper
                src={images[12].src}
                alt={images[12].alt}
                className='absolute inset-0 h-full w-full object-cover object-center'
              />
            </div>
          </motion.div>
          <motion.div
            onClick={() => setSelectedImage(images[13])}
            className='cursor-pointer'
          >
            <div
              className='relative h-full w-full'
              style={{ aspectRatio: '2/3' }}
            >
              <ClientImageWrapper
                src={images[13].src}
                alt={images[13].alt}
                className='absolute inset-0 h-full w-full object-cover object-center'
              />
            </div>
          </motion.div>

          {/* Row 9: single landscape */}
          <motion.div
            onClick={() => setSelectedImage(images[14])}
            className='col-span-2 cursor-pointer lg:col-span-3'
          >
            <div
              className='relative h-full w-full'
              style={{ aspectRatio: '3/2' }}
            >
              <ClientImageWrapper
                src={images[14].src}
                alt={images[14].alt}
                className='absolute inset-0 h-full w-full object-cover object-center'
              />
            </div>
          </motion.div>
          {/* Row 10: portrait left, landscape right */}
          <motion.div
            onClick={() => setSelectedImage(images[15])}
            className='cursor-pointer'
          >
            <div
              className='relative h-full w-full'
              style={{ aspectRatio: '2/3' }}
            >
              <ClientImageWrapper
                src={images[15].src}
                alt={images[15].alt}
                className='absolute inset-0 h-full w-full object-cover object-center'
              />
            </div>
          </motion.div>
          <motion.div
            onClick={() => setSelectedImage(images[16])}
            className='cursor-pointer lg:col-span-2'
          >
            <div
              className='relative h-full w-full'
              style={{ aspectRatio: '3/2' }}
            >
              <ClientImageWrapper
                src={images[16].src}
                alt={images[16].alt}
                className='absolute inset-0 h-full w-full object-cover object-center'
              />
            </div>
          </motion.div>

          {/* Row 11: landscape left, portrait right */}
          <motion.div
            onClick={() => setSelectedImage(images[17])}
            className='cursor-pointer lg:col-span-2'
          >
            <div
              className='relative h-full w-full'
              style={{ aspectRatio: '3/2' }}
            >
              <ClientImageWrapper
                src={images[17].src}
                alt={images[17].alt}
                className='absolute inset-0 h-full w-full object-cover object-center'
              />
            </div>
          </motion.div>
          <motion.div
            onClick={() => setSelectedImage(images[18])}
            className='cursor-pointer'
          >
            <div
              className='relative h-full w-full'
              style={{ aspectRatio: '2/3' }}
            >
              <ClientImageWrapper
                src={images[18].src}
                alt={images[18].alt}
                className='absolute inset-0 h-full w-full object-cover object-center'
              />
            </div>
          </motion.div>

          {/* Row 12: single landscape */}
          <motion.div
            onClick={() => setSelectedImage(images[19])}
            className='col-span-2 cursor-pointer lg:col-span-3'
          >
            <div
              className='relative h-full w-full'
              style={{ aspectRatio: '3/2' }}
            >
              <ClientImageWrapper
                src={images[19].src}
                alt={images[19].alt}
                className='absolute inset-0 h-full w-full object-cover object-center'
              />
            </div>
          </motion.div>
        </div>

        {/* Use the reusable ImageModal */}
        <ImageModal
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      </div>
    </div>
  );
};

export default PortfolioPage;
