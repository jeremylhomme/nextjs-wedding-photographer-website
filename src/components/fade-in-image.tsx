'use client';

import React from 'react';
import { Skeleton } from '@/src/components/ui/skeleton';
import cn from 'classnames';

interface FadeInImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  onImageLoad?: (src: string) => void;
}

export const FadeInImage: React.FC<FadeInImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority,
  onImageLoad
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const hasCalledOnLoad = React.useRef(false);

  // Handle image load once
  const handleLoad = React.useCallback(() => {
    if (!hasCalledOnLoad.current) {
      setLoaded(true);
      onImageLoad?.(src);
      hasCalledOnLoad.current = true;
    }
  }, [src, onImageLoad]);

  // Reset load state when src changes
  React.useEffect(() => {
    setLoaded(false);
    hasCalledOnLoad.current = false;
  }, [src]);

  // Check if image is already cached
  React.useEffect(() => {
    if (imgRef.current?.complete) {
      handleLoad();
    }
  }, [handleLoad]);

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
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        className={cn(
          'transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0',
          className
        )}
      />
    </div>
  );
};

export default FadeInImage;
