/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://jeremydan.fr',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
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
  transform: async (config, path) => {
    // Custom priority for specific pages
    const priorities = {
      '/': 1.0,
      '/fr': 1.0,
      '/portfolio': 0.9,
      '/blog': 0.8,
      '/contact': 0.8,
      '/about': 0.7
    }

    return {
      loc: path,
      changefreq: path.includes('blog') ? 'weekly' : config.changefreq,
      priority: priorities[path] || config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? []
    }
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api', '/_next', '/static']
      }
    ]
  }
}
