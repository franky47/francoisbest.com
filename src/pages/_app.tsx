import { createChakraNextApp } from '@47ng/chakra-next'
import { DefaultSeo, SocialProfileJsonLd } from 'next-seo'
// @ts-ignore
import { MDXProvider } from '@mdx-js/react'
import { css, Global } from '@emotion/core'
import { mdxComponents } from 'src/components/blog/Mdx'
import { theme } from 'src/ui/theme'
import { useURL } from 'src/hooks/useURL'
import defaultSeoConfig from 'src/next-seo.json'
import { PrismGlobal } from 'src/ui/prism'
import { AccentGlobal } from 'src/components/Accent'
import { useColorMode } from '@chakra-ui/core'

export default createChakraNextApp({
  enableColorMode: 'light',
  theme,
  getGlobalConfig: theme => ({
    light: {
      bg: 'white',
      color: theme.colors.gray[800],
      borderColor: theme.colors.gray[400],
      placeholderColor: theme.colors.gray[500]
    },
    dark: {
      bg: theme.colors.gray[900],
      color: theme.colors.gray[300],
      borderColor: theme.colors.gray[500],
      placeholderColor: theme.colors.gray[600]
    }
  }),
  globalCss: css`
    @font-face {
      font-family: 'Virgil';
      src: url('https://excalidraw.com/FG_Virgil.woff2');
    }
    @font-face {
      font-family: 'Cascadia';
      src: url('https://excalidraw.com/Cascadia.woff2');
    }
    html {
      font-family: ${theme.fonts.body};
      line-height: 1.5;
      scroll-behavior: smooth;
      min-width: 320px;
    }
    mark {
      background: none;
      color: inherit;
    }
    del {
      text-decoration: none;
    }
  `,
  Providers: ({ children }) => {
    const { colorMode } = useColorMode()
    return (
      <>
        <DefaultSeo {...defaultSeoConfig} />
        <SocialProfileJsonLd
          type="Person"
          name="François Best"
          url={useURL()}
          sameAs={['https://twitter.com/fortysevenfx']}
        />
        <Global
          styles={css`
            /* Source: https://dbaron.org/log/20110430-invert-colors */
            .darkModeInvertLuminosity {
              filter: ${colorMode === 'dark'
                ? 'invert(100%) hue-rotate(180deg)'
                : 'none'};
            }
            ::selection {
              background-color: var(
                ${colorMode === 'dark'
                  ? '--colors-accent-700'
                  : '--colors-accent-200'}
              );
            }
          `}
        />
        <AccentGlobal />
        <PrismGlobal />
        <MDXProvider components={mdxComponents}>{children}</MDXProvider>
      </>
    )
  }
})

// export function reportWebVitals(metric: any) {
//   if (
//     process.env.NODE_ENV !== 'production' ||
//     !process.env.NEXT_PUBLIC_CHIFFRE_PROJECT_ID ||
//     !process.env.NEXT_PUBLIC_CHIFFRE_PUBLIC_KEY
//   ) {
//     // Only log metrics in production
//     return
//   }
//   window.chiffre?.sendNumber({
//     name: metric.name,
//     value: metric.value,
//     meta: {
//       path: window.location.pathname
//     }
//   })
// }
