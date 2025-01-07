import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mon Histoire',
  description:
    'Découvrez mon parcours en tant que photographe de mariage à Sceaux dans les Hauts-de-Seine. Disponible région parisienne, France et international.',
  alternates: {
    canonical: '/about',
    languages: {
      fr:
        `${process.env.SITE_URL}/fr/about` ||
        'https://jeremydan.fr/fr/about' ||
        'https://localhost:3000/fr/about',
      en:
        `${process.env.SITE_URL}/en/about` ||
        'https://jeremydan.fr/en/about' ||
        'https://localhost:3000/en/about'
    }
  },
  openGraph: {
    title: 'Mon Histoire | Jeremy Dan Photographe de mariage',
    description:
      'Photographe de mariage passionné basé à Sceaux dans les Hauts-de-Seine. Découvrez mon approche naturelle et authentique du reportage de mariage.',
    url: `${process.env.SITE_URL}/about` || 'https://jeremydan.fr/about',
    type: 'website'
  }
};

export default function AboutLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
