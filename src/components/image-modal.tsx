'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

interface ImageModalProps {
  selectedImage: { src: string; alt: string } | null;
  onClose: () => void;
}

const ImageModal = ({
  selectedImage,
  onClose
}: ImageModalProps): JSX.Element | null => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  if (!selectedImage || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className='fixed inset-0 z-50 flex items-center justify-center bg-black/80'
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='relative h-screen w-screen p-4'
          onClick={e => e.stopPropagation()}
        >
          <div className='relative h-full w-full'>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className='h-full w-full object-contain opacity-0 transition-opacity duration-300 data-[loaded=true]:opacity-100'
              data-loaded={loadedImages.has(selectedImage.src)}
              onLoad={() => {
                setLoadedImages(prev => new Set(prev).add(selectedImage.src));
              }}
              priority
            />
          </div>
          <button
            onClick={onClose}
            className='absolute right-6 top-6 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70'
            aria-label='Close modal'
          >
            <X className='h-6 w-6' />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default ImageModal;
