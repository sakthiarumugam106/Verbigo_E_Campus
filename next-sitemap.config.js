/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://verbigo.in',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7, // default priority for other pages
  sitemapSize: 7000,
  trailingSlash: true,
  additionalPaths: async (config) => [
    {
      loc: '/',
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date().toISOString()
    }
  ],
  transform: async (config, path) => {
    if (path.match(/api/)) {
      return null; // exclude API routes
    }

    return {
      loc: path,
      changefreq: path === '/' ? 'daily' : config.changefreq,
      priority: path === '/' ? 1.0 : config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    };
  }
};
