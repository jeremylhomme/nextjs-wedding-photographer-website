import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/src/navigation';
import { getLocalizedService } from '@/src/config/services';
import { locations, getLocalizedLocation } from '@/src/config/locations';
import { getLocalizedCategory } from '@/src/config/categories';
import React from 'react';

interface SitemapLink {
  name: string;
  href: string;
}

interface SitemapCategory {
  title: string;
  links: SitemapLink[];
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'sitemap-page' });

  return {
    title: t('title'),
    description: t('description')
  };
}

export default function Sitemap({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const f = useTranslations('footer');
  const t = useTranslations('sitemap-page');

  const sitemapCategories: SitemapCategory[] = [
    {
      title: f('columns.main.title'),
      links: [
        { name: f('columns.main.contact'), href: '/contact' },
        { name: f('columns.main.portfolio'), href: '/portfolio' },
        { name: f('columns.main.story'), href: '/about' },
        { name: f('columns.main.blog'), href: '/blog' }
      ]
    },
    {
      title: f('columns.legal.title'),
      links: [
        { name: f('columns.legal.sitemap'), href: '/sitemap' },
        { name: f('columns.legal.legal'), href: '/legal' },
        { name: f('columns.legal.terms'), href: '/legal/terms' },
        { name: f('columns.legal.privacy'), href: '/legal/privacy' }
      ]
    },
    {
      title: f('columns.services.title'),
      links: [
        { 
          name: f('columns.services.wedding-photographer'), 
          href: `/${getLocalizedService('photography', locale)}/${getLocalizedCategory('wedding', locale)}` 
        },
        {
          name: f('columns.services.corporate-photographer'),
          href: `/${getLocalizedService('photography', locale)}/${getLocalizedCategory('corporate', locale)}`
        }
      ]
    },
    {
      title: f('columns.locations.title'),
      links: locations.map(location => ({
        name: f(`columns.locations.${location}-photography`),
        href: `/${getLocalizedService('photography', locale)}/${getLocalizedLocation(location, locale)}`
      }))
    }
  ];

  return (
    <div className='container mx-auto flex h-[50vh] max-w-4xl items-center px-4 py-16'>
      <div className='w-full'>
        <h1 className='mb-8 text-left font-serif text-4xl'>{t('title')}</h1>

        <div className='grid grid-cols-2 gap-12 lg:grid-cols-4'>
          {sitemapCategories.map(category => (
            <div key={category.title} className='space-y-4'>
              <h2 className='font-medium'>{category.title}</h2>
              <ul className='space-y-2'>
                {category.links.map(link => (
                  <li key={link.href}>
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
      </div>
    </div>
  );
}
