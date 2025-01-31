import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

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

export default function Sitemap() {
  const t = useTranslations('sitemap-page');
  const f = useTranslations('footer');

  const sitemapCategories: SitemapCategory[] = [
    {
      title: t('categories.main'),
      links: [
        { name: f('columns.information.contact'), href: '/contact' },
        { name: f('columns.information.portfolio'), href: '/portfolio' },
        { name: f('columns.information.story'), href: '/about' },
        { name: f('columns.information.blog'), href: '/blog' }
      ]
    },
    {
      title: t('categories.services'),
      links: [
        { name: f('columns.services.wedding'), href: '/mariage' },
        { name: f('columns.services.event'), href: '/evenement' },
        { name: f('columns.services.business'), href: '/entreprise' }
      ]
    },
    {
      title: t('categories.locations'),
      links: [
        { name: f('columns.locations.sceaux'), href: '/photographe-sceaux' },
        {
          name: f('columns.locations.hauts-de-seine'),
          href: '/photographe-hauts-de-seine'
        },
        { name: f('columns.locations.paris'), href: '/photographe-paris' },
        {
          name: f('columns.locations.ile-de-france'),
          href: '/photographe-ile-de-france'
        }
      ]
    },
    {
      title: t('categories.legal'),
      links: [
        { name: f('columns.legal.sitemap'), href: '/sitemap' },
        { name: f('columns.legal.legal'), href: '/mentions-legales' }
      ]
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
                    <a
                      href={link.href}
                      className='text-sm text-muted-foreground transition-colors hover:text-primary-foreground'
                    >
                      {link.name}
                    </a>
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
