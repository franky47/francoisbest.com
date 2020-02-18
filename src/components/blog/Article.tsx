import React from 'react'
import readingTime from 'reading-time'
import { NextSeo } from 'next-seo'
import { Box, ThemeProvider } from '@chakra-ui/core'
import { ArticleMeta } from './types'
import ArticleHeader from './Header'
import Mdx from './Mdx'
import blogTheme from './theme'
import ArticleFooter from './Footer'
import Nav from '../Nav'

export interface ArticleProps {
  meta: ArticleMeta
}

const useReadingTime = () => {
  const ref = React.useRef<HTMLElement>()
  const [time, setTime] = React.useState(null)
  React.useEffect(() => {
    setTime(readingTime(ref.current.innerHTML).text)
  }, [])

  return {
    ref,
    readingTime: time
  }
}

// --

const Article: React.SFC<ArticleProps> = ({ meta, children, ...props }) => {
  const { ref, readingTime } = useReadingTime()
  return (
    <>
      <NextSeo
        title={meta.title}
        description={meta.summary}
        additionalMetaTags={[
          { property: 'author', content: 'François Best' },
          meta.tags?.length > 0 && {
            property: 'keywords',
            content: meta.tags.join(',')
          }
        ].filter(Boolean)}
        twitter={{
          cardType: 'summary',
          handle: 'fortysevenfx',
          site: 'fortysevenfx'
        }}
        openGraph={{
          type: 'article',
          title: meta.title,
          description: meta.summary,
          article: {
            publishedTime: meta.publicationDate,
            authors: ['https://francoisbest.com'],
            tags: meta.tags
          }
        }}
      />
      <Nav />
      <Box as="article" maxW="2xl" mx="auto" px={[3, 3, 1]} mt={12}>
        <ArticleHeader meta={meta} readingTime={readingTime} mb={12} />
        <ThemeProvider theme={blogTheme}>
          <Box as="main" ref={ref} maxW="xl" mx="auto" fontSize="lg">
            <Mdx>{children}</Mdx>
          </Box>
        </ThemeProvider>
        <ArticleFooter meta={meta} maxW="xl" mx="auto" mb={12} />
      </Box>
    </>
  )
}

export default Article
