import { DefaultSeo, SocialProfileJsonLd } from 'next-seo'
import { MDXProvider } from '@mdx-js/react'
import { mdxComponents } from 'src/components/blog/Mdx'
import { theme as defaultTheme } from 'src/ui/theme'
import { useURL } from 'src/hooks/useURL'
import defaultSeoConfig from 'src/next-seo.json'
import { PrismGlobal } from 'src/ui/prism'
import { AccentGlobal } from 'src/components/Accent'
import { ChakraProvider, Theme } from '@chakra-ui/react'

import { AppProps } from 'next/app'

export const AppCore: React.FC<{ theme?: Theme }> = ({
  children,
  theme = defaultTheme
}) => (
  <>
    <DefaultSeo {...defaultSeoConfig} />
    <SocialProfileJsonLd
      type="Person"
      name="François Best"
      url={useURL()}
      sameAs={['https://twitter.com/fortysevenfx']}
    />
    <ChakraProvider resetCSS theme={theme}>
      <AccentGlobal />
      <PrismGlobal />
      <MDXProvider components={mdxComponents}>{children}</MDXProvider>
    </ChakraProvider>
  </>
)

function App({ Component, pageProps }: AppProps) {
  return <AppCore>{<Component {...pageProps} />}</AppCore>
}

export default App
