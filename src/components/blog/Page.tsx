import React from 'react'
import { Box, ThemeProvider } from '@chakra-ui/core'
import { ArticleMeta } from './types'
import Mdx from './Mdx'
import blogTheme from './theme'
import Head from 'next/head'

export interface ArticleProps {
  meta: ArticleMeta
}

// --

const Article: React.SFC<ArticleProps> = ({ meta, children, ...props }) => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Bitter&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Box as="main" maxW="2xl" mx="auto" px={[3, 3, 1]} mt={12}>
        <ThemeProvider theme={blogTheme}>
          <Mdx>{children}</Mdx>
        </ThemeProvider>
      </Box>
    </>
  )
}

export default Article
