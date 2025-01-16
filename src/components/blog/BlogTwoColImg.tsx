import ClientImageWrapper from '../client-image-wrapper';

interface BlogTwoColImgProps {
  images: {
    left: {
      src: string;
      alt: string;
    };
    right: {
      src: string;
      alt: string;
    };
  };
}

export default function BlogTwoColImg({ images }: BlogTwoColImgProps) {
  return (
    <div className='my-8 grid grid-cols-1 gap-4 md:grid-cols-2'>
      {/* Left image - 1 column */}
      <div className='relative h-[800px] overflow-hidden'>
        <ClientImageWrapper
          src={images.left.src}
          alt={images.left.alt}
          className='absolute inset-0 h-full w-full object-cover'
        />
      </div>
      {/* Right image - 1 column */}
      <div className='relative h-[800px] overflow-hidden'>
        <ClientImageWrapper
          src={images.right.src}
          alt={images.right.alt}
          className='absolute inset-0 h-full w-full object-cover'
        />
      </div>
    </div>
  );
}
