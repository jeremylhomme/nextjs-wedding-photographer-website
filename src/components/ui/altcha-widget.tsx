'use client';

import { useEffect } from 'react';

export function AltchaWidget({ locale }: { locale: string }) {
  useEffect(() => {
    // Import Altcha only on the client side
    import('altcha');
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<altcha-widget challengeurl="/api/altcha/challenge" floating locale="${locale}"></altcha-widget>`
      }}
    />
  );
}
