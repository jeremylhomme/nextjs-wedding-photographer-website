import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr';
const defaultLocale = 'fr';

export const defaultMetadata = {
  metadataBase: new URL(siteUrl),
  title: 'Jeremy Dan',
  description:
    'Photographe de Mariage basé à Sceaux dans les Hauts-de-Seine (92). Pour des photos intemporelles en région parisienne, France et international.',
  openGraph: {
    type: 'website',
    locale: defaultLocale,
    url: siteUrl,
    siteName: 'Jeremy Dan Photography',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jeremy Dan Photography'
      }
    ]
  },
  alternates: {
    canonical: '/',
    languages: {
      fr: `${siteUrl}/fr`,
      en: `${siteUrl}/en`
    }
  }
} satisfies Metadata;

import { ServiceType } from './services';
import { CategoryType } from './categories';
import { LocationType } from './locations';

// Specific metadata configurations for different page types
const pageMetadata = {
  wedding: {
    fr: {
      title: 'Jeremy Dan | Photographe de Mariage',
      description:
        'Photographe de Mariage basé à Sceaux dans les Hauts-de-Seine (92). Pour des photos intemporelles en région parisienne, France et international.',
      keywords: [
        'photographe mariage sceaux',
        'photographe mariage 92',
        'photographe mariage hauts-de-seine'
      ]
    },
    en: {
      title: 'Jeremy Dan | Wedding Photographer',
      description:
        'Wedding Photographer based in Sceaux, Hauts-de-Seine (92). For timeless photos in Paris region, France, and internationally.',
      keywords: [
        'wedding photographer sceaux',
        'wedding photographer 92',
        'wedding photographer hauts-de-seine'
      ]
    }
  },
  corporate: {
    fr: {
      title: "Jeremy Dan | Photographe d'entreprise",
      description:
        "Photographe d'entreprise et corporate basé à Sceaux dans les Hauts-de-Seine (92). Pour des photos intemporelles en région parisienne, France et international.",
      keywords: [
        'photographe entreprise sceaux',
        'photographe entreprise 92',
        'photographe entreprise hauts-de-seine'
      ]
    },
    en: {
      title: 'Jeremy Dan | Corporate Photographer',
      description:
        'Corporate Photographer based in Sceaux, Hauts-de-Seine (92). For timeless photos in Paris region, France, and internationally.',
      keywords: [
        'corporate photographer sceaux',
        'corporate photographer 92',
        'corporate photographer hauts-de-seine'
      ]
    }
  },
  sceaux: {
    fr: {
      title: 'Jeremy Dan | Photographe à Sceaux',
      description:
        'Photographe professionnel basé à Sceaux dans les Hauts-de-Seine (92). Pour des photos intemporelles en région parisienne, France et international.',
      keywords: [
        'photographe sceaux',
        'photographe 92',
        'photographe hauts-de-seine'
      ]
    },
    en: {
      title: 'Jeremy Dan | Photographer in Sceaux',
      description:
        'Professional Photographer based in Sceaux, Hauts-de-Seine (92). For timeless photos in Paris region, France, and internationally.',
      keywords: [
        'photographer sceaux',
        'photographer 92',
        'photographer hauts-de-seine'
      ]
    }
  }
};

export function generateServiceMetadata(
  service: ServiceType,
  category: CategoryType,
  locale: string,
  location?: LocationType
): Metadata {
  // If it's a specific service+category combination we have predefined metadata for
  if (category === 'wedding' && service === 'photography') {
    return {
      title: pageMetadata.wedding[locale as 'fr' | 'en'].title,
      description: pageMetadata.wedding[locale as 'fr' | 'en'].description,
      keywords: pageMetadata.wedding[locale as 'fr' | 'en'].keywords,
      openGraph: {
        title: pageMetadata.wedding[locale as 'fr' | 'en'].title,
        description: pageMetadata.wedding[locale as 'fr' | 'en'].description,
        locale,
        type: 'website'
      },
      alternates: {
        canonical: `/${locale}/service/${service}/${category}${location ? `/${location}` : ''}`
      }
    };
  } else if (category === 'corporate' && service === 'photography') {
    return {
      title: pageMetadata.corporate[locale as 'fr' | 'en'].title,
      description: pageMetadata.corporate[locale as 'fr' | 'en'].description,
      keywords: pageMetadata.corporate[locale as 'fr' | 'en'].keywords,
      openGraph: {
        title: pageMetadata.corporate[locale as 'fr' | 'en'].title,
        description: pageMetadata.corporate[locale as 'fr' | 'en'].description,
        locale,
        type: 'website'
      },
      alternates: {
        canonical: `/${locale}/service/${service}/${category}${location ? `/${location}` : ''}`
      }
    };
  }

  // Fallback to dynamic generation for other combinations
  const baseTitle =
    locale === 'fr'
      ? service === 'photography'
        ? 'Photographe'
        : 'Vidéaste'
      : service === 'photography'
        ? 'Photographer'
        : 'Videographer';

  const categoryTitle = {
    wedding: locale === 'fr' ? 'de Mariage' : 'Wedding',
    corporate: locale === 'fr' ? 'Corporate' : 'Corporate',
    event: locale === 'fr' ? 'Événementiel' : 'Event',
    lifestyle: locale === 'fr' ? 'Lifestyle' : 'Lifestyle',
    couple: locale === 'fr' ? 'du Couple' : 'Couple',
    family: locale === 'fr' ? 'de la Famille' : 'Family'
  }[category];

  // Handle location safely by using optional chaining and nullish coalescing
  const locationStr = location as string | undefined;
  const locationTitle = locationStr
    ? `à ${locationStr.charAt(0).toUpperCase() + locationStr.slice(1)}`
    : '';

  const titleContent = `${baseTitle} ${categoryTitle} ${locationTitle}`;
  const description =
    locale === 'fr'
      ? `Services de ${service === 'photography' ? 'photographie' : 'vidéographie'} ${categoryTitle.toLowerCase()} ${locationTitle}. Capturez vos moments spéciaux avec style et élégance.`
      : `${categoryTitle} ${service} services ${locationStr ? `in ${locationStr}` : ''}. Capture your special moments with style and elegance.`;

  const keywords = [
    `${baseTitle.toLowerCase()} ${categoryTitle.toLowerCase()} ${locationTitle}`,
    `${baseTitle.toLowerCase()} ${categoryTitle.toLowerCase()}`,
    `${baseTitle.toLowerCase()} ${locationTitle}`
  ];

  return {
    title: `Jeremy Dan | ${titleContent}`,
    description,
    keywords,
    openGraph: {
      title: `Jeremy Dan | ${titleContent}`,
      description,
      locale,
      type: 'website'
    },
    alternates: {
      canonical: `/${locale}/service/${service}/${category}${location ? `/${location}` : ''}`
    }
  };
}

export function generateLocationMetadata(
  location: LocationType,
  locale: string
): Metadata {
  // If it's a specific location we have predefined metadata for
  if (location === 'sceaux') {
    return {
      title: pageMetadata.sceaux[locale as 'fr' | 'en'].title,
      description: pageMetadata.sceaux[locale as 'fr' | 'en'].description,
      keywords: pageMetadata.sceaux[locale as 'fr' | 'en'].keywords,
      openGraph: {
        title: pageMetadata.sceaux[locale as 'fr' | 'en'].title,
        description: pageMetadata.sceaux[locale as 'fr' | 'en'].description,
        locale,
        type: 'website'
      },
      alternates: {
        canonical: `/${locale}/location/${location}`
      }
    };
  }

  // Fallback to dynamic generation for other locations
  // Explicitly cast location to string to avoid TypeScript errors
  const locationStr = location as string;
  const titleContent =
    locale === 'fr'
      ? `Photographe professionnel à ${locationStr.charAt(0).toUpperCase() + locationStr.slice(1)}`
      : `Professional Photographer in ${locationStr.charAt(0).toUpperCase() + locationStr.slice(1)}`;

  const description =
    locale === 'fr'
      ? `Services de photographie professionnelle à ${locationStr}. Mariage, corporate et événementiel par des photographes expérimentés.`
      : `Professional photography services in ${locationStr}. Wedding, corporate, and event photography by experienced photographers.`;

  const keywords = [
    `photographe ${locationStr}`,
    `photographe ${locationStr.charAt(0).toUpperCase() + locationStr.slice(1)}`,
    `photographe professionnel ${locationStr}`
  ];

  return {
    title: `Jeremy Dan | ${titleContent}`,
    description,
    keywords,
    openGraph: {
      title: `Jeremy Dan | ${titleContent}`,
      description,
      locale,
      type: 'website'
    },
    alternates: {
      canonical: `/${locale}/location/${location}`
    }
  };
}
