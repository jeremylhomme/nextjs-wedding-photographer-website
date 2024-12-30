// Import types from the central type definition file
import { BlogPost } from '@/src/services/blog-service';
import { getImageDimensions } from '@/src/components/fade-in-image';

// Blog posts data
export const blogPosts: BlogPost[] = [
  {
    slug: 'wedding-domaine-gillardiere',
    titleKey: 'blog-posts.wedding-domaine-gillardiere.title',
    dateKey: 'blog-posts.wedding-domaine-gillardiere.date',
    categoryKey: 'blog-posts.wedding-domaine-gillardiere.category',
    gridImage: {
      src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-006-ptrait-optimized.webp',
      ...getImageDimensions(
        '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-006-ptrait-optimized.webp'
      ),
      altKey: 'blog-posts.wedding-domaine-gillardiere.gridImage.alt'
    },
    coverImage: {
      src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-017-lscape-optimized.webp',
      ...getImageDimensions(
        '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-017-lscape-optimized.webp'
      ),
      altKey: 'blog-posts.wedding-domaine-gillardiere.coverImage.alt'
    },
    images: [
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-001-lscape-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-001-lscape-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt1'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-002-lscape-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-002-lscape-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt2'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-003-lscape-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-003-lscape-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt3'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-004-lscape-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-004-lscape-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt4'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-005-lscape-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-005-lscape-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt5'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-006-ptrait-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-006-ptrait-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt6'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-007-lscape-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-007-lscape-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt7'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-008-ptrait-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-008-ptrait-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt8'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-009-ptrait-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-009-ptrait-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt9'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-010-ptrait-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-010-ptrait-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt10'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-011-ptrait-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-011-ptrait-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt11'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-012-ptrait-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-012-ptrait-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt12'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-013-lscape-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-013-lscape-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt13'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-014-lscape-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-014-lscape-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt14'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-015-ptrait-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-015-ptrait-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt15'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-016-ptrait-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-016-ptrait-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt16'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-017-lscape-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-017-lscape-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt17'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-018-lscape-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-018-lscape-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt18'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-019-ptrait-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-019-ptrait-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt19'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-020-ptrait-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-020-ptrait-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt20'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-021-ptrait-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-021-ptrait-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt21'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-022-ptrait-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-022-ptrait-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt22'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-023-ptrait-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-023-ptrait-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt23'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-024-ptrait-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-024-ptrait-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt24'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-025-lscape-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-025-lscape-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt25'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-026-lscape-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-026-lscape-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt26'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-027-lscape-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-027-lscape-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt27'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-028-lscape-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-028-lscape-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt28'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-029-ptrait-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-029-ptrait-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt29'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-030-ptrait-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-030-ptrait-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt30'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-031-ptrait-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-031-ptrait-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt31'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-032-ptrait-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-032-ptrait-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt32'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-033-ptrait-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-033-ptrait-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt33'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-034-ptrait-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-034-ptrait-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt34'
      },
      {
        src: '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-035-ptrait-optimized.webp',
        ...getImageDimensions(
          '/blog-posts/wedding-domaine-gillardiere/blog-jeremydan-wedding-photography-domaine-gillardiere-035-ptrait-optimized.webp'
        ),
        altKey: 'wedding-domaine-gillardiere.images.alt35'
      }
    ],
    featured: true
  }
];

// Blog service functions
export function getBlogPosts({
  limit,
  excludeSlugs
}: { limit?: number; excludeSlugs?: string[] } = {}) {
  let posts = [...blogPosts];

  // Exclude specific posts if needed
  if (excludeSlugs?.length) {
    posts = posts.filter(post => !excludeSlugs.includes(post.slug));
  }

  // Limit number of posts if specified
  if (limit) {
    posts = posts.slice(0, limit);
  }

  return posts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}
