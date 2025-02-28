import { getBlogPosts, type BlogPost } from '@/src/lib/mdx';
import ClientImageWrapper from '@/src/components/client-image-wrapper';
import { Button } from '@/src/components/ui/button';
import { Link } from '@/src/navigation';
import GridBlog from '@/src/components/grid-blog';
import { getTranslations } from 'next-intl/server';
import { translateCategory, normalizeCategory } from '@/src/lib/categories';
import { Metadata } from 'next';
import Script from 'next/script';
import {
  generateWebsiteSchema,
  generateBreadcrumbSchema
} from '@/src/lib/structured-data';

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations('blog-page');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr';
  const url = `${siteUrl}/${params.locale}/blog`;

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    openGraph: {
      title: t('metadata.openGraph.title'),
      description: t('metadata.openGraph.description'),
      type: 'website',
      url: url,
      images: [
        {
          url: '/blog-page/blog-jeremydan-wedding-photography-001-optimized.webp',
          width: 1200,
          height: 630,
          alt: t('metadata.openGraph.alt')
        }
      ]
    },
    alternates: {
      canonical: url,
      languages: {
        fr: `${siteUrl}/fr/blog`,
        en: `${siteUrl}/en/blog`
      }
    }
  };
}

export default async function BlogPage({
  params,
  searchParams
}: {
  params: { locale: string };
  searchParams: { category?: string };
}) {
  const posts = await getBlogPosts(params.locale);
  const t = await getTranslations('blog-page');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr';

  // Get the category from the URL query parameter
  const selectedCategory = searchParams.category?.toLowerCase();

  // Filter posts based on the selected category
  const filteredPosts = selectedCategory
    ? posts.filter(post => {
        const normalizedPostCategory = normalizeCategory(post.category);
        const normalizedSelectedCategory = normalizeCategory(selectedCategory);
        return normalizedPostCategory === normalizedSelectedCategory;
      })
    : posts;

  // Separate posts by category for the default view
  const weddingPosts = posts.filter(
    post => normalizeCategory(post.category) === 'wedding'
  );

  const articlePosts = posts.filter(
    post => normalizeCategory(post.category) === 'article'
  );

  // Create metadata object to pass to structured data
  const pageMetadata = {
    title: t('metadata.title'),
    description: t('metadata.description'),
    openGraph: {
      title: t('metadata.title'),
      description: t('metadata.description'),
      type: 'website',
      url: `${siteUrl}/${params.locale}/blog`,
      siteName: t('metadata.openGraph.siteName'),
      images: [
        {
          url: '/blog-page/blog-jeremydan-wedding-photography-001-optimized.webp',
          width: 1200,
          height: 630,
          alt: t('metadata.openGraph.alt')
        }
      ]
    }
  };

  // Generate structured data
  const websiteSchema = generateWebsiteSchema(pageMetadata);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t('home'), url: `${siteUrl}/${params.locale}` },
    { name: t('blog-title'), url: `${siteUrl}/${params.locale}/blog` }
  ]);

  // Generate blog listing schema
  const blogListingSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: filteredPosts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'BlogPosting',
        '@id': `${siteUrl}/${params.locale}/blog/${post.slug}`,
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.lastModified || post.date,
        author: {
          '@type': 'Person',
          name: 'Jeremy Dan',
          url: `${siteUrl}/${params.locale}`
        },
        image: post.coverImage,
        url: `${siteUrl}/${params.locale}/blog/${post.slug}`,
        articleSection: post.category,
        inLanguage: params.locale
      }
    }))
  };

  return (
    <div className='relative w-screen'>
      <Script
        id='website-structured-data'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id='breadcrumb-structured-data'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id='blog-listing-structured-data'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListingSchema) }}
      />

      <div className='relative h-[70vh] w-full'>
        <ClientImageWrapper
          src='/blog-page/blog-jeremydan-wedding-photography-001-optimized.webp'
          alt={t('alt')}
          className='h-[70vh] w-full object-cover object-center'
        />
        <div className='absolute inset-0 flex items-center justify-center bg-black/30'>
          <h1 className='font-serif text-4xl text-white md:text-5xl'>
            {t('hero-title')}
          </h1>
        </div>
      </div>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-8 mt-16 flex flex-col justify-center px-8 text-center md:w-1/2 md:max-w-lg md:text-left'>
          <h2 className='mb-8 font-serif text-3xl'>{t('title1')}</h2>
          <p className='mb-8 text-muted-foreground'>{t('description')}</p>
          <div className='default'>
            <Button>
              <Link href='/contact'>{t('button-label')}</Link>
            </Button>
          </div>
        </div>

        {selectedCategory ? (
          <section className='mx-auto max-w-7xl px-6 py-8'>
            <h2 className='mb-8 font-serif text-3xl capitalize'>
              {translateCategory(selectedCategory, params.locale)}
            </h2>
            <GridBlog blogPosts={filteredPosts} />
          </section>
        ) : (
          <>
            <section className='mx-auto max-w-7xl px-6 py-8'>
              <h2 className='mb-8 font-serif text-3xl'>{t('title2')}</h2>
              <GridBlog blogPosts={weddingPosts} />
            </section>

            <section className='mx-auto max-w-7xl px-6 py-8'>
              <h2 className='mb-8 font-serif text-3xl'>{t('title3')}</h2>
              <GridBlog blogPosts={articlePosts} />
            </section>
          </>
        )}
      </div>
    </div>
  );
}
