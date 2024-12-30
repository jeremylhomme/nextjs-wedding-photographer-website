import React from 'react';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/ui/button';
import { useRouter } from '@/src/navigation';

interface FloatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  icon?: React.ReactNode;
  text?: string;
  className?: string;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  href,
  text,
  icon,
  className,
  ...props
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <div className='fixed bottom-20 left-0 right-0 z-50 flex justify-center sm:left-14 sm:justify-start sm:px-4'>
      <Button variant='outline' onClick={handleClick} {...props}>
        {icon}
        {text && <span className='text-sm font-medium'>{text}</span>}
      </Button>
    </div>
  );
};

export default FloatingButton;
