'use client';

import React from 'react';
import FadeInImage from './fade-in-image';

interface ClientImageWrapperProps {
  src: string;
  alt: string;
  className?: string;
}

const ClientImageWrapper: React.FC<ClientImageWrapperProps> = ({
  src,
  alt,
  className
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <FadeInImage
      src={src}
      alt={alt}
      className={className}
      onImageLoad={() => setIsLoaded(true)}
    />
  );
};

export default ClientImageWrapper;
