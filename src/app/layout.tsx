import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Crimson_Text, Quattrocento } from 'next/font/google';
import cn from 'classnames';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true
});

const quattrocento = Quattrocento({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-quattrocento',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'serif'],
  adjustFontFallback: true
});

const crimsonText = Crimson_Text({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-crimson-text',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'serif'],
  adjustFontFallback: true
});

export const metadata: Metadata = {
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${inter.variable} ${quattrocento.variable} ${crimsonText.variable}`}
    >
      <head>
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}`}
          strategy='beforeInteractive'
        />
        <Script
          defer
          src='https://cloud.umami.is/script.js'
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          strategy='afterInteractive'
        />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          inter.variable,
          quattrocento.variable,
          crimsonText.variable,
          'min-h-screen font-sans antialiased'
        )}
        style={{ minWidth: '320px' }}
      >
        {children}
      </body>
    </html>
  );
}
