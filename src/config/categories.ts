export type CategoryType = 'wedding' | 'corporate' | 'event' | 'lifestyle';

const categoryUrls = {
  wedding: {
    en: 'wedding',
    fr: 'mariage'
  },
  corporate: {
    en: 'corporate',
    fr: 'entreprise'
  },
  event: {
    en: 'event',
    fr: 'evenementiel'
  },
  lifestyle: {
    en: 'lifestyle',
    fr: 'lifestyle'
  }
} as const;

export const categories: CategoryType[] = [
  'wedding',
  'corporate',
  'event',
  'lifestyle'
];

export const getLocalizedCategory = (
  category: CategoryType,
  locale: string
): string => {
  return categoryUrls[category][
    locale as keyof (typeof categoryUrls)[CategoryType]
  ];
};

export const getCategoryFromLocalized = (
  localizedCategory: string,
  locale: string
): CategoryType | null => {
  for (const [category, urls] of Object.entries(categoryUrls)) {
    if (urls[locale as keyof typeof urls] === localizedCategory) {
      return category as CategoryType;
    }
  }
  return null;
};
