import type { NextConfig } from 'next'
import configureBundleAnalyzer from 'next-bundle-analyzer'
import { createMDX } from 'fumadocs-mdx/next'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx'],
  turbopack: {},
  images: {
    remotePatterns: [
      {
        // Spotify albums & artists
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/image/*'
      },
      {
        // GitHub hosted images
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/47ng/*'
      },
      {
        // GitHub avatars
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/*'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/resume',
        destination: '/francois-best-full-stack-typescript-dev-resume.pdf',
        permanent: false
      },
      {
        source: '/resume.pdf',
        destination: '/francois-best-full-stack-typescript-dev-resume.pdf',
        permanent: false
      },
      {
        source: '/sponsor(s)?',
        destination: 'https://github.com/sponsors/franky47',
        permanent: true
      },
      {
        source: '/bsky',
        destination: 'https://bsky.app/profile/francoisbest.com',
        permanent: true
      },
      {
        source: '/mastodon',
        destination: 'https://mamot.fr/@Franky47',
        permanent: true
      },
      {
        source: '/discord',
        destination: 'https://discord.com/users/francois.best#7881',
        permanent: true
      },
      {
        source: '/github',
        destination: 'https://github.com/franky47',
        permanent: true
      },
      {
        source: '/linkedin',
        destination: 'https://www.linkedin.com/in/francoisbest',
        permanent: true
      },
      // Legacy
      {
        source: '/keybase',
        destination: 'https://keybase.io/franky47',
        permanent: true
      },
      {
        source: '/x',
        destination: 'https://x.com/fortysevenfx',
        permanent: true
      },
      {
        source: '/twitter',
        destination: 'https://twitter.com/fortysevenfx',
        permanent: true
      }
    ]
  },
  async headers() {
    return [
      // For sqlocal / OPFS
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "worker-src 'self';"
          },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' }
        ]
      }
    ]
  }
}

const withAnalyzer = configureBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  clientOnly: true
})

const withMDX = createMDX()

export default withAnalyzer(withMDX(nextConfig))
