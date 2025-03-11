'use client';
import {
  useScroll,
  useTransform,
  motion,
  MotionValue,
  easeOut
} from 'framer-motion';
import { useRef } from 'react';
import FadeInImage from '@/src/components/fade-in-image';
import { cn } from '@/src/lib/utils';

// Helper component for scroll-based fade in
const ScrollFadeImage = ({
  src,
  alt,
  yOffset,
  isFirstThree
}: {
  src: string;
  alt: string;
  yOffset: MotionValue<number>;
  isFirstThree: boolean;
}) => {
  const elementRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ['start end', 'end start']
  });

  // More fluid fade effect with easing
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    isFirstThree ? [1, 1, 1] : [0, 0.5, 1],
    {
      ease: easeOut
    }
  );

  return (
    <motion.div
      ref={elementRef}
      style={{
        y: yOffset,
        opacity,
        transition: 'opacity 0.6s ease-out'
      }}
      className='relative overflow-hidden'
    >
      <FadeInImage
        src={src}
        className='aspect-[2/3] w-full object-cover'
        alt={alt}
      />
    </motion.div>
  );
};

export const ParallaxScrollSecond = ({
  images,
  className,
  translationPrefix = 'location-page.photography-sceaux.parallax-scroll'
}: {
  images: Array<{ src: string; alt: string }>;
  className?: string;
  translationPrefix?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Create transforms for each column directly
  const columnOneTransform = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const columnTwoTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [-30 + 50, 30 + 50]
  );

  const columnThreeTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [-30 + 100, 30 + 100]
  );

  // Function to distribute images based on number of columns
  const distributeImages = (
    images: Array<{ src: string; alt: string }>,
    numColumns: number
  ) => {
    const columns: Array<Array<{ src: string; alt: string }>> = Array.from(
      { length: numColumns },
      () => []
    );
    images.forEach((image, index) => {
      columns[index % numColumns].push(image);
    });
    return columns;
  };

  return (
    <div
      className={cn('relative mx-auto w-full', className)}
      ref={containerRef}
    >
      <div className='mx-auto grid grid-cols-2 items-start gap-2 overflow-hidden lg:grid-cols-3'>
        {/* For large screens (3 columns) */}
        <div className='hidden lg:contents'>
          {distributeImages(images, 3).map((columnImages, idx) => (
            <div key={`grid-lg-${idx + 1}`} className='grid gap-2'>
              {columnImages.map(el => (
                <ScrollFadeImage
                  key={`grid-lg-${idx}-${columnImages.indexOf(el)}`}
                  src={el.src}
                  alt={el.alt}
                  yOffset={
                    idx === 0
                      ? columnOneTransform
                      : idx === 1
                        ? columnTwoTransform
                        : columnThreeTransform
                  }
                  isFirstThree={columnImages.indexOf(el) === 0}
                />
              ))}
            </div>
          ))}
        </div>

        {/* For medium screens (2 columns) */}
        <div className='contents lg:hidden'>
          {distributeImages(images, 2).map((columnImages, idx) => (
            <div key={`grid-md-${idx + 1}`} className='grid gap-2'>
              {columnImages.map(el => (
                <ScrollFadeImage
                  key={`grid-md-${idx}-${columnImages.indexOf(el)}`}
                  src={el.src}
                  alt={el.alt}
                  yOffset={idx === 0 ? columnOneTransform : columnTwoTransform}
                  isFirstThree={columnImages.indexOf(el) === 0}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
