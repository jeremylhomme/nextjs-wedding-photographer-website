import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateCanonicalUrl } from '@/src/lib/url';

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations('portfolio-page');
  const url = generateCanonicalUrl('portfolio', params.locale);

  // Get the raw value for keywords array
  const rawMessages = await t.raw('metadata');

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    keywords: rawMessages.keywords,
    openGraph: {
      title: t('metadata.openGraph.title'),
      description: t('metadata.openGraph.description'),
      type: 'website',
      url: url,
      siteName: t('metadata.openGraph.siteName'),
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: t('metadata.openGraph.alt')
        }
      ]
    },
    alternates: {
      canonical: url,
      languages: {
        fr: generateCanonicalUrl('portfolio', 'fr'),
        en: generateCanonicalUrl('portfolio', 'en')
      }
    }
  };
}

export default function PortfolioLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
