const fs = require('fs')
const nodePath = require('path')
const webpack = require('webpack')
const chalk = require('chalk').default
const mdxPrism = require('mdx-prism')
const readingTime = require('reading-time')
const checkEnv = require('@47ng/check-env').default
const withPlugins = require('next-compose-plugins')
const withMdxEnhanced = require('next-mdx-enhanced')
const withBundleAnalyzer = require('@next/bundle-analyzer')
const withTranspilation = require('next-transpile-modules')

checkEnv({
  required: ['NEXT_PUBLIC_DEPLOYMENT_URL']
})

// --

const nextConfig = {
  devIndicators: {
    autoPrerender: false
  },
  pageExtensions: ['mdx', 'tsx']
}

const useURL = path => `${process.env.NEXT_PUBLIC_DEPLOYMENT_URL}${path || ''}`

module.exports = withPlugins(
  [
    withBundleAnalyzer({
      enabled: process.env.ANALYZE === 'true'
    }),
    withTranspilation(['@47ng/chakra-next']),
    withMdxEnhanced({
      layoutPath: 'src/layouts',
      defaultLayout: true,
      fileExtensions: ['mdx'],
      remarkPlugins: [require('remark-slug'), require('remark-footnotes')],
      rehypePlugins: [mdxPrism],
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
            ogImage: resolveOpenGraphImage(path, frontMatter)
          }
        }
      }
    })
  ],
  nextConfig
)

// --

function resolveOpenGraphImage(path, frontMatter) {
  let ogImagePath = `/images${path}/og.jpg`
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
      console.warn(
        `${chalk.yellow('warn')}  - Missing OG image: ${chalk.cyanBright(path)}`
      )
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
