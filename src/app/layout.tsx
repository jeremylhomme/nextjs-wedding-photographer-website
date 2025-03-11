import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Crimson_Text, Quattrocento } from 'next/font/google';
import cn from 'classnames';
import { PostHogProvider } from './providers';
import { useLocale } from 'next-intl';

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
  const locale = useLocale();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${quattrocento.variable} ${crimsonText.variable}`}
    >
      <head></head>
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
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
