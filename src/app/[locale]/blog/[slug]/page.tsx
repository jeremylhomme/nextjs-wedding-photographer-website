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
import {
  generateBlogPostSchema,
  generateBreadcrumbSchema
} from '@/src/lib/structured-data';
import Script from 'next/script';

interface PageProps {
  params: { locale: Locale; slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const cleanSlug = params.slug.split('/').pop() || params.slug;
  const { meta } = await getBlogPost(params.locale, cleanSlug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr';
  const url = `${siteUrl}/${params.locale}/blog/${cleanSlug}`;

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
      ],
      url: url
    },
    alternates: {
      canonical: url,
      languages: {
        fr: `${siteUrl}/fr/blog/${cleanSlug}`,
        en: `${siteUrl}/en/blog/${cleanSlug}`
      }
    }
  };
}

const BlogPost = async ({ params }: PageProps) => {
  const cleanSlug = params.slug.split('/').pop() || params.slug;
  const t = await getTranslations('blog-posts');

  try {
    const { meta, content } = await getBlogPost(params.locale, cleanSlug);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr';
    const url = `${siteUrl}/${params.locale}/blog/${cleanSlug}`;

    // Create metadata object that can be passed to structured data
    const pageMetadata = {
      title: meta.title,
      description: meta.excerpt,
      openGraph: {
        title: meta.title,
        description: meta.excerpt,
        type: 'article',
        url: url,
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

    // Generate structured data for the blog post
    const blogPostSchema = generateBlogPostSchema(
      meta.title,
      meta.excerpt,
      url,
      meta.date,
      meta.lastModified || null,
      'Jeremy Dan',
      `${siteUrl}/${params.locale}`,
      meta.coverImage,
      meta.category
    );

    // Generate breadcrumb structured data
    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: t('bc-home'), url: `${siteUrl}/${params.locale}` },
      { name: t('bc-blogPage'), url: `${siteUrl}/${params.locale}/blog` },
      { name: meta.title, url: url }
    ]);

    return (
      <div className='mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8'>
        <Script
          id='blog-post-structured-data'
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
        />
        <Script
          id='breadcrumb-structured-data'
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        <Breadcrumbs
          items={[
            { label: t('bc-home'), href: '/' },
            { label: t('bc-blogPage'), href: '/blog' },
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
                  {new Date(meta.lastModified).toLocaleDateString(
                    params.locale,
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }
                  )}
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
              <span className='text-secondary-foreground'>
                {t('wedding-date')}{' '}
              </span>
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
      </div>
    );
  } catch (error) {
    console.error('Blog post error:', error);
    notFound();
  }
};

export default BlogPost;
