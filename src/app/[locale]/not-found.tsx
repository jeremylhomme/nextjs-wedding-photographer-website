import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notfound-page');

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4 text-center'>
      <h1 className='mb-4 text-6xl font-bold'>404</h1>
      <h2 className='mb-6 text-2xl font-semibold'>{t('title')}</h2>
      <p className='mb-8 max-w-md text-muted-foreground'>{t('description')}</p>
      <Button asChild>
        <Link href='/'>{t('return-home')}</Link>
      </Button>
    </div>
  );
}
