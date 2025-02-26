import { useTranslations } from 'next-intl';
import LegalSection from '@/src/components/ui/legal-section';

export default function TermsOfUsePage() {
  const t = useTranslations('legal-pages.terms-of-use');
  const sections = ['website-usage', 'content', 'liability'];

  return (
    <main className='container mx-auto px-4 py-16'>
      <h1 className='mb-12 text-center text-4xl font-bold'>{t('title')}</h1>
      <div className='mx-auto max-w-3xl'>
        {sections.map(section => (
          <LegalSection
            key={section}
            title={t(`sections.${section}.title`)}
            content={t.raw(`sections.${section}.content`) as string[]}
          />
        ))}
      </div>
    </main>
  );
}
