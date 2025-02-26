import Script from 'next/script';

export default function StructuredData() {
  const businessData = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService', 'PhotographyBusiness'],
    '@id': process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr',
    name: 'Jeremy Dan Photography',
    image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr'}/og-image.jpg`,
    description:
      "Photographe de mariage professionnel à Sceaux et dans les Hauts-de-Seine (92). Capturant des moments authentiques dans toute l'Île-de-France.",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr',
    telephone: '+33650056891',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rue des Filmins',
      addressLocality: 'Sceaux',
      addressRegion: 'Hauts-de-Seine',
      postalCode: '92330',
      addressCountry: 'FR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.778557,
      longitude: 2.306191
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 48.8566,
        longitude: 2.3522
      },
      geoRadius: '50000'
    },
    priceRange: '€€',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '00:00',
        closes: '00:00'
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '11'
    }
  };

  const personData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr'}#jeremy`,
    name: 'Jeremy Dan',
    jobTitle: 'Photographe de Mariage',
    image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr'}/about-page/about-jeremydan-wedding-photographer-optimized.webp`,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr',
    sameAs: [
      'https://www.instagram.com/jeremydan.fr/',
      'https://www.pinterest.fr/jeremydanphoto/'
    ],
    worksFor: {
      '@id': process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr'
    }
  };

  const portfolioData = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr'}/portfolio`,
    name: 'Portfolio de Photographie de Mariage',
    description:
      'Galerie de photos de mariage par Jeremy Dan, photographe professionnel',
    creator: {
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr'}#jeremy`
    },
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr'}/portfolio`
  };

  return (
    <>
      <Script
        id='business-data'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessData) }}
      />
      <Script
        id='person-data'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }}
      />
      <Script
        id='portfolio-data'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioData) }}
      />
    </>
  );
}
