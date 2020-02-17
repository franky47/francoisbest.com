import React from 'react'
import App from 'next/app'
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'
import theme from '../ui/theme'
import { Global, css } from '@emotion/core'

import 'source-serif-pro/source-serif-pro.css'

const globalCss = css`
  html {
    font-family: ${theme.fonts['body']};
    line-height: 1.6;
  }
`

const globalConfig = (theme: any) => ({
  light: {
    color: theme.colors.gray[700],
    bg: undefined,
    borderColor: theme.colors.gray[400],
    placeholderColor: theme.colors.gray[600]
  },
  dark: {
    color: theme.colors.gray[400],
    bg: theme.colors.gray[800],
    borderColor: theme.colors.whiteAlpha[300],
    placeholderColor: theme.colors.gray[600]
  }
})

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      // <ColorModeProvider>
      <ThemeProvider theme={theme}>
        <CSSReset config={globalConfig} />
        <Global styles={[globalCss]} />
        <Component {...pageProps} />
      </ThemeProvider>
      // </ColorModeProvider>
    )
  }
}

export default MyApp
