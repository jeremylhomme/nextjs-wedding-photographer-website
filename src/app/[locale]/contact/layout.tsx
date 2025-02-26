import { Metadata } from 'next';

// Define locale-based metadata for the Contact page
const contactMetadata = {
  fr: {
    title: 'Contact | Jeremy Dan',
    description: 'Contactez-moi pour vos projets de photographie à Sceaux et en région parisienne. Mariage, corporate, événementiel et lifestyle.',
    keywords: [
      'contact photographe',
      'photographe sceaux contact',
      'réserver photographe mariage',
      'devis photographe',
      'contacter jeremy dan'
    ]
  },
  en: {
    title: 'Contact | Jeremy Dan',
    description: 'Contact me for your photography projects in Sceaux and Paris region. Wedding, corporate, event and lifestyle photography.',
    keywords: [
      'photographer contact',
      'sceaux photographer contact',
      'book wedding photographer',
      'photography quote',
      'contact jeremy dan'
    ]
  }
};

// Generate metadata based on locale parameter
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as 'fr' | 'en';
  
  return {
    title: contactMetadata[locale].title,
    description: contactMetadata[locale].description,
    keywords: contactMetadata[locale].keywords,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        fr: '/fr/contact',
        en: '/en/contact'
      }
    },
    openGraph: {
      title: contactMetadata[locale].title,
      description: contactMetadata[locale].description,
      url: `/${locale}/contact`,
      type: 'website'
    }
  };
}

export default function ContactLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
