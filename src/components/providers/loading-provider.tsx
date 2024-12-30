'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from '@/src/i18n/routing';
import { PageSpinner } from '../ui/spinner';

const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: (loading: boolean) => {}
});

export const useLoading = () => useContext(LoadingContext);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // Set loading state when pathname changes
    setIsLoading(true);
    timeoutId = setTimeout(() => setIsLoading(false), 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname]); // Watch for pathname changes

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <PageSpinner />}
      {children}
    </LoadingContext.Provider>
  );
}
