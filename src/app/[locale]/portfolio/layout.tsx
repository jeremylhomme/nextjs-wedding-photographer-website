import { Metadata } from 'next';

// Define locale-based metadata for the Portfolio page
const portfolioMetadata = {
  fr: {
    title: 'Portfolio | Jeremy Dan',
    description: 'Découvrez mon portfolio de photographie. Mariage, corporate, événementiel et lifestyle à Sceaux et en région parisienne.',
    keywords: [
      'portfolio photographe',
      'photos mariage',
      'photos corporate',
      'photos événementiel',
      'portfolio jeremy dan'
    ]
  },
  en: {
    title: 'Portfolio | Jeremy Dan',
    description: 'Discover my photography portfolio. Wedding, corporate, event and lifestyle photography in Sceaux and Paris region.',
    keywords: [
      'photographer portfolio',
      'wedding photos',
      'corporate photos',
      'event photos',
      'jeremy dan portfolio'
    ]
  }
};

// Generate metadata based on locale parameter
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'fr' | 'en';
  
  return {
    title: portfolioMetadata[locale].title,
    description: portfolioMetadata[locale].description,
    keywords: portfolioMetadata[locale].keywords,
    alternates: {
      canonical: `/${locale}/portfolio`,
      languages: {
        fr: '/fr/portfolio',
        en: '/en/portfolio'
      }
    },
    openGraph: {
      title: portfolioMetadata[locale].title,
      description: portfolioMetadata[locale].description,
      url: `/${locale}/portfolio`,
      type: 'website'
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
