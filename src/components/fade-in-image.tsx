'use client';

import React from 'react';
import { Skeleton } from '@/src/components/ui/skeleton';

interface FadeInImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  onImageLoad?: (src: string) => void;
}

export const FadeInImage: React.FC<FadeInImageProps> = ({
  src,
  alt,
  className,
  priority,
  onImageLoad
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  const handleLoad = () => {
    setLoaded(true);
    onImageLoad?.(src);
  };

  // Check if image is already cached
  React.useEffect(() => {
    if (imgRef.current?.complete) {
      handleLoad();
    }
  }, [src]);

  // Preload high priority images
  React.useEffect(() => {
    if (priority) {
      const img = new Image();
      img.src = src;
    }
  }, [priority, src]);

  return (
    <div className='relative h-full w-full'>
      {!loaded && <Skeleton className={`h-full w-full ${className ?? ''}`} />}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={handleLoad}
        className={`${
          loaded ? 'opacity-100' : 'opacity-0'
        } absolute left-0 top-0 h-full w-full object-cover transition-opacity duration-300 ${className ?? ''}`}
      />
    </div>
  );
};

export default FadeInImage;
