'use client';
import React from 'react';
import { Link } from '@/src/navigation';
import { motion } from 'framer-motion';
import styles from './grid-blog.module.css';
import { Skeleton } from '@/src/components/ui/skeleton';
import { cn } from '@/src/lib/utils';
import FadeInImage from '@/src/components/fade-in-image';
import { useTranslations } from 'next-intl';

import { BlogPost } from '@/src/services/blog-service';

interface GridBlogProps {
  blogPosts: BlogPost[];
}

const GridBlog: React.FC<GridBlogProps> = ({ blogPosts }) => {
  const t = useTranslations();
  const [loadedImages, setLoadedImages] = React.useState<
    Record<string, boolean>
  >({});

  return (
    <div className={styles.grid}>
      {blogPosts.map((post, index) => (
        <Link href={`/blog/${post.slug}`} key={post.slug}>
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
              {!loadedImages[post.coverImage.src] && (
                <Skeleton className='absolute inset-0 h-full w-full' />
              )}
              <FadeInImage
                src={post.gridImage.src}
                alt={t(post.gridImage.altKey)}
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
                  {t(post.categoryKey)}
                </h3>
                <p className='mt-2 font-serif text-xl font-bold text-primary-foreground'>
                  {t(post.titleKey)}
                </p>
                <p className='mt-2 text-xs text-popover'>{t(post.dateKey)}</p>
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default GridBlog;
