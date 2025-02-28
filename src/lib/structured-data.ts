import { BlogPosting, WithContext } from 'schema-dts';
import { Metadata } from 'next';
import { defaultMetadata } from '@/src/config/metadata';

export function generateBlogPostSchema(
  title: string,
  description: string,
  url: string,
  datePublished: string,
  dateModified: string | null,
  authorName: string = 'Jeremy Dan',
  authorUrl: string = 'https://jeremydan.fr',
  imageUrl: string,
  category: string
): WithContext<BlogPosting> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: imageUrl,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
      url: authorUrl
    },
    publisher: {
      '@type': 'Organization',
      name: 'Jeremy Dan | Photographe et Vidéaste à Sceaux',
      logo: {
        '@type': 'ImageObject',
        url: 'https://jeremydan.fr/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    keywords: [
      category,
      'photography',
      'videography',
      'wedding photography',
      'wedding videography',
      'photographer',
      'videographer'
    ],
    articleSection: category
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function generateWebsiteSchema(metadata: Metadata = defaultMetadata) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr';
  const siteName = metadata.openGraph?.siteName || 'Jeremy Dan Photography';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    alternateName: [
      'Jeremy Dan Photography',
      'Jeremy Dan Photographer',
      'Jeremy Dan Videographer',
      'Jeremy Dan Videography'
    ],
    description: metadata.description || defaultMetadata.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

export function generateLocalBusinessSchema(
  metadata: Metadata = defaultMetadata
) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr';
  const description = metadata.description || defaultMetadata.description;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': siteUrl,
    name: 'Jeremy Dan | Photographe et Vidéaste à Sceaux',
    alternateName: [
      'Jeremy Dan Photography',
      'Jeremy Dan Photographer',
      'Jeremy Dan Videographer'
    ],
    description: description,
    image: 'https://jeremydan.fr/og-image.jpg',
    url: siteUrl,
    telephone: '+33650056891',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rue des filmins',
      addressLocality: 'Sceaux',
      addressRegion: 'Île-de-France',
      postalCode: '92330',
      addressCountry: 'FR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.77866646106299,
      longitude: 2.306252955747709
    },
    priceRange: '€€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '48.7800',
        longitude: '2.2897'
      },
      geoRadius: '100000'
    },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '48.7800',
        longitude: '2.2897'
      },
      geoRadius: '100000'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      }
    ]
  };
}
