import { createChakraNextApp } from '@47ng/chakra-next'
import { DefaultSeo, SocialProfileJsonLd } from 'next-seo'
// @ts-ignore
import { MDXProvider } from '@mdx-js/react'
import { css, Global } from '@emotion/core'
import { mdxComponents } from 'src/components/blog/Mdx'
import { theme } from 'src/ui/theme'
import { prismLightTheme, prismDarkTheme } from 'src/ui/prism'
import { useURL } from 'src/hooks/useURL'
import { useColorMode } from '@chakra-ui/core'

export default createChakraNextApp({
  enableColorMode: 'light',
  theme,
  getGlobalConfig: theme => ({
    light: {
      bg: 'white',
      color: theme.colors.gray[800],
      borderColor: theme.colors.gray[500],
      placeholderColor: theme.colors.gray[400]
    },
    dark: {
      bg: theme.colors.gray[900],
      color: theme.colors.gray[300],
      borderColor: theme.colors.gray[500],
      placeholderColor: theme.colors.gray[600]
    }
  }),
  globalCss: css`
    html {
      font-family: ${theme.fonts.body};
      line-height: 1.5;
      scroll-behavior: smooth;
      min-width: 320px;
    }
    * {
      transition: all 0.15s ease-out;
    }
  `,
  Providers: ({ children }) => {
    const { colorMode } = useColorMode()
    return (
      <>
        <DefaultSeo
          title="François Best"
          titleTemplate="%s | François Best"
          description="I am a web developer interested in security and privacy in web technologies."
          additionalMetaTags={[
            { property: 'author', content: 'François Best' },
            {
              property: 'keywords',
              content: [
                'bio',
                'homepage',
                'engineer',
                'developer',
                'freelance',
                'remote',
                'typescript',
                'node.js',
                'node',
                'react',
                'open-source',
                'open source',
                'privacy',
                'security',
                'cryptography',
                'e2ee',
                'end-to-end encryption',
                'end to end encryption',
                'surveillance',
                'web'
              ].join(',')
            }
          ]}
          twitter={{
            cardType: 'summary',
            handle: 'fortysevenfx',
            site: 'fortysevenfx'
          }}
          openGraph={{
            type: 'website',
            site_name: 'François Best',
            profile: {
              firstName: 'François',
              lastName: 'Best'
            }
          }}
        />
        <SocialProfileJsonLd
          type="Person"
          name="François Best"
          url={useURL()}
          sameAs={['https://twitter.com/fortysevenfx']}
        />
        <Global
          styles={css`
            ${colorMode === 'light' ? prismLightTheme : prismDarkTheme};
          `}
        />
        <MDXProvider components={mdxComponents}>{children}</MDXProvider>
      </>
    )
  }
})
