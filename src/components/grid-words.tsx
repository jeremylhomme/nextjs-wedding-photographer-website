'use client';
import React from 'react';

interface WordsGridProps {
  label: string;
  sections: {
    left: string[];
    center: string[];
    right: string[];
  };
  description: string;
}

const WordsGrid: React.FC<WordsGridProps> = ({
  label,
  sections,
  description
}) => {
  return (
    <section className='container mx-auto px-6 text-center md:px-12'>
      {/* Top Label */}
      <h3 className='mb-6 text-sm uppercase tracking-widest text-muted-foreground'>
        {label}
      </h3>

      {/* Words Grid */}
      <div className='grid grid-cols-1 gap-y-6 md:grid-cols-3 md:gap-0'>
        {/* Left Column */}
        <div className='flex flex-col justify-between text-left md:text-right'>
          {sections.left.map((text, index) => (
            <p key={index} className='text-xs text-muted-foreground md:text-sm'>
              {text}
            </p>
          ))}
        </div>

        {/* Center Column */}
        <div className='flex flex-col items-center gap-y-6'>
          {sections.center.map((text, index) => (
            <h1
              key={index}
              className='font-serif text-5xl leading-tight md:text-6xl'
            >
              {text}
            </h1>
          ))}
        </div>

        {/* Right Column */}
        <div className='flex flex-col justify-between text-left md:text-left'>
          {sections.right.map((text, index) => (
            <p key={index} className='text-xs text-muted-foreground md:text-sm'>
              {text}
            </p>
          ))}
        </div>
      </div>

      {/* Bottom Text */}
      <p className='mx-auto mt-12 max-w-3xl text-sm text-muted-foreground md:text-base'>
        {description}
      </p>
    </section>
  );
};

export default WordsGrid;
