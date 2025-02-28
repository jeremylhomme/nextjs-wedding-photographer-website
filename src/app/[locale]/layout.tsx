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

if (!process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY) {
  throw new Error('NEXT_PUBLIC_CAPTCHA_SITE_KEY is not configured');
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  userScalable: false
};

// Define locale-based metadata for the home page
const localeMetadata = {
  fr: {
    title: 'Jeremy Dan | Photographe à Sceaux (92) - Hauts-de-Seine',
    description:
      'Photographe de Mariage basé à Sceaux dans les Hauts-de-Seine (92). Pour des photos intemporelles en région parisienne, France et international.',
    keywords: [
      'photographe sceaux',
      'photographe mariage sceaux',
      'photographe entreprise sceaux',
      'photographe lifestyle sceaux',
      'photographe événementiel sceaux',
      'photographe 92',
      'photographe hauts-de-seine',
      'vidéaste sceaux',
      'vidéaste mariage sceaux',
      'vidéaste entreprise sceaux',
      'vidéaste lifestyle sceaux',
      'vidéaste événementiel sceaux',
      'vidéaste 92',
      'vidéaste hauts-de-seine'
    ]
  },
  en: {
    title:
      'Jeremy Dan | Photographer and Videographer in Sceaux (92) - Hauts-de-Seine',
    description:
      'Wedding Photographer based in Sceaux, Hauts-de-Seine (92). For timeless photos in Paris region, France, and internationally.',
    keywords: [
      'photographer sceaux',
      'wedding photographer sceaux',
      'corporate photographer sceaux',
      'lifestyle photographer sceaux',
      'event photographer sceaux',
      'photographer 92',
      'photographer hauts-de-seine',
      'videographer sceaux',
      'wedding videographer sceaux',
      'corporate videographer sceaux',
      'lifestyle videographer sceaux',
      'event videographer sceaux',
      'videographer 92',
      'videographer hauts-de-seine'
    ]
  }
};

// Generate metadata based on locale parameter
export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as 'fr' | 'en';

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ||
        'https://jeremydan.fr' ||
        'https://localhost:3000'
    ),
    title: localeMetadata[locale].title,
    description: localeMetadata[locale].description,
    keywords: localeMetadata[locale].keywords,
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
        fr: '/fr',
        en: '/en'
      }
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: '/',
      siteName: 'Jeremy Dan Photography',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Jeremy Dan Photography'
        }
      ]
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1
      }
    }
  };
}

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
