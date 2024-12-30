import type { Metadata } from 'next';
import { Inter, Crimson_Text } from 'next/font/google';
import Header from '@/src/components/header';
import Footer from '@/src/components/footer';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Script from 'next/script';
import { Toaster } from 'sonner';
import { notFound } from 'next/navigation';
import { routing } from '@/src/i18n/routing';
import { LoadingProvider } from '@/src/components/providers/loading-provider';
import cn from 'classnames';

// Load Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

if (!process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY) {
  throw new Error('NEXT_PUBLIC_CAPTCHA_SITE_KEY is not configured');
}

const crimsonText = Crimson_Text({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-crimson-text',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Jeremy Dan | Photographe de Mariage',
  description:
    'Jeremy Dan est un photographe de mariage basé dans les Hauts-de-Seine près de Paris.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    userScalable: false
  }
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();
  return (
    <html
      suppressHydrationWarning
      lang={locale}
      className={`${inter.variable} ${crimsonText.variable}`}
    >
      <head>
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}`}
          strategy='beforeInteractive'
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
        <LoadingProvider>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <main className='flex-1'>{children}</main>
            <Footer />
            <Toaster position='top-center' />
          </NextIntlClientProvider>
        </LoadingProvider>
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}`}
          strategy='lazyOnload'
        />
      </body>
    </html>
  );
}
