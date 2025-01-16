export type Category = 'wedding' | 'article';

export const translateCategory = (
  category: string | undefined,
  locale: string
): string => {
  if (!category) return '';

  const normalizedCategory = category.toLowerCase();

  if (normalizedCategory === 'wedding') {
    return locale === 'fr' ? 'Mariage' : 'Wedding';
  }

  if (normalizedCategory === 'article') {
    return 'Article'; // Same in both languages
  }

  return category; // Return original if not found
};

export const normalizeCategory = (category: string | undefined): Category => {
  if (!category) return 'wedding';

  const normalized = category.toLowerCase();
  return normalized === 'mariage' ? 'wedding' : (normalized as Category);
};
