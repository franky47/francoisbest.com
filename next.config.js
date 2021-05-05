const fs = require('fs')
const nodePath = require('path')
const webpack = require('webpack')
const chalk = require('chalk')
const readingTime = require('reading-time')
const checkEnv = require('@47ng/check-env').default
const withPlugins = require('next-compose-plugins')
const withMdxEnhanced = require('next-mdx-enhanced')
const withBundleAnalyzer = require('@next/bundle-analyzer')
const withTranspilation = require('next-transpile-modules')
const withSvgr = require('next-svgr')

checkEnv({
  required: ['NEXT_PUBLIC_DEPLOYMENT_URL']
})

// --

const nextConfig = {
  devIndicators: {
    autoPrerender: false
  }
}

const useURL = path => `${process.env.NEXT_PUBLIC_DEPLOYMENT_URL}${path || ''}`

module.exports = withPlugins(
  [
    withBundleAnalyzer({
      enabled: process.env.ANALYZE === 'true'
    }),
    withTranspilation(['@47ng/chakra-next']),
    withSvgr,
    withMdxEnhanced({
      layoutPath: 'src/layouts',
      defaultLayout: true,
      fileExtensions: ['mdx'],
      remarkPlugins: [
        require('remark-slug'),
        require('remark-footnotes'),
        require('remark-code-titles'),
        require('@fec/remark-a11y-emoji')
      ],
      rehypePlugins: [require('mdx-prism')],
      extendFrontMatter: {
        process: (mdxContent, frontMatter) => {
          const pagesDir = nodePath.resolve(__dirname, 'src/pages')
          // Somehow the __resourcePath does not start with a /:
          const path = ('/' + frontMatter.__resourcePath)
            .replace(pagesDir, '')
            .replace('.mdx', '')
            .replace('.tsx', '')
            .replace(/^\/index$/, '/')
            .replace(/\/index$/, '')
          return {
            path,
            url: useURL(path),
            readingTime: readingTime(mdxContent),
            ogImage: resolveOpenGraphImage(path, frontMatter),
            ...frontMatter
          }
        }
      }
    })
  ],
  nextConfig
)

// --

function resolveOpenGraphImage(path, frontMatter) {
  let ogImagePath = `/images${path}${path.endsWith('/') ? '' : '/'}og.jpg`
  const ogImageFile = nodePath.join(__dirname, 'public', ogImagePath)
  const ogImageFileExists = fs.existsSync(ogImageFile)
  if (!ogImageFileExists) {
    if (path.match(/^\/posts\/(\d{4})\/.+/) && !!frontMatter.publicationDate) {
      if (process.env.NODE_ENV === 'production') {
        throw new Error(`Published article missing OG image: ${path}`)
      } else {
        console.error(
          `${chalk.red('err')}   - ${chalk.red(
            'Published article missing OG image:'
          )} ${path}`
        )
      }
    } else {
      ogImagePath = '/images/og.jpg'
    }
  }
  return ogImageFileExists
    ? {
        url: useURL(ogImagePath),
        width: 1280,
        height: 720
      }
    : undefined
}
