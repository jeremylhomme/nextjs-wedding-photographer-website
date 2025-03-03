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

const getLocalizedService = (service, locale) => serviceTranslations[service][locale];
const getLocalizedCategory = (category, locale) => categoryTranslations[category][locale];
const getLocalizedLocation = (location, locale) => locationTranslations[location][locale];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*', '/fr/api/*', '/en/api/*'],
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

      // Add blog post pages - hardcoded for now
      const blogSlugs = [
        'article-engagement-session-why-and-how-to-plan-before-your-wedding',
        'wedding-domaine-gillardiere',
        'wedding-levallois-perret'
      ];
      
      for (const slug of blogSlugs) {
        paths.push({
          loc: `/${locale}/blog/${slug}`
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
          dynamicPriority = 0.9; // Wedding pages get highest priority
        } else {
          dynamicPriority = 0.8; // Other service pages
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
