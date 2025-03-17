import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateCanonicalUrl } from '@/src/lib/url';

// Generate metadata based on locale parameter
export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations('blog-page');
  const url = generateCanonicalUrl('blog', params.locale);

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    keywords: t.raw('metadata.keywords'),
    alternates: {
      canonical: url,
      languages: {
        fr: generateCanonicalUrl('blog', 'fr'),
        en: generateCanonicalUrl('blog', 'en')
      }
    },
    openGraph: {
      title: t('metadata.openGraph.title'),
      description: t('metadata.openGraph.description'),
      url: url,
      type: 'website',
      siteName: t('metadata.openGraph.siteName'),
      images: [
        {
          url: '/blog-page/blog-jeremydan-wedding-photography-001-optimized.webp',
          width: 1200,
          height: 630,
          alt: t('metadata.openGraph.alt')
        }
      ]
    }
  };
}

export default function BlogLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
