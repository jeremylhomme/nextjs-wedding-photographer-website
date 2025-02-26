import { Metadata } from 'next';

// Define locale-based metadata for the About page
const aboutMetadata = {
  fr: {
    title: 'Mon Histoire | Jeremy Dan',
    description: 'Découvrez mon parcours en tant que photographe de mariage à Sceaux dans les Hauts-de-Seine. Disponible région parisienne, France et international.',
    keywords: [
      'photographe histoire',
      'parcours photographe',
      'photographe mariage sceaux',
      'photographe professionnel',
      'jeremy dan photographe'
    ]
  },
  en: {
    title: 'My Story | Jeremy Dan',
    description: 'Discover my journey as a wedding photographer in Sceaux, Hauts-de-Seine. Available in Paris region, France and internationally.',
    keywords: [
      'photographer story',
      'photographer journey',
      'wedding photographer sceaux',
      'professional photographer',
      'jeremy dan photographer'
    ]
  }
};

// Generate metadata based on locale parameter
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'fr' | 'en';
  
  return {
    title: aboutMetadata[locale].title,
    description: aboutMetadata[locale].description,
    keywords: aboutMetadata[locale].keywords,
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        fr: '/fr/about',
        en: '/en/about'
      }
    },
    openGraph: {
      title: aboutMetadata[locale].title,
      description: aboutMetadata[locale].description,
      url: `/${locale}/about`,
      type: 'website'
    }
  };
}

export default function AboutLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
