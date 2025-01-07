import Script from 'next/script';

export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': process.env.SITE_URL || 'https://jeremydan.fr',
    name: 'Jeremy Dan Photography',
    image: `${process.env.SITE_URL || 'https://jeremydan.fr'}/og-image.jpg`,
    description:
      "Photographe de mariage professionnel à Sceaux et dans les Hauts-de-Seine (92). Capturant des moments authentiques dans toute l'Île-de-France.",
    url: process.env.SITE_URL || 'https://jeremydan.fr',
    telephone: '+33650056891',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sceaux',
      addressRegion: 'Hauts-de-Seine',
      postalCode: '92330',
      addressCountry: 'FR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.7797,
      longitude: 2.2897
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 48.7797,
        longitude: 2.2897
      },
      geoRadius: '50000'
    },
    sameAs: [
      'https://www.instagram.com/jeremydan.fr/',
      'https://www.pinterest.fr/jeremydanphoto/'
    ]
  };

  return (
    <Script
      id='structured-data'
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
