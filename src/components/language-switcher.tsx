'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

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

  const switchLanguage = () => {
    const newLocale = locale === 'en' ? 'fr' : 'en';
    router.push(pathname?.replace(`/${locale}`, `/${newLocale}`) || '/');
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
