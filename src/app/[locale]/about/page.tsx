'use client';
import { Icon } from '@/src/components/ui/icon';
import ClientImageWrapper from '@/src/components/client-image-wrapper';
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
      <div className='mt-16 max-w-4xl'>
        <div className='flex flex-col'>
          <div className='mb-8'>
            <h2 className='mb-4 font-serif text-4xl text-secondary'>
              {t('about-section.title1')}
            </h2>
            <p className='mb-4 max-w-xl leading-relaxed text-muted-foreground'>
              {t('about-section.description1')}
            </p>
            <p className='max-w-xl leading-relaxed text-muted-foreground'>
              {t('about-section.description2')}
              <a
                href='https://jeremylhomme.fr/'
                target='_blank'
                className='font-medium underline'
              >
                {t('about-section.description2-link')}
              </a>
              {t('about-section.description2-cont')}
            </p>
          </div>

          <div className='mb-8'>
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
          <div className='mb-4'>
            <h2 className='mb-4 font-serif text-2xl text-secondary'>
              {t('about-section.title3')}
            </h2>
            <div className='mb-4 max-w-xl leading-relaxed'>
              <h3>{t('about-section.bullet1-title')}</h3>
              <p className='text-muted-foreground'>
                {t('about-section.bullet1')}
              </p>
            </div>
            <div className='mb-4 max-w-xl leading-relaxed'>
              <h3>{t('about-section.bullet2-title')}</h3>
              <p className='text-muted-foreground'>
                {t('about-section.bullet2')}
              </p>
            </div>
            <div className='mb-4 max-w-xl leading-relaxed'>
              <h3>{t('about-section.bullet3-title')}</h3>
              <p className='text-muted-foreground'>
                {t('about-section.bullet3')}
              </p>
            </div>
          </div>
          <div className='mb-8'>
            <h2 className='mb-4 font-serif text-2xl text-secondary'>
              {t('about-section.title4')}
            </h2>
            <div className='mb-4 max-w-xl leading-relaxed'>
              <ul>
                <li className='mb-4 text-muted-foreground'>
                  {t('about-section.bullet4')}
                </li>
                <li className='mb-4 text-muted-foreground'>
                  {t('about-section.bullet5')}
                </li>
                <li className='text-muted-foreground'>
                  {t('about-section.bullet6')}
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h2 className='mb-4 font-serif text-4xl text-secondary'>
              {t('about-section.title5')}
            </h2>
            <p className='mb-4 max-w-xl leading-relaxed text-muted-foreground'>
              {t('about-section.description5')}
            </p>
            <p className='max-w-xl leading-relaxed text-muted-foreground'>
              {t('about-section.description6')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
