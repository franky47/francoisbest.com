// @ts-check

import configureMdx from '@next/mdx'
import { fromHtml } from 'hast-util-from-html'
import configureBundleAnalyzer from 'next-bundle-analyzer'
import fs from 'node:fs'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import remarkMdxImages from 'remark-mdx-images'
import remarkParse from 'remark-parse'
import remarkSmartypants from 'remark-smartypants'
import { unified } from 'unified'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
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
      // Inspired by https://atila.io/x (et al)
      {
        source: '/x',
        destination: 'https://x.com/fortysevenfx',
        permanent: true
      },
      {
        source: '/twitter',
        destination: 'https://twitter.com/fortysevenfx',
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
      {
        source: '/keybase',
        destination: 'https://keybase.io/franky47',
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
  },

  webpack(config) {
    // Configures webpack to handle SVG files with SVGR. SVGR optimizes and transforms SVG files
    // into React components. See https://react-svgr.com/docs/next/

    // Grab the existing rule that handles SVG imports
    // @ts-ignore - this is a private property that is not typed
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg')
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/ // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack']
      }
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  }
}

/** @type {import('rehype-pretty-code').Options} */
const codeHighlightingOptions = {
  theme: JSON.parse(
    fs.readFileSync('./src/ui/theme/moonlight-ii.json', 'utf-8')
  ),
  onVisitTitle(element) {
    element.tagName = 'figcaption'
    if (!element.properties) {
      element.properties = {}
    }
    element.properties.style = 'margin-bottom:-1.5rem;font-size:0.85em;'
    element.properties.className = ['font-mono']
    const fileIcon = fromHtml(
      // SVG from FiFileText in 'react-icons/fi'
      `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        stroke="currentColor"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="inline-block -mt-[2px] mr-2"
        aria-label="File name"
        role="presentation"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>`,
      { fragment: true, space: 'svg' }
    )
    // @ts-ignore
    element.children.unshift(fileIcon.children[0])
  },
  onVisitCaption(element) {
    element.tagName = 'figcaption'
    if (!element.properties) {
      element.properties = {}
    }
    element.properties.style = 'margin-top:-1.5rem;text-align:center;'
  }
}

const withAnalyzer = configureBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  clientOnly: true
})

const withMdx = configureMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkMdxImages,
      remarkSmartypants,
      injectPageHeaderAndFooter
    ],
    rehypePlugins: [
      [rehypePrettyCode, codeHighlightingOptions],
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }]
    ]
  }
})

export default withAnalyzer(withMdx(nextConfig))

function injectPageHeaderAndFooter() {
  const mdxParser = unified().use(remarkParse).use(remarkMdx)
  const headerNode = mdxParser.parse('<MdxPageHeader file={import.meta.url} />')
  const footerNode = mdxParser.parse('<MdxPageFooter file={import.meta.url} />')
  return function injectPageHeaderAndFooter(tree) {
    tree.children.unshift(headerNode)
    tree.children.push(footerNode)
  }
}
