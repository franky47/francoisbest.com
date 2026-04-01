import configureMdx from '@next/mdx'
import type { NextConfig } from 'next'
import { fromHtml } from 'hast-util-from-html'
import configureBundleAnalyzer from 'next-bundle-analyzer'
import fs from 'node:fs'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import remarkMdxImages from 'remark-mdx-images'
import remarkParse from 'remark-parse'
import remarkSmartypants from 'remark-smartypants'
import { unified } from 'unified'

const nextConfig: NextConfig = {
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

const codeHighlightingOptions: PrettyCodeOptions = {
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
    // @ts-expect-error - hast types don't expose children array
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
  const headerNode = mdxParser.parse(
    '<MdxPageHeader file={import.meta.url} />'
  )
  const footerNode = mdxParser.parse(
    '<MdxPageFooter file={import.meta.url} />'
  )
  return function injectPageHeaderAndFooter(
    tree: { children: unknown[] }
  ) {
    tree.children.unshift(headerNode)
    tree.children.push(footerNode)
  }
}
