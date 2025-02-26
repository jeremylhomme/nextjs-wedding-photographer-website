import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales & CGV | Jeremy Dan Photography',
  description: 'Mentions légales, conditions générales de vente, politique de confidentialité et conditions d\'utilisation du site de Jeremy Dan Photography.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
