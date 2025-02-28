import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';
import {
  getLocalizedService,
  ServiceType,
  services
} from '@/src/config/services';
import {
  getLocalizedCategory,
  CategoryType,
  categories
} from '@/src/config/categories';
import {
  getLocalizedLocation,
  LocationType,
  locations
} from '@/src/config/locations';
import { generateServiceMetadata } from '@/src/config/metadata';
import { generateLocationMetadata } from '@/src/config/metadata';
import Script from 'next/script';
import { generateBreadcrumbSchema } from '@/src/lib/structured-data';

type Props = {
  params: {
    locale: string;
    rest: string[];
  };
};

export async function generateMetadata({
  params: { locale, rest }
}: Props): Promise<Metadata> {
  const serviceAndCategory = parseServiceAndCategory(rest.join('/'), locale);
  const serviceAndLocation = parseServiceAndLocation(rest.join('/'), locale);

  const service = serviceAndCategory.service || serviceAndLocation.service;
  const location = serviceAndLocation.location;

  const category = serviceAndCategory.category;

  if (service && category) {
    return generateServiceMetadata(
      service as ServiceType,
      category as CategoryType,
      locale,
      location as LocationType
    );
  } else if (location) {
    return generateLocationMetadata(location as LocationType, locale);
  }

  return {};
}

function getServiceComponent(service: ServiceType, category: CategoryType) {
  const key = `${category}-${service}`;
  switch (key) {
    case 'wedding-photography':
      return dynamic(() =>
        import('@/src/components/services/wedding-photography-service').then(
          mod => mod.WeddingPhotographyService
        )
      );
    case 'corporate-photography':
      return dynamic(() =>
        import('@/src/components/services/corporate-photography-service').then(
          mod => mod.CorporatePhotographyService
        )
      );
    // Add other service-category combinations here
    default:
      return null;
  }
}

function getLocationComponent(service: ServiceType, location: LocationType) {
  const key = `${location}-${service}`;
  switch (key) {
    case 'sceaux-photography':
      return dynamic(() =>
        import('@/src/components/locations/sceaux-photography-location').then(
          mod => mod.SceauxPhotographyLocation
        )
      );
    default:
      return null;
  }
}

import { redirect } from 'next/navigation';

function parseServiceAndCategory(
  localizedPath: string,
  locale: string
): {
  service: ServiceType | null;
  category: CategoryType | null;
  shouldRedirect?: string;
} {
  // First check if it's already in the correct format (service/category)
  const [firstPart, secondPart] = localizedPath.split('/');
  if (secondPart) {
    for (const service of services) {
      if (getLocalizedService(service, locale) === firstPart) {
        for (const category of categories) {
          if (getLocalizedCategory(category, locale) === secondPart) {
            return { service, category };
          }
        }
      }
    }
  }

  // Check hyphenated format and return redirect if needed
  for (const service of services) {
    const localizedService = getLocalizedService(service, locale);
    for (const category of categories) {
      const localizedCategory = getLocalizedCategory(category, locale);
      // Check both combinations: category-service and service-category
      const combinedCategoryFirst = `${localizedCategory}-${localizedService}`;
      const combinedServiceFirst = `${localizedService}-${localizedCategory}`;
      if (
        localizedPath === combinedCategoryFirst ||
        localizedPath === combinedServiceFirst
      ) {
        return {
          service,
          category,
          shouldRedirect: `/${localizedService}/${localizedCategory}`
        };
      }
    }
  }
  return { service: null, category: null };
}

function parseServiceAndLocation(
  localizedPath: string,
  locale: string
): {
  service: ServiceType | null;
  location: LocationType | null;
  shouldRedirect?: string;
} {
  // First check if it's already in the correct format (service/location)
  const [firstPart, secondPart] = localizedPath.split('/');
  if (secondPart) {
    for (const service of services) {
      if (getLocalizedService(service, locale) === firstPart) {
        for (const location of locations) {
          if (getLocalizedLocation(location, locale) === secondPart) {
            return { service, location };
          }
        }
      }
    }
  }

  // Check hyphenated format and return redirect if needed
  for (const service of services) {
    const localizedService = getLocalizedService(service, locale);
    for (const location of locations) {
      const localizedLocation = getLocalizedLocation(location, locale);
      // Check both combinations and redirect to service/location
      const combinedServiceFirst = `${localizedService}-${localizedLocation}`;
      const combinedLocationFirst = `${localizedLocation}-${localizedService}`;
      if (
        localizedPath === combinedServiceFirst ||
        localizedPath === combinedLocationFirst
      ) {
        return {
          service,
          location,
          shouldRedirect: `/${localizedService}/${localizedLocation}`
        };
      }
    }
  }
  return { service: null, location: null };
}

function generateServiceSchema(service: ServiceType, category: CategoryType, locale: string, location?: LocationType) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr';
  const path = location 
    ? `/${locale}/service/${service}/${category}/${location}`
    : `/${locale}/service/${service}/${category}`;
  const url = `${baseUrl}${path}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: category === 'wedding' ? 'Wedding Photography' : 'Corporate Photography',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Jeremy Dan Photography',
      image: `${baseUrl}/about-page/about-jeremydan-wedding-photographer-optimized-square.webp`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sceaux',
        addressRegion: 'Île-de-France',
        addressCountry: 'FR'
      },
      url: baseUrl
    },
    areaServed: {
      '@type': 'State',
      name: 'Île-de-France',
      containsPlace: {
        '@type': 'City',
        name: location || 'Sceaux'
      }
    },
    serviceType: category === 'wedding' ? 'Wedding Photography' : 'Corporate Photography',
    url: url
  };
}

function generateLocationSchema(location: LocationType, locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr';
  const url = `${baseUrl}/${locale}/location/${location}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Jeremy Dan Photography',
    image: `${baseUrl}/about-page/about-jeremydan-wedding-photographer-optimized-square.webp`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location,
      addressRegion: 'Île-de-France',
      addressCountry: 'FR'
    },
    url: url,
    areaServed: {
      '@type': 'City',
      name: location,
      containedInPlace: {
        '@type': 'State',
        name: 'Île-de-France'
      }
    },
    '@id': url
  };
}

export default async function DynamicPage({ params: { locale, rest } }: Props) {
  if (rest.length > 2) {
    notFound();
  }

  // Case 1: /[locale]/[category]-[service] or /[locale]/[service]-[category]
  // Case 2: /[locale]/[service]-[location] or /[locale]/[location]-[service]
  if (rest.length === 1) {
    const [path] = rest;

    // Try parsing as service-category combination
    const {
      service: serviceWithCategory,
      category,
      shouldRedirect: categoryRedirect
    } = parseServiceAndCategory(path, locale);
    if (categoryRedirect) {
      redirect(`/${locale}${categoryRedirect}`);
    }
    if (serviceWithCategory && category) {
      const ServiceComponent = getServiceComponent(
        serviceWithCategory,
        category
      );
      
      const serviceSchema = generateServiceSchema(serviceWithCategory, category, locale);
      const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}` },
        { name: `${category} ${serviceWithCategory}`, url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/service/${serviceWithCategory}/${category}` }
      ]);

      return (
        <>
          <Script
            id="service-structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
          />
          <Script
            id="breadcrumb-structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />
          <div className='container mx-auto py-16'>
            {ServiceComponent && <ServiceComponent />}
          </div>
        </>
      );
    }

    // Try parsing as service-location combination
    const {
      service: serviceWithLocation,
      location,
      shouldRedirect: locationRedirect
    } = parseServiceAndLocation(path, locale);
    if (locationRedirect) {
      redirect(`/${locale}${locationRedirect}`);
    }
    if (serviceWithLocation && location) {
      const LocationComponent = getLocationComponent(
        serviceWithLocation,
        location
      );
      
      const locationSchema = generateLocationSchema(location, locale);
      const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}` },
        { name: location, url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/location/${location}` }
      ]);

      return (
        <>
          <Script
            id="location-structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
          />
          <Script
            id="breadcrumb-structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />
          <div className='container mx-auto py-16'>
            {LocationComponent && <LocationComponent />}
          </div>
        </>
      );
    }

    notFound();
  }

  // Case 3: /[locale]/[service]/[category] or /[locale]/[category]/[service]
  // Case 4: /[locale]/[service]/[location] or /[locale]/[location]/[service]
  if (rest.length === 2) {
    const [firstPart, secondPart] = rest;

    // Try first part as service, second as category
    let service = services.find(
      s => getLocalizedService(s, locale) === firstPart
    );
    let category = categories.find(
      c => getLocalizedCategory(c, locale) === secondPart
    );

    // If not found, try first part as category, second as service
    if (!service || !category) {
      service = services.find(
        s => getLocalizedService(s, locale) === secondPart
      );
      category = categories.find(
        c => getLocalizedCategory(c, locale) === firstPart
      );
    }

    if (service && category) {
      const ServiceComponent = getServiceComponent(service, category);
      return (
        <div className='container mx-auto py-16'>
          {ServiceComponent && <ServiceComponent />}
        </div>
      );
    }

    // Try first part as service, second as location
    let location = locations.find(
      l => getLocalizedLocation(l, locale) === secondPart
    );
    service = services.find(s => getLocalizedService(s, locale) === firstPart);

    // If not found, try first part as location, second as service
    if (!service || !location) {
      service = services.find(
        s => getLocalizedService(s, locale) === secondPart
      );
      location = locations.find(
        l => getLocalizedLocation(l, locale) === firstPart
      );
    }

    if (service && location) {
      const LocationComponent = getLocationComponent(service, location);
      return (
        <div className='container mx-auto py-16'>
          {LocationComponent && <LocationComponent />}
        </div>
      );
    }

    notFound();
  }

  notFound();
}
