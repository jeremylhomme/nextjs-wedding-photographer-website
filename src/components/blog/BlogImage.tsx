import ClientImageWrapper from '../client-image-wrapper';

interface BlogImageProps {
  src: string;
  alt: string;
}

export default function BlogImage({ src, alt }: BlogImageProps) {
  return (
    <div className='relative my-8 h-[600px] w-full overflow-hidden'>
      <ClientImageWrapper
        src={src}
        alt={alt}
        className='absolute inset-0 h-full w-full object-cover'
      />
    </div>
  );
}
