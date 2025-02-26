'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import {
  services,
  getLocalizedService,
  ServiceType
} from '@/src/config/services';
import {
  categories,
  getLocalizedCategory,
  CategoryType
} from '@/src/config/categories';
import {
  locations,
  getLocalizedLocation,
  LocationType
} from '@/src/config/locations';

interface LanguageSwitcherProps {
  pathname: string | null;
  className?: string;
}

export function LanguageSwitcher({
  pathname,
  className = ''
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();

  const getTranslatedPath = (path: string, fromLocale: string, toLocale: string) => {
    const parts = path.split('/');
    
    // Handle root path
    if (parts.length <= 2) return path.replace(`/${fromLocale}`, `/${toLocale}`);
    
    const translatedParts = parts.map((part, index) => {
      // Replace locale
      if (index === 1) return toLocale;
      if (index === 0) return part; // Keep empty first part
      
      // Try to find if it's a service
      const service = services.find(s => getLocalizedService(s, fromLocale) === part);
      if (service) return getLocalizedService(service, toLocale);
      
      // Try to find if it's a category
      const category = categories.find(c => getLocalizedCategory(c, fromLocale) === part);
      if (category) return getLocalizedCategory(category, toLocale);
      
      // Try to find if it's a location
      const location = locations.find(l => getLocalizedLocation(l, fromLocale) === part);
      if (location) return getLocalizedLocation(location, toLocale);
      
      return part; // Keep original if no match found
    });
    
    return translatedParts.join('/');
  };

  const switchLanguage = () => {
    if (!pathname) {
      router.push('/');
      return;
    }

    const newLocale = locale === 'en' ? 'fr' : 'en';
    const translatedPath = getTranslatedPath(pathname, locale, newLocale);
    router.push(translatedPath);
  };

  return (
    <button
      onClick={switchLanguage}
      className={`rounded-md border px-2 py-1 text-sm font-medium transition-colors hover:bg-secondary hover:text-secondary-foreground ${className}`}
    >
      {locale === 'en' ? 'FR' : 'EN'}
    </button>
  );
}
