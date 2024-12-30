'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { SquareX } from 'lucide-react';
import { Link } from '@/src/navigation';
import { LanguageSwitcher } from '@/src/components/language-switcher';

interface ModalProps {
  triggerClassName?: string;
  contentClassName?: string;
  links: Array<{ text: string; href: string }>;
}

const Modal: React.FC<ModalProps> = ({
  triggerClassName,
  contentClassName,
  links
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const getLinkClassName = (href: string) => {
    return `transition-colors hover:text-secondary ${
      pathname === href ? 'text-secondary' : ''
    }`;
  };

  return (
    <>
      <button className={triggerClassName} onClick={toggleModal}>
        <Menu />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 ${contentClassName}`}
            onClick={toggleModal}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <h2 className='mb-6 border-b pb-4 text-center text-2xl font-semibold text-white'>
                Menu
              </h2>
              <nav>
                <ul className='flex flex-col items-center space-y-4 text-sm text-white'>
                  {links.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className={getLinkClassName(link.href)}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                  <LanguageSwitcher pathname={pathname} />
                </ul>
              </nav>
              <button
                className='mx-auto flex pt-6 text-white'
                onClick={toggleModal}
              >
                <SquareX />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
