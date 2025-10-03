/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://verbigo.in',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 1.0,
  sitemapSize: 7000,
  trailingSlash: true,
  additionalPaths: async (config) => [
    { loc: '/', changefreq: 'daily', priority: 1.0, lastmod: new Date().toISOString() }
  ],
   transform: async (config, path) => {
    // Return null to exclude a path
    if (path.match(/api/)) {
      return null;
    }

    // Use default transformation for all other paths
    return {
      loc: path, 
      changefreq: config.changefreq,
      priority: path === '/' ? 1.0 : config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  }
};
