'use client';

import React, { useState } from 'react';
import ImageModal from '@/src/components/image-modal';
import { getBlogPostBySlug } from '@/src/data/blog-posts';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import FadeInImage from '@/src/components/fade-in-image';
import FloatingButton from '@/src/components/ui/floating-button';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface PostPageProps {
  params: {
    slug: string;
    locale: string;
  };
}

const PostPage = ({ params }: PostPageProps) => {
  if (!params?.slug) {
    notFound();
  }

  const post = getBlogPostBySlug(params.slug);
  const t = useTranslations('blog-posts');

  const [loadedImages, setLoadedImages] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  if (!post) {
    notFound();
  }

  return (
    <div className='container mx-auto p-4 md:p-8'>
      <FloatingButton
        icon={<ArrowLeft size={20} />}
        href='/blog'
        text={t('back')}
      />
      <div className='relative h-[400px] w-full overflow-hidden'>
        <FadeInImage
          src={post.coverImage.src}
          alt={t(`${post.slug}.coverImage.alt`)}
          onImageLoad={path =>
            setLoadedImages(prev => ({ ...prev, [path]: true }))
          }
          className='absolute inset-0 h-full w-full object-cover'
          data-loaded={loadedImages[post.coverImage.src]}
        />
      </div>

      <div className='py-16'>
        <h1 className='font-serif text-4xl'>{t(`${post.slug}.title`)}</h1>
        <div className='mt-4 flex gap-4'>
          <span className='rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground'>
            {t(`${post.slug}.category`)}
          </span>
          <span className='rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground'>
            {t(`${post.slug}.date`)}
          </span>
        </div>
        <p className='pt-4 italic text-muted-foreground'>
          {t(`${post.slug}.excerpt`)}
        </p>
        <p className='pt-4 text-muted-foreground'>
          {t(`${post.slug}.description`)}
        </p>
      </div>

      <div className='mx-auto grid auto-rows-[500px] grid-cols-1 gap-2 pb-4 md:grid-cols-2 xl:grid-cols-3'>
        {post.images.map(image => {
          return (
            <motion.div
              key={image.src}
              onClick={() =>
                setSelectedImage({
                  src: image.src,
                  alt: t(image.altKey)
                })
              }
              className='relative cursor-pointer'
            >
              <FadeInImage
                src={image.src}
                alt={t(image.altKey)}
                onImageLoad={path =>
                  setLoadedImages(prev => ({ ...prev, [path]: true }))
                }
                className='absolute inset-0 h-full w-full object-cover'
                data-loaded={loadedImages[image.src]}
              />
            </motion.div>
          );
        })}
      </div>

      {selectedImage && (
        <ImageModal
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default PostPage;
