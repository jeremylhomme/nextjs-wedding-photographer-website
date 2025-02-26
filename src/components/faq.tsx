'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'wedding' | 'event' | 'company' | 'lifestyle';
}

type Category = 'all' | FAQItem['category'];

interface FAQProps {
  categories?: FAQItem['category'][];
}

export default function FAQ({ categories }: FAQProps = {}) {
  const t = useTranslations('faq-section');
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [visibleItems, setVisibleItems] = useState<number>(4);

  const faqs: FAQItem[] = [
    {
      question: t('wd.types'),
      answer: t('wd.types-answer'),
      category: 'wedding'
    },
    {
      question: t('wd.rates'),
      answer: t('wd.rates-answer'),
      category: 'wedding'
    },
    {
      question: t('wd.defrayal'),
      answer: t('wd.defrayal-answer'),
      category: 'wedding'
    },
    {
      question: t('wd.included-services'),
      answer: t('wd.included-services-answer'),
      category: 'wedding'
    },
    {
      question: t('wd.additional-services'),
      answer: t('wd.additional-services-answer'),
      category: 'wedding'
    },
    {
      question: t('wd.photos-number'),
      answer: t('wd.photos-number-answer'),
      category: 'wedding'
    },
    {
      question: t('wd.when-to-book'),
      answer: t('wd.when-to-book-answer'),
      category: 'wedding'
    },
    {
      question: t('cp.types'),
      answer: t('cp.types-answer'),
      category: 'company'
    },
    {
      question: t('cp.delivery-times'),
      answer: t('cp.delivery-times-answer'),
      category: 'company'
    },
    {
      question: t('cp.behavior'),
      answer: t('cp.behavior-answer'),
      category: 'company'
    },
    {
      question: t('cp.itw'),
      answer: t('cp.itw-answer'),
      category: 'company'
    },
    {
      question: t('cp.size'),
      answer: t('cp.size-answer'),
      category: 'company'
    },
    {
      question: t('gn.payments'),
      answer: t('gn.payments-answer'),
      category: 'general'
    },
    {
      question: t('gn.registered'),
      answer: t('gn.registered-answer'),
      category: 'general'
    },
    {
      question: t('gn.book'),
      answer: t('gn.book-answer'),
      category: 'general'
    },
    {
      question: t('gn.steps'),
      answer: t('gn.steps-answer'),
      category: 'general'
    },
    {
      question: t('gn.gift-cards'),
      answer: t('gn.gift-cards-answer'),
      category: 'general'
    },
    {
      question: t('ls.types'),
      answer: t('ls.types-answer'),
      category: 'lifestyle'
    },
    {
      question: t('ls.where'),
      answer: t('ls.where-answer'),
      category: 'lifestyle'
    },
    {
      question: t('ls.how'),
      answer: t('ls.how-answer'),
      category: 'lifestyle'
    },
    {
      question: t('ls.clothes'),
      answer: t('ls.clothes-answer'),
      category: 'lifestyle'
    },
    {
      question: t('ev.types'),
      answer: t('ev.types-answer'),
      category: 'event'
    },
    {
      question: t('ev.how'),
      answer: t('ev.how-answer'),
      category: 'event'
    },
    {
      question: t('ev.bachelor-party'),
      answer: t('ev.bachelor-party-answer'),
      category: 'event'
    },
    {
      question: t('ev.delivery-times'),
      answer: t('ev.delivery-times-answer'),
      category: 'event'
    }
  ];

  // Determine which categories to show in the filter buttons
  const defaultCategories: FAQItem['category'][] = [
    'general',
    'wedding',
    'company',
    'lifestyle',
    'event'
  ];
  const availableCategories =
    categories && categories.length > 0 ? categories : defaultCategories;

  const categoryOptions: Category[] = [
    'all',
    ...(availableCategories as FAQItem['category'][])
  ];

  // Filter FAQs based on selected categories and active category
  const filteredFaqs = faqs.filter(faq => {
    if (categories && categories.length > 0) {
      return (
        categories.includes(faq.category) &&
        (activeCategory === 'all' || faq.category === activeCategory)
      );
    }
    return activeCategory === 'all' || faq.category === activeCategory;
  });

  const displayedFaqs = filteredFaqs.slice(0, visibleItems);
  const hasMoreItems = visibleItems < filteredFaqs.length;

  const handleSeeMore = () => {
    setVisibleItems(prev => Math.min(prev + 2, filteredFaqs.length));
  };

  const handleSeeLess = () => {
    setVisibleItems(prev => Math.max(2, prev - 2));
  };

  return (
    <section className='w-full'>
      <div className='container mx-auto'>
        <div className='mb-8 flex flex-wrap justify-center gap-2'>
          {categoryOptions.map(category => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setVisibleItems(4);
              }}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'border text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
              }`}
            >
              {t(`categories.${category}`)}
            </button>
          ))}
        </div>

        <div className='mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8'>
          {displayedFaqs.map((faq, index) => (
            <div key={index} className='rounded-lg p-6'>
              <h3 className='mb-3 text-base font-semibold'>{faq.question}</h3>
              <p className='text-base text-muted-foreground'>{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className='mt-8 flex justify-center gap-4'>
          {hasMoreItems && (
            <button
              onClick={handleSeeMore}
              className='rounded-full border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground'
            >
              {t('see-more')}
            </button>
          )}
          {visibleItems > 4 && (
            <button
              onClick={handleSeeLess}
              className='rounded-full border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground'
            >
              {t('see-less')}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
