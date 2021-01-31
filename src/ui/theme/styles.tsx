import type { Styles } from '@chakra-ui/theme-tools'
import { Global } from '@emotion/react'

export const FontsGlobal = () => (
  <Global
    styles={`
  @font-face {
    font-family: 'Virgil';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/FG_Virgil.woff2') format('woff2'),
        url('/fonts/FG_Virgil.woff') format('woff');
  }
  @font-face {
    font-family: 'Cascadia';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/Cascadia.woff2') format('woff2'),
        url('/fonts/Cascadia.woff') format('woff');
  }
`}
  />
)

export const styles: Styles = {
  global: ({ colorMode }) => ({
    html: {
      lineHeight: 1.5,
      minWidth: '320px',
      scrollBehavior: 'smooth',
      fontSmooth: 'auto',
      '-moz-osx-font-smoothing': 'auto'
    },
    'html, body': {
      bg: colorMode === 'light' ? 'white' : 'gray.1000',
      color: colorMode === 'light' ? 'gray.800' : 'gray.400'
    },
    '*': {
      borderColor: colorMode === 'light' ? 'gray.400' : 'gray.700'
    },
    '::placeholder': {
      color: colorMode === 'light' ? 'gray.500' : 'gray.500'
    },
    mark: {
      background: 'none',
      color: 'inherit'
    },
    del: {
      textDecoration: 'none'
    },
    '.darkModeInvertLuminosity': {
      filter: colorMode === 'dark' ? 'invert(93%) hue-rotate(180deg)' : 'none'
    },
    'a.highlighted-link': {
      transition: 'all 0.15s ease-out',
      outline: 'none',
      color:
        colorMode === 'dark'
          ? 'var(--colors-accent-300)'
          : 'var(--colors-accent-500)',
      '&:hover': {
        textDecoration: 'underline'
      },
      '&:focus': {
        boxShadow: 'outline'
      }
    },
    '::selection': {
      bg:
        colorMode === 'dark'
          ? 'var(--colors-accent-700)'
          : 'var(--colors-accent-200)'
    },
    'ul, ol': {
      mb: 8 // '2rem'
    },
    'li > ul, li > ol': {
      mb: 0
    }
  })
}
