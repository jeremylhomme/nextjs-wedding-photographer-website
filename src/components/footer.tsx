'use client';
import React from 'react';
import { Icon } from '@/src/components/ui/icon';
import { Link } from '@/src/navigation';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { LanguageSwitcher } from './language-switcher';
import { getLocalizedService } from '@/src/config/services';
import { locations, getLocalizedLocation } from '@/src/config/locations';
import { getLocalizedCategory } from '@/src/config/categories';

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
      },
      {
        name: 'TikTok',
        href: 'https://www.tiktok.com/@jeremydanphoto',
        icon: 'tiktok'
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

        <div className='mb-10 grid grid-cols-2 gap-8 md:grid-cols-4'>
          {/* Main Pages Section */}
          <div>
            <h3 className='mb-4 font-bold'>{t('columns.main.title')}</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='/contact'
                  className='text-muted-foreground transition-colors hover:text-primary-foreground'
                >
                  {t('columns.main.contact')}
                </Link>
              </li>
              <li>
                <Link
                  href='/portfolio'
                  className='text-muted-foreground transition-colors hover:text-primary-foreground'
                >
                  {t('columns.main.portfolio')}
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='text-muted-foreground transition-colors hover:text-primary-foreground'
                >
                  {t('columns.main.story')}
                </Link>
              </li>
              <li>
                <Link
                  href='/blog'
                  className='text-muted-foreground transition-colors hover:text-primary-foreground'
                >
                  {t('columns.main.blog')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className='mb-4 font-bold'>{t('columns.legal.title')}</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='/sitemap'
                  className='text-muted-foreground transition-colors hover:text-primary-foreground'
                >
                  {t('columns.legal.sitemap')}
                </Link>
              </li>
              <li>
                <Link
                  href='/legal'
                  className='text-muted-foreground transition-colors hover:text-primary-foreground'
                >
                  {t('columns.legal.legal')}
                </Link>
              </li>
              <li>
                <Link
                  href='/legal/terms'
                  className='text-muted-foreground transition-colors hover:text-primary-foreground'
                >
                  CGV
                </Link>
              </li>
              <li>
                <Link
                  href='/legal/privacy'
                  className='text-muted-foreground transition-colors hover:text-primary-foreground'
                >
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h3 className='mb-4 font-bold'>{t('columns.services.title')}</h3>
            <ul className='space-y-2 text-sm'>
              {/* Wedding Services */}
              <li>
                <Link
                  href={`/${getLocalizedService('photography', locale)}/${getLocalizedCategory('wedding', locale)}`}
                  className='text-muted-foreground transition-colors hover:text-primary-foreground'
                >
                  {t('columns.services.wedding-photographer')}
                </Link>
              </li>

              {/* Corporate Services */}
              <li>
                <Link
                  href={`/${getLocalizedService('photography', locale)}/${getLocalizedCategory('corporate', locale)}`}
                  className='text-muted-foreground transition-colors hover:text-primary-foreground'
                >
                  {t('columns.services.corporate-photographer')}
                </Link>
              </li>

              {/*  <li>
                <Link
                  href={`/${getLocalizedService('photography', locale)}/${getLocalizedCategory('event', locale)}`}
                  className='text-muted-foreground transition-colors hover:text-primary-foreground'
                >
                  {t('columns.services.event-photographer')}
                </Link>
              </li>

              
              <li>
                <Link
                  href={`/${getLocalizedService('photography', locale)}/${getLocalizedCategory('lifestyle', locale)}`}
                  className='text-muted-foreground transition-colors hover:text-primary-foreground'
                >
                  {t('columns.services.lifestyle-photographer')}
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Locations Section */}
          <div>
            <h3 className='mb-4 font-bold'>{t('columns.locations.title')}</h3>
            <ul className='space-y-2 text-sm'>
              {locations.map(location => (
                <React.Fragment key={location}>
                  <li>
                    <Link
                      href={`/${getLocalizedService('photography', locale)}/${getLocalizedLocation(location, locale)}`}
                      className='text-muted-foreground transition-colors hover:text-primary-foreground'
                    >
                      {t(`columns.locations.${location}-photography`)}
                    </Link>
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>

        <div className='mt-8 flex space-x-6'>
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
