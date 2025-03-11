'use client';

import { useEffect } from 'react';

interface AltchaWidgetProps {
  locale: string;
  onToken: (token: string) => void;
}

export function AltchaWidget({ locale, onToken }: AltchaWidgetProps) {
  useEffect(() => {
    // Import Altcha only on the client side
    import('altcha');
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<altcha-widget challengeurl="/api/altcha/challenge" floating locale="${locale}"></altcha-widget>`
      }}
      ref={el => {
        if (el) {
          const widget = el.querySelector('altcha-widget');
          if (widget) {
            widget.addEventListener('token', (e: any) => {
              onToken(e.detail);
            });
          }
        }
      }}
    />
  );
}
