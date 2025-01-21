import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Crimson_Text } from 'next/font/google';
import cn from 'classnames';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const crimsonText = Crimson_Text({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-crimson-text',
  display: 'swap'
});

export const metadata: Metadata = {
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      'p:domain_verify': '35da5f61346d0219f5a2173361e47cc4'
    }
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
      className={`${inter.variable} ${crimsonText.variable}`}
    >
      <head>
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}`}
          strategy='beforeInteractive'
        />
        <Script
          defer
          src='https://cloud.umami.is/script.js'
          data-website-id='39f306ab-46f5-46b8-897b-49c7326f92ad'
          strategy='afterInteractive'
        />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          inter.variable,
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
