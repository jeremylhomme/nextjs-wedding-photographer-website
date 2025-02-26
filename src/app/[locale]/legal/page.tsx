import { useTranslations } from 'next-intl';
import { Link } from '@/src/navigation';

export default function LegalPage() {
  const t = useTranslations('legal-pages');

  const legalPages = [
    {
      title: t('legal-notice.title'),
      href: '/legal/notice',
      description: t('legal-notice.sections.editor.content.0')
    },
    {
      title: t('terms.title'),
      href: '/legal/terms',
      description: t('terms.sections.services.content.0')
    },
    {
      title: t('privacy-policy.title'),
      href: '/legal/privacy',
      description: t('privacy-policy.sections.collected-data.content.0')
    },
    {
      title: t('terms-of-use.title'),
      href: '/legal/terms-of-use',
      description: t('terms-of-use.sections.website-usage.content.0')
    }
  ];

  return (
    <main className='container mx-auto px-4 py-16'>
      <h1 className='mb-12 text-center text-4xl font-bold'>
        {t('legal-notice.title')}
      </h1>
      <p className='mb-8 text-center text-muted-foreground'>
        {t('last-update')}
      </p>
      <div className='mx-auto grid max-w-4xl gap-8 md:grid-cols-2'>
        {legalPages.map(page => (
          <Link
            key={page.href}
            href={page.href}
            className='block rounded-lg border p-6 transition-shadow hover:shadow-lg'
          >
            <h2 className='mb-2 text-xl font-semibold'>{page.title}</h2>
            <p className='text-muted-foreground'>{page.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
