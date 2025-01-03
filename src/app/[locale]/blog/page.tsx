'use client';
import React from 'react';
import GridBlog from '@/src/components/grid-blog';
import { Button } from '@/src/components/ui/button';
import { Link } from '@/src/navigation';
import { blogPosts } from '@/src/data/blog-posts';
import FadeInImage from '@/src/components/fade-in-image';
import { useTranslations } from 'next-intl';

const BlogPage: React.FC = () => {
  const t = useTranslations('blog-page');

  // Use all blog posts without filtering
  const allBlogPosts = blogPosts;

  const [loadedImages, setLoadedImages] = React.useState<{
    [key: string]: boolean;
  }>({});

  return (
    <div className='relative w-screen'>
      <div className='relative h-[70vh] w-full'>
        <FadeInImage
          src='/blog-page/blog-jeremydan-wedding-photography-001-optimized.webp'
          alt='Hero image for blog'
          onImageLoad={path =>
            setLoadedImages(prev => ({ ...prev, [path]: true }))
          }
          className='h-[70vh] w-full object-cover object-center'
        />
        <div className='absolute inset-0 flex items-center justify-center bg-black/30'>
          <h1 className='font-serif text-4xl text-white md:text-5xl'>
            {t('hero-title')}
          </h1>
        </div>
      </div>
      <div className='mx-auto max-w-7xl'>
        <div className='my-16 flex flex-col justify-center px-8 text-center md:w-1/2 md:max-w-lg md:text-left'>
          <h2 className='mb-8 font-serif text-3xl'>{t('title')}</h2>
          <p className='mb-8 text-muted-foreground'>{t('description')}</p>
          <div className='default'>
            <Button>
              <Link href='/contact'>{t('button-label')}</Link>
            </Button>
          </div>
        </div>

        {/* Blog Posts */}
        <div className='mx-auto my-16 px-8'>
          <GridBlog blogPosts={allBlogPosts} />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
