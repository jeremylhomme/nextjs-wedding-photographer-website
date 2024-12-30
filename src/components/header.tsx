'use client';

import React from 'react';
import { Link } from '@/src/navigation';
import { usePathname } from 'next/navigation';
import Modal from '@/src/components/modal';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './language-switcher';

const Header: React.FC = () => {
  const pathname = usePathname();
  const t = useTranslations('header');

  const desktopMenuLinks = [
    { text: t('home'), href: '/' },
    { text: t('portfolio'), href: '/portfolio' },
    { text: t('blog'), href: '/blog' },
    { text: t('contact'), href: '/contact' }
  ];

  const mobileMenuLinks = [
    { text: t('home'), href: '/' },
    { text: t('portfolio'), href: '/portfolio' },
    { text: t('about'), href: '/about' },
    { text: t('blog'), href: '/blog' },
    { text: t('contact'), href: '/contact' }
  ];

  const getLinkClassName = (href: string) => {
    return `font-semibold transition-colors hover:text-input ${
      pathname === href ? 'text-muted' : ''
    }`;
  };

  return (
    <header className='left-0 right-0 top-0 z-10 border-b bg-transparent py-4'>
      <div className='container mx-auto flex w-[90%] items-center justify-between px-4'>
        <div className='flex'>
          <Link href='/'>
            <h1 className='text-2xl font-semibold uppercase'>Jeremy Dan</h1>
          </Link>
        </div>
        <div className='flex items-center'>
          <nav className='hidden md:block'>
            <ul className='flex space-x-8 text-sm'>
              {desktopMenuLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={getLinkClassName(link.href)}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
              <LanguageSwitcher pathname={pathname} />
            </ul>
          </nav>
          <Modal
            triggerClassName='mr-4 md:ml-8'
            contentClassName='bg-background'
            links={mobileMenuLinks}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
