import { getBlogPost } from '@/src/lib/mdx';
import ClientImageWrapper from '@/src/components/client-image-wrapper';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/src/components/ui/breadcrumbs';
import { BlogFooter } from '@/src/components/blog/BlogFooter';
import { Link } from '@/src/navigation';
import { translateCategory, normalizeCategory } from '@/src/lib/categories';
import { Locale } from '@/src/i18n/routing';

interface PageProps {
  params: { locale: Locale; slug: string };
}

export default async function BlogPost({ params }: PageProps) {
  // Remove any potential locale prefix from the slug
  const cleanSlug = params.slug.split('/').pop() || params.slug;

  try {
    const { meta, content } = await getBlogPost(params.locale, cleanSlug);

    return (
      <article className='container mx-auto px-6 py-16'>
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
        <div className='my-8'>
          <h1 className='mb-2 font-serif text-4xl'>{meta.title}</h1>
          <Link
            className='mr-2 rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground'
            href={`/blog?category=${normalizeCategory(meta.category)}`}
          >
            {translateCategory(meta.category, params.locale)}
          </Link>
          <span className='rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground'>
            {meta.date}
          </span>
        </div>
        <p className='mb-4'>{meta.excerpt}</p>

        <div className='space-y-6 text-base leading-relaxed text-muted-foreground'>
          {content}
        </div>

        <BlogFooter />
      </article>
    );
  } catch (error) {
    console.error('Blog post error:', error);
    notFound();
  }
}
