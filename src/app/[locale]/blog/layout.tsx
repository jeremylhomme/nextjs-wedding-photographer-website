import { Metadata } from 'next';

// Define locale-based metadata for the Blog page
const blogMetadata = {
  fr: {
    title: 'Blog | Jeremy Dan',
    description: 'Découvrez mon blog de photographie. Conseils, astuces et récits de séances photo à Sceaux et en région parisienne.',
    keywords: [
      'blog photographe',
      'conseils photo mariage',
      'astuces photographie',
      'blog jeremy dan',
      'photographe blog'
    ]
  },
  en: {
    title: 'Blog | Jeremy Dan',
    description: 'Discover my photography blog. Tips, tricks and stories from photo sessions in Sceaux and Paris region.',
    keywords: [
      'photographer blog',
      'wedding photo tips',
      'photography advice',
      'jeremy dan blog',
      'photography blog'
    ]
  }
};

// Generate metadata based on locale parameter
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'fr' | 'en';
  
  return {
    title: blogMetadata[locale].title,
    description: blogMetadata[locale].description,
    keywords: blogMetadata[locale].keywords,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        fr: '/fr/blog',
        en: '/en/blog'
      }
    },
    openGraph: {
      title: blogMetadata[locale].title,
      description: blogMetadata[locale].description,
      url: `/${locale}/blog`,
      type: 'website'
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
