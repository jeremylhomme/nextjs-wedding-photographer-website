/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://jeremydan.fr',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*', '/fr/api/*', '/en/api/*'],
  alternateRefs: [
    {
      href: process.env.SITE_URL || 'https://jeremydan.fr',
      hreflang: 'fr'
    },
    {
      href: (process.env.SITE_URL || 'https://jeremydan.fr') + '/en',
      hreflang: 'en'
    }
  ],
  additionalPaths: async (config) => {
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

    return paths.map((path) => {
      const priority = {
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

      return {
        loc: path.loc,
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
}
