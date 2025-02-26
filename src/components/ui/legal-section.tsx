import React from 'react';

interface LegalSectionProps {
  title: string;
  content: string[];
}

const LegalSection: React.FC<LegalSectionProps> = ({ title, content }) => {
  return (
    <div className='mb-8'>
      <h2 className='mb-4 text-xl font-semibold'>{title}</h2>
      <div className='space-y-2'>
        {content.map((paragraph, index) => (
          <p key={index} className='text-muted-foreground'>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default LegalSection;
