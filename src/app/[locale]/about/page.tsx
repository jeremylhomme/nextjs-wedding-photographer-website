'use client';
import { Icon } from '@/src/components/ui/icon';
import ClientImageWrapper from '@/src/components/client-image-wrapper';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Button } from '@/src/components/ui/button';
import { Link } from '@/src/i18n/routing';

interface NavigationItem {
  name: string;
  href: string;
}

interface SocialItem extends NavigationItem {
  name: string;
  icon: string;
}

const navigation: {
  social: SocialItem[];
} = {
  social: [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/jeremydanphoto/',
      icon: 'instagram'
    },
    {
      name: 'Pinterest',
      href: 'https://www.pinterest.fr/jeremydanphoto/',
      icon: 'pinterest'
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@jeremydanphoto',
      icon: 'tiktok'
    }
  ]
};

const AboutPage: React.FC = () => {
  const t = useTranslations('about-page');

  const [loadedImages, setLoadedImages] = React.useState<{
    [key: string]: boolean;
  }>({});

  return (
    <div className='flex flex-col items-center justify-center px-4 py-16 md:px-8'>
      <div className='grid max-w-4xl grid-cols-1 items-center gap-8 border-b pb-16 md:grid-cols-2'>
        {/* Left Column */}
        <div>
          <h1 className='mb-4 text-center font-serif text-4xl leading-tight md:text-left'>
            {t('hero-title')}
          </h1>
        </div>

        {/* Right Column */}
        <div className='flex flex-col'>
          <div className='relative aspect-square w-full overflow-hidden rounded-lg'>
            <ClientImageWrapper
              src='/about-page/about-jeremydan-wedding-photographer-optimized-square.webp'
              alt='Jeremy Fiori - Wedding Photographer'
              className='absolute inset-0 h-full w-full object-cover'
            />
          </div>
          <div className='mt-6 flex w-fit flex-col space-y-2 text-center md:text-left'>
            <div className='flex space-x-6 sm:justify-center'>
              {navigation.social.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  target='_blank'
                  className=''
                >
                  <span className='sr-only'>{item.name}</span>
                  <Icon name={item.icon} size='sm' aria-hidden='true' />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='mx-auto mt-12 max-w-4xl'>
        <div className='flex flex-col'>
          <div className='mb-8'>
            <h2 className='mb-4 font-serif text-3xl'>{t('title1')}</h2>
            <p className='mb-4 leading-relaxed text-muted-foreground'>
              {t('description1')}
            </p>
            <p className='leading-relaxed text-muted-foreground'>
              {t('description2')}
              <a
                href='https://jeremylhomme.fr/'
                target='_blank'
                className='font-medium underline'
              >
                {t('description2-link')}
              </a>
              {t('description2-cont')}
            </p>
          </div>

          <div className='mb-8'>
            <h2 className='mb-4 font-serif text-3xl'>{t('title2')}</h2>
            <p className='mb-4 leading-relaxed text-muted-foreground'>
              {t('description3')}
            </p>
            <p className='leading-relaxed text-muted-foreground'>
              {t('description4')}
            </p>
          </div>
          <div className='mb-4'>
            <h2 className='mb-4 font-serif text-2xl text-secondary'>
              {t('title3')}
            </h2>
            <div className='mb-4 leading-relaxed'>
              <h3>{t('bullet1-title')}</h3>
              <p className='text-muted-foreground'>{t('bullet1')}</p>
            </div>
            <div className='mb-4 leading-relaxed'>
              <h3>{t('bullet2-title')}</h3>
              <p className='text-muted-foreground'>{t('bullet2')}</p>
            </div>
            <div className='mb-4 leading-relaxed'>
              <h3>{t('bullet3-title')}</h3>
              <p className='text-muted-foreground'>{t('bullet3')}</p>
            </div>
          </div>
          <div className='mb-8'>
            <h2 className='mb-4 font-serif text-2xl text-secondary'>
              {t('title4')}
            </h2>
            <div className='mb-4 leading-relaxed'>
              <div className='mb-4 leading-relaxed'>
                <h3>{t('bullet4-title')}</h3>
                <p className='text-muted-foreground'>{t('bullet4')}</p>
              </div>
              <div className='leading-relaxed'>
                <h3>{t('bullet5-title')}</h3>
                <p className='text-muted-foreground'>{t('bullet5')}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className='mb-4 font-serif text-3xl'>{t('title5')}</h2>
            <p className='mb-4 leading-relaxed text-muted-foreground'>
              {t('description5')}
            </p>
            <p className='leading-relaxed text-muted-foreground'>
              {t('description6')}
            </p>
            <Button
              variant='default'
              size='default'
              className='mt-8 w-fit md:mx-0'
            >
              <Link href='/contact'>{t('button-label')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
