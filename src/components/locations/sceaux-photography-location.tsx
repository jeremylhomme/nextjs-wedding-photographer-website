'use client';

import { ParallaxScrollSecond } from '@/src/components/ui/parallax-scroll';
import FadeInImage from '@/src/components/fade-in-image';
import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/routing';
import FAQ from '@/src/components/faq';
import { Button } from '@/src/components/ui/button';

export function SceauxPhotographyLocation() {
  const t = useTranslations('location-page.photography-sceaux');
  const images = [
    {
      src: '/parallax-scroll/photography-sceaux/jeremydan-photography-sceaux-001-optimized.webp',
      alt: t('parallax-scroll.image1')
    },
    {
      src: '/parallax-scroll/photography-sceaux/jeremydan-photography-sceaux-002-optimized.webp',
      alt: t('parallax-scroll.image2')
    },
    {
      src: '/parallax-scroll/photography-sceaux/jeremydan-photography-sceaux-003-optimized.webp',
      alt: t('parallax-scroll.image3')
    },
    {
      src: '/parallax-scroll/photography-sceaux/jeremydan-photography-sceaux-004-optimized.webp',
      alt: t('parallax-scroll.image4')
    },
    {
      src: '/parallax-scroll/photography-sceaux/jeremydan-photography-sceaux-005-optimized.webp',
      alt: t('parallax-scroll.image5')
    },
    {
      src: '/parallax-scroll/photography-sceaux/jeremydan-photography-sceaux-006-optimized.webp',
      alt: t('parallax-scroll.image6')
    },
    {
      src: '/parallax-scroll/photography-sceaux/jeremydan-photography-sceaux-007-optimized.webp',
      alt: t('parallax-scroll.image7')
    },
    {
      src: '/parallax-scroll/photography-sceaux/jeremydan-photography-sceaux-008-optimized.webp',
      alt: t('parallax-scroll.image8')
    },
    {
      src: '/parallax-scroll/photography-sceaux/jeremydan-photography-sceaux-009-optimized.webp',
      alt: t('parallax-scroll.image9')
    },
    {
      src: '/parallax-scroll/photography-sceaux/jeremydan-photography-sceaux-010-optimized.webp',
      alt: t('parallax-scroll.image10')
    },
    {
      src: '/parallax-scroll/photography-sceaux/jeremydan-photography-sceaux-011-optimized.webp',
      alt: t('parallax-scroll.image11')
    },
    {
      src: '/parallax-scroll/photography-sceaux/jeremydan-photography-sceaux-012-optimized.webp',
      alt: t('parallax-scroll.image12')
    },
    {
      src: '/parallax-scroll/photography-sceaux/jeremydan-photography-sceaux-013-optimized.webp',
      alt: t('parallax-scroll.image13')
    },
    {
      src: '/parallax-scroll/photography-sceaux/jeremydan-photography-sceaux-014-optimized.webp',
      alt: t('parallax-scroll.image14')
    },
    {
      src: '/parallax-scroll/photography-sceaux/jeremydan-photography-sceaux-015-optimized.webp',
      alt: t('parallax-scroll.image15')
    }
  ];

  return (
    <div className='mx-auto'>
      <div className='grid gap-8 border-b pb-16 md:gap-12 lg:grid-cols-2'>
        {/* Left column: Content */}
        <div className='order-1 flex flex-col justify-center md:order-none'>
          <div className='prose dark:prose-invert max-w-none'>
            <h1 className='font-serif text-3xl'>{t('main-title')}</h1>
            <p className='mt-4 text-muted-foreground'>{t('introduction')}</p>
            <p className='mt-4 text-muted-foreground'>{t('introduction2')}</p>
            <Button
              variant='default'
              size='default'
              className='mx-auto mt-8 w-fit md:mx-0'
            >
              <Link href='/about'>{t('button-label')}</Link>
            </Button>
          </div>
        </div>
        {/* Right column: Image */}
        <div className='order-2 md:order-none'>
          <div className='relative h-[400px] w-full md:h-[600px]'>
            <div className='flex h-full gap-2'>
              <FadeInImage
                src='/locations/photography-sceaux/jeremydan-photography-sceaux-001-optimized.webp'
                alt={t('alt1')}
                className='h-full w-full object-cover'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='prose dark:prose-invert max-w-none pt-16'>
        <ParallaxScrollSecond images={images} />
      </div>
      <div className='mx-auto max-w-4xl pt-16'>
        <div className='flex flex-col'>
          <div className='grid gap-8 md:gap-12 lg:grid-cols-2'>
            <div className='order-1 flex flex-col md:order-none'>
              <h2 className='mb-4 font-serif text-3xl'>{t('title2')}</h2>
              <p className='mb-4 leading-relaxed text-muted-foreground'>
                {t('content1')}
              </p>
              <p className='mb-4 leading-relaxed text-muted-foreground'>
                {t('content2')}
              </p>
              <p className='leading-relaxed text-muted-foreground'>
                {t('content3')}
              </p>
            </div>
            <div className='order-2 md:order-none'>
              <FadeInImage
                src='/locations/photography-sceaux/jeremydan-photography-sceaux-002-optimized.webp'
                alt={t('alt2')}
                className='h-full w-full object-cover'
              />
            </div>
          </div>

          <div className='py-8'>
            <h2 className='mb-4 font-serif text-3xl'>{t('title3')}</h2>
            <p className='mb-4 leading-relaxed text-muted-foreground'>
              {t('content4')}
            </p>
            <ul className='mb-8 space-y-2 text-muted-foreground'>
              <li>
                <span className='text-primary-foreground'>
                  {t('bullet1-b')}
                </span>
                {t('bullet1-content')}
              </li>
              <li>
                <span className='text-primary-foreground'>
                  {t('bullet2-b')}
                </span>
                {t('bullet2-content')}
              </li>
              <li>
                <span className='text-primary-foreground'>
                  {t('bullet3-b')}
                </span>
                {t('bullet3-content')}
              </li>
            </ul>
            <FadeInImage
              src='/locations/photography-sceaux/jeremydan-photography-sceaux-003-optimized.webp'
              alt={t('alt3')}
              className='mb-8 h-full w-full object-cover'
            />
            <p className='leading-relaxed text-muted-foreground'>
              {t('content5')}
            </p>
          </div>

          <div className='mb-8'>
            <h2 className='mb-4 font-serif text-3xl'>{t('title4')}</h2>
            <p className='mb-4 leading-relaxed text-muted-foreground'>
              {t('content6')}
              <Link
                className='text-primary-foreground underline'
                target='_blank'
                href='/contact'
              >
                {t('link2')}
              </Link>
              {t('content7')}
            </p>

            <h3 className='mb-4 font-semibold'>{t('subtitle1')}</h3>
            <ul className='mb-8 text-muted-foreground'>
              <li>
                <span className='text-primary-foreground'>
                  {t('bullet4-b')}
                </span>
                {t('bullet4-content')}
              </li>
              <li>
                <span className='text-primary-foreground'>
                  {t('bullet5-b')}
                </span>
                {t('bullet5-content')}
              </li>
              <li>
                <span className='text-primary-foreground'>
                  {t('bullet6-b')}
                </span>
                {t('bullet6-content')}
              </li>
            </ul>
            <div className='my-8 grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='relative h-[600px] overflow-hidden'>
                <FadeInImage
                  src='/locations/photography-sceaux/jeremydan-photography-sceaux-004-optimized.webp'
                  alt={t('alt4')}
                  className='absolute inset-0 h-full w-full object-cover'
                />
              </div>
              <div className='relative h-[600px] overflow-hidden'>
                <FadeInImage
                  src='/locations/photography-sceaux/jeremydan-photography-sceaux-005-optimized.webp'
                  alt={t('alt5')}
                  className='absolute inset-0 h-full w-full object-cover'
                />
              </div>
            </div>

            <h3 className='mb-4 font-semibold'>{t('subtitle2')}</h3>
            <ul className='mb-8 text-muted-foreground'>
              <li>
                <span className='text-primary-foreground'>
                  {t('bullet7-b')}
                </span>
                {t('bullet7-content')}
              </li>
              <li>
                <span className='text-primary-foreground'>
                  {t('bullet8-b')}
                </span>
                {t('bullet8-content')}
              </li>
              <li>
                <span className='text-primary-foreground'>
                  {t('bullet9-b')}
                </span>
                {t('bullet9-content')}
              </li>
              <li>
                <span className='text-primary-foreground'>
                  {t('bullet10-b')}
                </span>
                {t('bullet10-content')}
              </li>
            </ul>
            <div className='my-8 grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='relative h-[600px] overflow-hidden'>
                <FadeInImage
                  src='/locations/photography-sceaux/jeremydan-photography-sceaux-006-optimized.webp'
                  alt={t('alt6')}
                  className='absolute inset-0 h-full w-full object-cover'
                />
              </div>
              <div className='relative h-[600px] overflow-hidden'>
                <FadeInImage
                  src='/locations/photography-sceaux/jeremydan-photography-sceaux-007-optimized.webp'
                  alt={t('alt7')}
                  className='absolute inset-0 h-full w-full object-cover'
                />
              </div>
            </div>
            <h3 className='mb-4 font-semibold'>{t('subtitle3')}</h3>
            <ul className='mb-8 text-muted-foreground'>
              <li>
                <span className='text-primary-foreground'>
                  {t('bullet11bis-b')}
                </span>
                {t('bullet11bis-content')}
              </li>
              <li>
                <span className='text-primary-foreground'>
                  {t('bullet11-b')}
                </span>
                {t('bullet11-content')}
              </li>
              <li>
                <span className='text-primary-foreground'>
                  {t('bullet12-b')}
                </span>
                {t('bullet12-content')}
              </li>
            </ul>
            <div className='my-8 grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='relative h-[600px] overflow-hidden'>
                <FadeInImage
                  src='/locations/photography-sceaux/jeremydan-photography-sceaux-008-optimized.webp'
                  alt={t('alt8')}
                  className='absolute inset-0 h-full w-full object-cover'
                />
              </div>
              <div className='relative h-[600px] overflow-hidden'>
                <FadeInImage
                  src='/locations/photography-sceaux/jeremydan-photography-sceaux-009-optimized.webp'
                  alt={t('alt9')}
                  className='absolute inset-0 h-full w-full object-cover'
                />
              </div>
            </div>
            <h3 className='mb-4 font-semibold'>{t('subtitle4')}</h3>
            <ul className='mb-8 text-muted-foreground'>
              <li>
                <span className='text-primary-foreground'>
                  {t('bullet13-b')}
                </span>
                {t('bullet13-content')}
              </li>
              <li>
                <span className='text-primary-foreground'>
                  {t('bullet14-b')}
                </span>
                {t('bullet14-content')}
              </li>
              <li>
                <span className='text-primary-foreground'>
                  {t('bullet15-b')}
                </span>
                {t('bullet15-content')}
              </li>
            </ul>
            <div className='my-8 grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='relative h-[600px] overflow-hidden'>
                <FadeInImage
                  src='/locations/photography-sceaux/jeremydan-photography-sceaux-010-optimized.webp'
                  alt={t('alt10')}
                  className='absolute inset-0 h-full w-full object-cover'
                />
              </div>
              <div className='relative h-[600px] overflow-hidden'>
                <FadeInImage
                  src='/locations/photography-sceaux/jeremydan-photography-sceaux-011-optimized.webp'
                  alt={t('alt11')}
                  className='absolute inset-0 h-full w-full object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-auto max-w-4xl'>
        <h2 className='mb-4 text-center font-serif text-3xl'>{t('title5')}</h2>
        <FAQ />
      </div>
    </div>
  );
}
