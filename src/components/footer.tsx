'use client';
import React from 'react';
import { Icon } from '@/src/components/ui/icon';
import { Link } from '@/src/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface NavigationItem {
  name: string;
  href: string;
}

interface SocialItem extends NavigationItem {
  icon: string;
}

interface Labels extends NavigationItem {
  src: string;
}

export default function Footer() {
  const t = useTranslations('footer');

  const navigation: {
    main: NavigationItem[];
    social: SocialItem[];
    labels: Labels[];
  } = {
    main: [
      { name: 'Portfolio', href: '/portfolio' },
      { name: `${t('links.name2')}`, href: '/contact' },
      { name: `${t('links.name3')}`, href: '/blog' },
      { name: `${t('links.name4')}`, href: '/about' }
    ],
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
    ],
    labels: [
      {
        name: 'Fearless Photography',
        href: 'http://www.fearlessphotographers.com/photographer/7174/jeremy-dan',
        src: '/fearless-logo-white-transparent.svg'
      }
    ]
  };

  return (
    <footer className='bottom-0 w-full border-t'>
      <div className='mx-auto max-w-7xl px-6 py-20 sm:py-16 lg:px-8'>
        <h1 className='mb-4 text-lg font-semibold sm:text-center'>
          JEREMY DAN
        </h1>
        <p className='mb-6 text-sm text-muted-foreground sm:text-center'>
          {t('description')}
        </p>
        <nav
          className='mb-4 columns-2 sm:flex sm:justify-center sm:space-x-12'
          aria-label='Footer'
        >
          {navigation.main.map(item => (
            <div key={item.name} className='pb-6'>
              <Link
                href={item.href}
                className='text-sm leading-4 text-muted-foreground'
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className='mt-4 flex space-x-6 sm:justify-center'>
          {navigation.social.map(item => (
            <a key={item.name} href={item.href} target='_blank' className=''>
              <span className='sr-only'>{item.name}</span>
              <Icon name={item.icon} size='sm' aria-hidden='true' />
            </a>
          ))}
        </div>
        <div className='mt-4 flex space-x-6 sm:justify-center'>
          {navigation.labels.map(item => (
            <a
              key={item.name}
              href={item.href}
              target='_blank'
              className='mt-4'
            >
              <span className='sr-only'>{item.name}</span>
              <Image src={item.src} alt={item.name} width={100} height={100} />
            </a>
          ))}
        </div>
        <p className='mt-8 text-xs leading-5 text-border sm:text-center'>
          &copy; {t('copyright1')}{' '}
          <a
            href='https://jeremylhomme.fr'
            target='_blank'
            className='underline'
          >
            {t('copyright2')}
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
