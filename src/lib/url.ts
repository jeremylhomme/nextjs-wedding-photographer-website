export function generateCanonicalUrl(path: string, locale?: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr';
  // Remove any leading or trailing slashes
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  
  // If locale is provided, ensure it's not duplicated
  if (locale) {
    // Remove any existing locale prefix if present
    const pathWithoutLocale = cleanPath.replace(new RegExp(`^(${locale}\/|${locale}$)`), '');
    return `${baseUrl}/${locale}/${pathWithoutLocale}`;
  }
  
  return `${baseUrl}/${cleanPath}`;
}
