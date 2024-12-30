'use client';
import { Icon } from '@/src/components/ui/icon';
import FadeInImage from '@/src/components/fade-in-image';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

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
          <h1 className='mb-4 text-center font-serif text-4xl leading-tight md:text-left md:text-5xl'>
            {t('hero-title')}
          </h1>
        </div>

        {/* Right Column */}
        <div className='flex h-72 flex-col items-center'>
          <FadeInImage
            src='/about-page/about-jeremydan-wedding-photographer-lscape-optimized.webp'
            alt={`${t('alt')}`}
            onImageLoad={path =>
              setLoadedImages(prev => ({ ...prev, [path]: true }))
            }
            className='rounded-lg object-cover shadow-md'
          />
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
      <div className='mt-16 max-w-4xl'>
        <div className='flex flex-col'>
          <div className='mb-16'>
            <h2 className='mb-4 font-serif text-4xl text-secondary'>
              {t('about-section.title1')}
            </h2>
            <p className='mb-4 max-w-xl leading-relaxed text-muted-foreground'>
              {t('about-section.description1')}
            </p>
            <p className='max-w-xl leading-relaxed text-muted-foreground'>
              {t('about-section.description2')}
            </p>
          </div>

          <div>
            <h2 className='mb-4 font-serif text-4xl text-secondary'>
              {t('about-section.title2')}
            </h2>
            <p className='mb-4 max-w-xl leading-relaxed text-muted-foreground'>
              {t('about-section.description3')}
            </p>
            <p className='max-w-xl leading-relaxed text-muted-foreground'>
              {t('about-section.description4')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
