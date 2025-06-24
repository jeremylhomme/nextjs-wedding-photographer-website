// Hardcode all values since we can't use imports
const serviceTranslations = {
  photography: {
    fr: 'photographe',
    en: 'photographer'
  }
};

const categoryTranslations = {
  wedding: { fr: 'mariage', en: 'wedding' },
  corporate: { fr: 'entreprise', en: 'corporate' },
  event: { fr: 'evenementiel', en: 'event' },
  lifestyle: { fr: 'lifestyle', en: 'lifestyle' }
};

const locationTranslations = {
  sceaux: { fr: 'sceaux', en: 'sceaux' },
  'hauts-de-seine': { fr: 'hauts-de-seine', en: 'hauts-de-seine' },
  paris: { fr: 'paris', en: 'paris' }
};

const getLocalizedService = (service, locale) =>
  serviceTranslations[service][locale];
const getLocalizedCategory = (category, locale) =>
  categoryTranslations[category][locale];
const getLocalizedLocation = (location, locale) =>
  locationTranslations[location][locale];

const fs = require('fs');
const path = require('path');

const matter = require('gray-matter');

const getBlogPosts = () => {
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  const locales = ['fr', 'en'];
  const posts = [];

  locales.forEach(locale => {
    const localePath = path.join(blogDir, locale);
    if (fs.existsSync(localePath)) {
      const files = fs.readdirSync(localePath);
      files.forEach(file => {
        if (file.endsWith('.mdx')) {
          const fullPath = path.join(localePath, file);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data } = matter(fileContents);
          const slug = file.replace('.mdx', '');
          
          // Convert date from MM/DD/YYYY to ISO format
          const formatDate = (dateStr) => {
            const [month, day, year] = dateStr.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
          };

          posts.push({
            url: `/${locale}/blog/${slug}`,
            lastmod: formatDate(data.lastModified || data.date),
            category: data.category,
          });
        }
      });
    }
  });

  return posts;
};

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr',
  generateRobotsTxt: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*', '/_next/*', '/static/*', '/public/*']
      }
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr'}/sitemap.xml`,
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*', '/fr/api/*', '/en/api/*'],
  transform: async (config, url) => {
    // Get all blog posts with their metadata
    const blogPosts = getBlogPosts();
    const matchingPost = blogPosts.find(post => url.endsWith(post.url));
    
    if (matchingPost) {
      // Wedding posts get highest priority, articles slightly lower
      const priority = matchingPost.category === 'wedding' ? 0.9 : 0.8;
      // Wedding posts are updated less frequently than articles
      const changefreq = matchingPost.category === 'wedding' ? 'monthly' : 'weekly';
      
      return {
        loc: url,
        changefreq,
        priority,
        lastmod: matchingPost.lastmod,
      };
    }

    // Homepage and main sections get high priority
    if (url === config.siteUrl || url.match(/\/(fr|en)$/)) {
      return {
        loc: url,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    // Portfolio and main service pages
    if (url.includes('/portfolio') || url.match(/\/(photographe|photographer)\/(?!(sceaux|hauts-de-seine|paris))/)) {
      return {
        loc: url,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }

    // Location-specific service pages
    if (url.match(/\/(photographe|photographer)\/(sceaux|hauts-de-seine|paris)/)) {
      return {
        loc: url,
        changefreq: 'weekly',
        priority: 0.75,
        lastmod: new Date().toISOString(),
      };
    }

    // Default transformation
    return {
      loc: url,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  alternateRefs: [
    {
      href: process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr',
      hreflang: 'fr'
    },
    {
      href:
        (process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr') + '/en',
      hreflang: 'en'
    }
  ],
  additionalPaths: async config => {
    const paths = [
      { loc: '/' },
      { loc: '/fr' },
      { loc: '/en' },
      { loc: '/fr/about' },
      { loc: '/en/about' },
      { loc: '/fr/portfolio' },
      { loc: '/en/portfolio' },
      { loc: '/fr/blog' },
      { loc: '/en/blog' },
      { loc: '/fr/contact' },
      { loc: '/en/contact' }
    ];

    // Add dynamic routes for each locale
    const locales = ['fr', 'en'];
    for (const locale of locales) {
      const localizedService = getLocalizedService('photography', locale);

      // Add category pages (e.g., /fr/photographe/mariage)
      const categories = ['wedding', 'corporate', 'event', 'lifestyle'];
      for (const category of categories) {
        const localizedCategory = getLocalizedCategory(category, locale);
        paths.push({
          loc: `/${locale}/${localizedService}/${localizedCategory}`
        });
      }

      // Add location pages (e.g., /fr/photographe/sceaux)
      const locations = ['sceaux', 'hauts-de-seine', 'paris'];
      for (const location of locations) {
        const localizedLocation = getLocalizedLocation(location, locale);
        paths.push({
          loc: `/${locale}/${localizedService}/${localizedLocation}`
        });

        // Add category-location pages (e.g., /fr/photographe/mariage/sceaux)
        for (const category of categories) {
          const localizedCategory = getLocalizedCategory(category, locale);
          paths.push({
            loc: `/${locale}/${localizedService}/${localizedCategory}/${localizedLocation}`
          });
        }
      }

      // Add blog post pages dynamically
      const blogPosts = getBlogPosts();
      const localeBlogPosts = blogPosts.filter(post => post.url.startsWith(`/${locale}`));
      for (const post of localeBlogPosts) {
        paths.push({
          loc: post.url
        });
      }
    }

    return paths.map(path => {
      const priority =
        {
          '/': 1.0,
          '/fr': 1.0,
          '/en': 1.0,
          '/fr/portfolio': 0.9,
          '/en/portfolio': 0.9,
          '/fr/blog': 0.8,
          '/en/blog': 0.8,
          '/fr/contact': 0.8,
          '/en/contact': 0.8,
          '/fr/about': 0.7,
          '/en/about': 0.7
        }[path.loc] || config.priority;

      // Set higher priority for dynamic service and location pages
      let dynamicPriority = 0.7; // Default priority

      if (path.loc.includes('/blog/')) {
        dynamicPriority = 0.8;
      } else if (path.loc.match(/\/(photographe|photographer)\//)) {
        if (path.loc.match(/\/(mariage|wedding)\//)) {
          dynamicPriority = 0.9;
        } else {
          dynamicPriority = 0.8;
        }
      }

      return {
        loc: path.loc,
        priority: priority || dynamicPriority,
        changefreq: path.loc.includes('blog') ? 'weekly' : config.changefreq,
        priority,
        lastmod: new Date().toISOString(),
        alternateRefs: config.alternateRefs ?? []
      };
    });
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*', '/_next/*', '/static/*']
      }
    ]
  }
};
