'use client';
import React from 'react';
import { motion } from 'framer-motion';
import FadeInImage from '@/src/components/fade-in-image';
import ImageModal from '@/src/components/image-modal';

interface Image {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface BlogGalleryProps {
  images: Image[];
}

const BlogGallery: React.FC<BlogGalleryProps> = ({ images }) => {
  const [loadedImages, setLoadedImages] = React.useState<
    Record<string, boolean>
  >({});
  const [selectedImage, setSelectedImage] = React.useState<{
    src: string;
    alt: string;
  } | null>(null);

  return (
    <>
      <div className='mx-auto grid auto-rows-[500px] grid-cols-1 gap-2 py-4 md:grid-cols-2 xl:grid-cols-3'>
        {images.map(image => {
          return (
            <motion.div
              key={image.src}
              onClick={() =>
                setSelectedImage({
                  src: image.src,
                  alt: image.alt
                })
              }
              className='relative cursor-pointer'
            >
              <FadeInImage
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
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
    </>
  );
};

export default BlogGallery;
