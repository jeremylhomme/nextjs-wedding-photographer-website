'use client';

import React from 'react';
import { Skeleton } from '@/src/components/ui/skeleton';

// Helper function to determine image dimensions based on filename
export function getImageDimensions(src: string): {
  width: number;
  height: number;
} {
  const filename = src.toLowerCase();
  if (filename.includes('lscape')) {
    return { width: 1920, height: 1280 };
  } else if (filename.includes('ptrait')) {
    return { width: 1280, height: 1920 };
  }
  // Default dimensions for other cases
  return { width: 1920, height: 1280 };
}

interface FadeInImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  onImageLoad?: (src: string) => void;
}

export const FadeInImage: React.FC<FadeInImageProps> = ({
  src,
  alt,
  width: providedWidth,
  height: providedHeight,
  className,
  priority,
  onImageLoad
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  // Get dimensions from filename if not provided
  const { width, height } =
    providedWidth && providedHeight
      ? { width: providedWidth, height: providedHeight }
      : getImageDimensions(src);

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
        width={width}
        height={height}
        onLoad={handleLoad}
        className={`${
          loaded ? 'opacity-100' : 'opacity-0'
        } absolute left-0 top-0 h-full w-full transition-opacity duration-300 ${className ?? ''}`}
      />
    </div>
  );
};

export default FadeInImage;
