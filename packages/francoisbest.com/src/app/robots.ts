import type { MetadataRoute } from 'next'
import { url } from 'lib/paths'

const isPreviewDeployment = process.env.VERCEL_ENV !== 'production'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        ...(isPreviewDeployment
          ? { disallow: '/' }
          : { allow: '/' })
      },
      {
        userAgent: 'CCBot',
        disallow: '/'
      },
      {
        userAgent: 'GPTBot',
        disallow: '/'
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/'
      }
    ],
    sitemap: url('/sitemap.xml')
  }
}
