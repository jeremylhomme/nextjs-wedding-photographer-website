import { MetadataRoute } from 'next';
import { locales } from '@/src/i18n/routing';

// Mock data - Replace with your actual data
const services = ['wedding', 'corporate', 'family'];
const locations = ['sceaux', 'hauts-de-seine', 'paris'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr';
  const currentDate = new Date().toISOString();

  const routes: MetadataRoute.Sitemap = [];

  // Generate routes for all locales
  for (const locale of locales) {
    // Add service routes
    for (const service of services) {
      // Service-only pages (e.g., /fr/service/wedding)
      routes.push({
        url: `${baseUrl}/${locale}/service/${service}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8
      });

      // Location-specific service pages (e.g., /fr/service/wedding/sceaux)
      for (const location of locations) {
        routes.push({
          url: `${baseUrl}/${locale}/service/${service}/${location}`,
          lastModified: currentDate,
          changeFrequency: 'weekly',
          priority: 0.9
        });
      }
    }
  }

  return routes;
}
