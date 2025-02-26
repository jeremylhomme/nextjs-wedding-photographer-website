'use client';

import { InfiniteSlider } from '@/src/components/ui/infinite-vertical-slider';
import FadeInImage from '@/src/components/fade-in-image';
import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/routing';
import FAQ from '@/src/components/faq';
import { Button } from '@/src/components/ui/button';

export function WeddingPhotographyService() {
  const t = useTranslations('service-page.wedding-photography');
  const WEDDING_IMAGES = Array.from({ length: 4 }, (_, i) => ({
    src: `/infinite-slider/wedding-photography/slider-jeremydan-wedding-photography-${String(i + 1).padStart(3, '0')}-optimized.webp`,
    alt: t(`slider.slider-image-${i + 1}`) as string
  }));

  const WEDDING_IMAGES_2 = Array.from({ length: 3 }, (_, i) => ({
    src: `/infinite-slider/wedding-photography/slider-jeremydan-wedding-photography-${String(i + 5).padStart(3, '0')}-optimized.webp`,
    alt: t(`slider.slider-image-${i + 5}`) as string
  }));

  return (
    <div className='mx-auto'>
      <div className='grid gap-8 border-b pb-16 md:gap-12 lg:grid-cols-2'>
        {/* Left column: Content */}
        <div className='order-1 flex flex-col justify-center md:order-none'>
          <div className='prose dark:prose-invert max-w-none'>
            <h1 className='font-serif text-3xl'>{t('main-title')}</h1>
            <p className='mt-4 text-muted-foreground'>{t('introduction')}</p>
            <Button
              variant='default'
              size='default'
              className='mx-auto mt-8 w-fit md:mx-0'
            >
              <Link href='/contact'>{t('button-label')}</Link>
            </Button>
          </div>
        </div>

        {/* Right column: Image Slider */}
        <div className='order-2 md:order-none'>
          <div className='relative h-[400px] w-full md:h-[600px]'>
            <div className='flex h-full gap-2'>
              <InfiniteSlider
                direction='vertical'
                className='h-[400px] flex-1 md:h-full'
                duration={50}
                gap={2}
                images={WEDDING_IMAGES}
                renderImage={(image, index) => (
                  <div
                    key={`left-${index}`}
                    className='relative h-[400px] overflow-hidden'
                    style={{ marginBottom: '8px' }}
                  >
                    <FadeInImage
                      src={image.src}
                      alt={image.alt}
                      className='h-full w-full object-cover'
                    />
                  </div>
                )}
              />
              <InfiniteSlider
                direction='vertical'
                reverse
                className='h-[400px] flex-1 md:h-full'
                duration={50}
                gap={2}
                images={WEDDING_IMAGES_2}
                renderImage={(image, index) => (
                  <div
                    key={`right-${index}`}
                    className='relative h-[400px] overflow-hidden'
                    style={{ marginBottom: '8px' }}
                  >
                    <FadeInImage
                      src={image.src}
                      alt={image.alt}
                      className='h-full w-full object-cover'
                    />
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='mx-auto mt-12 max-w-4xl'>
        <div className='flex flex-col'>
          <div className='grid gap-8 md:gap-12 lg:grid-cols-2'>
            <div className='order-1 flex flex-col justify-center md:order-none'>
              <h2 className='mb-4 font-serif text-3xl'>{t('title2')}</h2>
              <p className='mb-4 leading-relaxed text-muted-foreground'>
                {t('content2')}
              </p>
              <p className='mb-4 leading-relaxed text-muted-foreground'>
                {t('content3')}
              </p>
              <p className='leading-relaxed text-muted-foreground'>
                {t('content4')}
              </p>
            </div>
            <div className='order-2 md:order-none'>
              <FadeInImage
                src='/services/wedding-photography/jeremydan-wedding-photography-001-optimized.webp'
                alt={t('alt1')}
                className='h-full w-full object-cover'
              />
            </div>
          </div>

          <div className='py-8'>
            <h2 className='mb-4 font-serif text-3xl'>{t('title3')}</h2>
            <p className='mb-4 leading-relaxed text-muted-foreground'>
              {t('content5')}
            </p>
            <ul className='mb-8 list-disc space-y-2 text-muted-foreground'>
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
              src='/services/wedding-photography/jeremydan-wedding-photography-002-optimized.webp'
              alt={t('alt2')}
              className='mb-8 h-full w-full object-cover'
            />
            <p className='leading-relaxed text-muted-foreground'>
              {t('content6')}
            </p>
          </div>
          <div className='mb-8'>
            <h2 className='mb-4 font-serif text-3xl'>{t('title4')}</h2>
            <h4 className='mb-4 font-semibold'>{t('subtitle1')}</h4>
            <p className='mb-4 leading-relaxed text-muted-foreground'>
              {t('content7')}
              <Link
                className='text-primary-foreground underline'
                target='_blank'
                href='/contact'
              >
                {t('link1')}
              </Link>
              {t('content7-b')}
              <Link
                className='text-primary-foreground underline'
                href='mailto:bonjour@jeremydan.fr'
              >
                bonjour@jeremydan.fr
              </Link>
              {t('content7-c')}
            </p>

            <h4 className='mb-4 font-semibold'>{t('subtitle2')}</h4>
            <p className='mb-4 leading-relaxed text-muted-foreground'>
              {t('content8')}
            </p>
            <h4 className='mb-4 font-semibold'>{t('subtitle3')}</h4>
            <p className='mb-4 leading-relaxed text-muted-foreground'>
              {t('content9')}
            </p>
            <h4 className='mb-4 font-semibold'>{t('subtitle4')}</h4>
            <p className='mb-4 leading-relaxed text-muted-foreground'>
              {t('content10')}
            </p>
            <h4 className='mb-4 font-semibold'>{t('subtitle5')}</h4>
            <p className='mb-4 leading-relaxed text-muted-foreground'>
              {t('content11')}
            </p>
          </div>
          <div className='mb-8'>
            <h2 className='mb-4 font-serif text-3xl'>{t('title5')}</h2>
            <p className='mb-4 leading-relaxed text-muted-foreground'>
              {t('content12')}
              <Link
                className='text-primary-foreground underline'
                target='_blank'
                href='/contact'
              >
                {t('link2')}
              </Link>
              {t('content13')}
            </p>
            <div className='my-8 grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='relative h-[500px] overflow-hidden'>
                <FadeInImage
                  src='/services/wedding-photography/jeremydan-wedding-photography-003-optimized.webp'
                  alt={t('alt3')}
                  className='absolute inset-0 h-full w-full object-cover'
                />
              </div>
              <div className='relative h-[500px] overflow-hidden'>
                <FadeInImage
                  src='/services/wedding-photography/jeremydan-wedding-photography-004-optimized.webp'
                  alt={t('alt4')}
                  className='absolute inset-0 h-full w-full object-cover'
                />
              </div>
            </div>
            <h3 className='mb-4 font-semibold'>{t('subtitle6')}</h3>
            <ul className='mb-8 list-disc text-muted-foreground'>
              <li>{t('bullet4')}</li>
              <li>{t('bullet5')}</li>
              <li>{t('bullet6')}</li>
              <li>{t('bullet7')}</li>
              <li>{t('bullet8')}</li>
              <li>{t('bullet9')}</li>
            </ul>
            <div className='relative h-[500px] overflow-hidden'>
              <FadeInImage
                src='/services/wedding-photography/jeremydan-wedding-photography-005-optimized.webp'
                alt={t('alt5')}
                className='absolute inset-0 h-full w-full object-cover pb-8'
              />
            </div>
            <h3 className='mb-4 font-semibold'>{t('subtitle7')}</h3>
            <ul className='mb-8 list-disc text-muted-foreground'>
              <li>{t('bullet10')}</li>
              <li>{t('bullet11')}</li>
              <li>{t('bullet12')}</li>
              <li>{t('bullet13')}</li>
              <li>{t('bullet14')}</li>
              <li>{t('bullet15')}</li>
            </ul>
            <div className='relative h-[500px] overflow-hidden'>
              <FadeInImage
                src='/services/wedding-photography/jeremydan-wedding-photography-006-optimized.webp'
                alt={t('alt6')}
                className='absolute inset-0 h-full w-full object-cover pb-8'
              />
            </div>
            <h3 className='mb-4 font-semibold'>{t('subtitle8')}</h3>
            <ul className='mb-8 list-disc text-muted-foreground'>
              <li>{t('bullet16')}</li>
              <li>{t('bullet17')}</li>
              <li>{t('bullet18')}</li>
              <li>{t('bullet19')}</li>
              <li>{t('bullet20')}</li>
              <li>{t('bullet21')}</li>
            </ul>
            <div className='relative h-[500px] overflow-hidden'>
              <FadeInImage
                src='/services/wedding-photography/jeremydan-wedding-photography-007-optimized.webp'
                alt={t('alt7')}
                className='absolute inset-0 h-full w-full object-cover'
              />
            </div>
          </div>
          <div className='mb-8'>
            <h2 className='mb-4 font-serif text-3xl'>{t('title6')}</h2>
            <h4 className='mb-4 font-semibold'>{t('subtitle9')}</h4>
            <p className='mb-4 leading-relaxed text-muted-foreground'>
              {t('content14')}
            </p>
            <h4 className='mb-4 font-semibold'>{t('subtitle10')}</h4>
            <p className='mb-4 leading-relaxed text-muted-foreground'>
              {t('content15')}
            </p>
            <h4 className='mb-4 font-semibold'>{t('subtitle11')}</h4>
            <p className='mb-4 leading-relaxed text-muted-foreground'>
              {t('content16')}
            </p>
            <h4 className='mb-4 font-semibold'>{t('subtitle12')}</h4>
            <p className='mb-4 leading-relaxed text-muted-foreground'>
              {t('content17')}
            </p>
            <h4 className='mb-4 font-semibold'>{t('subtitle13')}</h4>
            <p className='mb-4 leading-relaxed text-muted-foreground'>
              {t('content18')}
            </p>
            <FadeInImage
              src='/services/wedding-photography/jeremydan-wedding-photography-008-optimized.webp'
              alt={t('alt8')}
              className='h-full w-full object-cover'
            />
          </div>
        </div>
      </div>
      <div className='mx-auto max-w-4xl'>
        <h2 className='mb-4 text-center font-serif text-3xl'>{t('title7')}</h2>
        <FAQ categories={['wedding']} />
      </div>
    </div>
  );
}
