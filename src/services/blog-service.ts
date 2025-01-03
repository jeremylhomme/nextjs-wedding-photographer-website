import { blogPosts } from '@/src/data/blog-posts';

export interface BlogImage {
  src: string;
  altKey: string;
}

export interface BlogPost {
  slug: string;
  titleKey: string;
  descriptionKey: string;
  excerptKey: string;
  dateKey: string;
  categoryKey: string;
  gridImage: BlogImage;
  coverImage: BlogImage;
  images: BlogImage[];
  featured?: boolean;
}

export interface BlogCategory {
  nameKey: string;
  slug: string;
  count: number;
}

export function getBlogPosts({
  limit,
  categoryKey,
  featured,
  excludeSlugs = []
}: {
  limit?: number;
  categoryKey?: string;
  featured?: boolean;
  excludeSlugs?: string[];
} = {}) {
  let filteredPosts = [...blogPosts];

  if (categoryKey) {
    filteredPosts = filteredPosts.filter(
      post => post.categoryKey === categoryKey
    );
  }

  if (featured !== undefined) {
    filteredPosts = filteredPosts.filter(post => post.featured === featured);
  }

  if (excludeSlugs.length > 0) {
    filteredPosts = filteredPosts.filter(
      post => !excludeSlugs.includes(post.slug)
    );
  }

  if (limit) {
    filteredPosts = filteredPosts.slice(0, limit);
  }

  return filteredPosts;
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogCategories(): BlogCategory[] {
  const categories = new Map<string, BlogCategory>();

  blogPosts.forEach(post => {
    const existing = categories.get(post.categoryKey);
    if (existing) {
      existing.count++;
    } else {
      categories.set(post.categoryKey, {
        nameKey: post.categoryKey,
        slug: post.categoryKey.toLowerCase(),
        count: 1
      });
    }
  });

  return Array.from(categories.values());
}
