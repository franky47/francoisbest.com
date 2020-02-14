import React from 'react'
import readingTime from 'reading-time'
import { Box, ThemeProvider } from '@chakra-ui/core'
import { ArticleMeta } from './types'
import ArticleHeader from './Header'
import Mdx from './Mdx'
import blogTheme from './theme'
import Head from 'next/head'
import ArticleFooter from './Footer'

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
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Bitter&display=swap"
          rel="stylesheet"
        />
      </Head>
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
