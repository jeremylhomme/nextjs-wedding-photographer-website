'use client';
import React from 'react';
import { Icon } from '@/src/components/ui/icon';
import { Link } from '@/src/navigation';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { LanguageSwitcher } from './language-switcher';

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

interface FooterColumn {
  title: string;
  links: NavigationItem[];
}

export default function Footer() {
  const t = useTranslations('footer');
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] ?? 'fr';
  const footerColumns: FooterColumn[] = [
    {
      title: t('columns.information.title'),
      links: [
        { name: t('columns.information.contact'), href: '/contact' },
        { name: t('columns.information.portfolio'), href: '/portfolio' },
        { name: t('columns.information.story'), href: '/about' },
        { name: t('columns.information.blog'), href: '/blog' }
      ]
    }
  ];

  const navigation = {
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
        <h1 className='mb-4 text-left text-lg font-semibold'>JEREMY DAN</h1>
        <p className='mb-10 text-left text-sm text-muted-foreground'>
          {t('description')}
        </p>
        <LanguageSwitcher className='mb-10' pathname={pathname} />

        <div className='mb-10 grid grid-cols-1'>
          {footerColumns.map(column => (
            <div key={column.title}>
              <h2 className='mb-4 font-medium'>{column.title}</h2>
              <ul className='flex flex-row gap-4'>
                {column.links.map(link => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className='text-sm text-muted-foreground transition-colors hover:text-primary-foreground'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='flex space-x-6'>
          {navigation.social.map(item => (
            <a key={item.name} href={item.href} target='_blank' className=''>
              <span className='sr-only'>{item.name}</span>
              <Icon name={item.icon} size='sm' aria-hidden='true' />
            </a>
          ))}
        </div>

        <div className='mt-10 flex space-x-6'>
          {navigation.labels.map(item => (
            <a key={item.name} href={item.href} target='_blank' className=''>
              <span className='sr-only'>{item.name}</span>
              <Image src={item.src} alt={item.name} width={80} height={80} />
            </a>
          ))}
        </div>

        <p className='mt-10 text-left text-xs text-muted-foreground'>
          &copy; {new Date().getFullYear()} Jeremy Dan. {t('rights')}{' '}
          {t('dev1')}{' '}
          <a
            href='https://www.jeremylhomme.fr/'
            target='_blank'
            className='underline'
          >
            {t('dev2')}
          </a>
        </p>
      </div>
    </footer>
  );
}
