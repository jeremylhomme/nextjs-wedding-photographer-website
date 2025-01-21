import { getBlogPost } from '@/src/lib/mdx';
import ClientImageWrapper from '@/src/components/client-image-wrapper';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/src/components/ui/breadcrumbs';
import { BlogFooter } from '@/src/components/blog/BlogFooter';
import { Link } from '@/src/navigation';
import { translateCategory, normalizeCategory } from '@/src/lib/categories';
import { Locale } from '@/src/i18n/routing';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

interface PageProps {
  params: { locale: Locale; slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const cleanSlug = params.slug.split('/').pop() || params.slug;
  const { meta } = await getBlogPost(params.locale, cleanSlug);

  return {
    title: meta.title,
    description: meta.excerpt,
    openGraph: {
      title: meta.title,
      description: meta.excerpt,
      type: 'article',
      publishedTime: meta.date,
      modifiedTime: meta.lastModified || meta.date,
      authors: ['Jeremy Dan'],
      images: [
        {
          url: meta.coverImage,
          width: 1200,
          height: 630,
          alt: meta.title
        }
      ]
    }
  };
}

const BlogPost = async ({ params }: PageProps) => {
  const cleanSlug = params.slug.split('/').pop() || params.slug;
  const t = await getTranslations('blog-posts');

  try {
    const { meta, content } = await getBlogPost(params.locale, cleanSlug);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: meta.title,
      image: meta.coverImage,
      datePublished: meta.date,
      dateModified: meta.lastModified || meta.date,
      ...(meta.weddingDate && {
        about: {
          '@type': 'Event',
          '@context': 'https://schema.org',
          eventType: 'Wedding',
          startDate: meta.weddingDate
        }
      }),
      author: {
        '@type': 'Person',
        name: 'Jeremy Dan',
        url: 'https://jeremydan.fr'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Jeremy Dan Photography',
        url: 'https://jeremydan.fr'
      }
    };

    return (
      <article className='container mx-auto px-6 py-16'>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Breadcrumbs
          items={[
            { label: 'Blog', href: `/blog` },
            {
              label: translateCategory(meta.category, params.locale),
              href: `/blog?category=${normalizeCategory(meta.category)}`
            },
            { label: meta.title, href: `/blog/${cleanSlug}` }
          ]}
        />

        <div className='relative h-[400px] w-full overflow-hidden'>
          <ClientImageWrapper
            src={meta.coverImage}
            alt={meta.title}
            className='absolute inset-0 h-full w-full object-cover'
          />
        </div>

        <div className='mt-8'>
          <h1 className='font-serif text-4xl'>{meta.title}</h1>
          <p className=''>{meta.excerpt}</p>
          <div className='mb-2'>
            <span className='text-xs text-muted-foreground'>
              {meta.category.toLowerCase() === 'wedding' ? (
                <>
                  {t('creation-date')}{' '}
                  {new Date(meta.date).toLocaleDateString(params.locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </>
              ) : (
                new Date(meta.date).toLocaleDateString(params.locale, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              )}
              {meta.lastModified && meta.lastModified !== meta.date && (
                <>
                  {' | '}
                  {t('last-modified')}{' '}
                  {new Date(meta.lastModified).toLocaleDateString(params.locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </>
              )}
            </span>
          </div>
          <Link
            className='mr-2 rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground'
            href={`/blog?category=${normalizeCategory(meta.category)}`}
          >
            {translateCategory(meta.category, params.locale)}
          </Link>
          {meta.category.toLowerCase() === 'wedding' && meta.weddingDate && (
            <span className='rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground'>
              <span className='text-secondary-foreground'>{t('wedding-date')} </span>
              <time dateTime={meta.weddingDate}>
                {new Date(meta.weddingDate).toLocaleDateString(params.locale, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </span>
          )}
        </div>

        <div className='mt-8 space-y-6 text-base leading-relaxed text-muted-foreground'>
          {content}
        </div>

        <BlogFooter />
      </article>
    );
  } catch (error) {
    console.error('Blog post error:', error);
    notFound();
  }
};

export default BlogPost;
