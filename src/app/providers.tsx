// app/providers.tsx
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { usePostHog } from 'posthog-js/react';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only initialize PostHog in production environment
    if (process.env.NODE_ENV === 'production' && 
        !window.location.host.includes('localhost') && 
        !window.location.host.includes('127.0.0.1')
    ) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') posthog.debug();
        },
        capture_pageview: false, // Disable automatic pageview capture, as we capture manually
      });
    }
  }, []);

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  );
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  // Track pageviews
  useEffect(() => {
    if (pathname) {
      // Check if PostHog is loaded
      if (posthog && posthog.capture) {
        let url = window.origin + pathname;
        if (searchParams?.toString()) {
          url = url + '?' + searchParams.toString();
        }

        // Add more properties for better analytics
        posthog.capture('$pageview', {
          $current_url: url,
          $pathname: pathname,
          $search_params: searchParams?.toString() || '',
          locale: pathname.split('/')[1] || 'fr' // Extract locale from URL
        });
      }
    }
  }, [pathname, searchParams, posthog]);

  return null;
}

// Wrap PostHogPageView in Suspense to avoid the useSearchParams usage above
// from de-opting the whole app into client-side rendering
// See: https://nextjs.org/docs/messages/deopted-into-client-rendering
function SuspendedPostHogPageView() {
  return (
    <Suspense>
      <PostHogPageView />
    </Suspense>
  );
}
