import nextConfig from './next.config.mjs'

const isPreviewDeployement = process.env.VERCEL_ENV !== 'production'

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: `https://${process.env.VERCEL_URL}`,
  generateIndexSitemap: false,
  autoLastmod: true,
  output: nextConfig.output,
  exclude: ['*.jpg'],
  // Robots
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        // Don't crawl preview deployments
        allow: isPreviewDeployement ? undefined : '/',
        disallow: isPreviewDeployement ? '/' : undefined,
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
    ],
  },
}

export default config
