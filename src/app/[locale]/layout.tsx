import type { Metadata, Viewport } from 'next';
import Header from '@/src/components/header';
import Footer from '@/src/components/footer';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Toaster } from 'sonner';
import { notFound } from 'next/navigation';
import { routing } from '@/src/i18n/routing';
import { LoadingProvider } from '@/src/components/providers/loading-provider';
import StructuredData from '@/src/components/structured-data';
import cn from 'classnames';

if (!process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY) {
  throw new Error('NEXT_PUBLIC_CAPTCHA_SITE_KEY is not configured');
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  userScalable: false
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.SITE_URL || 'https://jeremydan.fr' || 'https://localhost:3000'
  ),
  title: {
    template: '%s | Jeremy Dan - Photographe Mariage Sceaux (92)',
    default: 'Jeremy Dan | Photographe Mariage Sceaux (92) - Hauts-de-Seine'
  },
  description:
    'Photographe de Mariage à Sceaux basé dans les Hauts-de-Seine (92). Pour des photos intemporelles en région parisienne, France et international.',
  keywords: [
    'photographe mariage sceaux',
    'photographe mariage 92',
    'photographe mariage hauts-de-seine'
  ],
  authors: [{ name: 'Jeremy Dan' }],
  creator: 'Jeremy Dan',
  publisher: 'Jeremy Dan',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  alternates: {
    canonical: '/',
    languages: {
      fr:
        `${process.env.SITE_URL}/fr` ||
        'https://jeremydan.fr' ||
        'https://localhost:3000',
      en:
        `${process.env.SITE_URL}/en` ||
        'https://jeremydan.fr' ||
        'https://localhost:3000/en'
    }
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'en_US',
    title:
      'Jeremy Dan | Photographe de Mariage à Sceaux et dans les Hauts-de-Seine (92)',
    description:
      'Photographe de mariage professionnel à Sceaux. Spécialiste du reportage photo de mariage naturel et authentique dans les Hauts-de-Seine.',
    url:
      process.env.SITE_URL ||
      'https://jeremydan.fr' ||
      'https://localhost:3000',
    siteName: 'Jeremy Dan Photography',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jeremy Dan - Photographe de Mariage à Sceaux'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jeremy Dan | Photographe de Mariage à Sceaux',
    description:
      'Photographe de mariage professionnel dans les Hauts-de-Seine (92). Reportages photo authentiques et intemporels.',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
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
    <>
      <StructuredData />
      <LoadingProvider>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className='flex-1'>{children}</main>
          <Footer />
          <Toaster position='top-center' />
        </NextIntlClientProvider>
      </LoadingProvider>
    </>
  );
}
