'use client';
import React from 'react';
import { Link } from '@/src/navigation';
import { motion } from 'framer-motion';
import styles from './grid-blog.module.css';
import { cn } from '@/src/lib/utils';
import FadeInImage from '@/src/components/fade-in-image';
import { BlogPost } from '@/src/lib/mdx';
import { translateCategory } from '@/src/lib/categories';
import { useParams } from 'next/navigation';

interface GridBlogProps {
  blogPosts: BlogPost[];
}

const GridBlog: React.FC<GridBlogProps> = ({ blogPosts }) => {
  const [loadedImages, setLoadedImages] = React.useState<
    Record<string, boolean>
  >({});

  const params = useParams();
  const locale = (params?.locale as string) ?? 'fr';

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.grid}>
      {blogPosts.map(post => {
        return (
          <Link key={post.slug} href={`/blog/${post.slug}`} className='group'>
            <motion.div
              className={styles.card}
              whileHover='hover'
              variants={{
                hover: {
                  filter: 'grayscale(0%)'
                }
              }}
            >
              <div className='relative h-full w-full'>
                {!loadedImages[post.gridImage] && (
                  <div className='absolute inset-0 h-full w-full bg-gray-200' />
                )}
                <FadeInImage
                  src={post.gridImage}
                  alt={post.altGridImage}
                  className={cn(
                    styles.image,
                    'opacity-0 transition-opacity duration-300 data-[loaded=true]:opacity-100'
                  )}
                  onImageLoad={path =>
                    setLoadedImages(prev => ({ ...prev, [path]: true }))
                  }
                />
              </div>
              <div className={styles.overlay}>
                <div className='text-center'>
                  <h3 className='text-xs font-semibold text-secondary'>
                    {translateCategory(post.category, locale)}
                  </h3>
                  <p className='mt-2 font-serif text-xl font-bold text-primary-foreground'>
                    {post.title}
                  </p>
                  <p className='mt-2 text-xs text-popover'>
                    {post.category.toLowerCase() === 'wedding' &&
                    post.weddingDate ? (
                      <>
                        <span>{formatDate(post.weddingDate)} </span>
                      </>
                    ) : (
                      formatDate(post.date)
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};

export default GridBlog;
