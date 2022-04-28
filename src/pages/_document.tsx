import Document, { Head, Html, Main, NextScript } from 'next/document'
import Favicons from 'src/components/head/Favicons'
import { useURL } from 'src/hooks/useURL'

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en-GB">
        <Head>
          <Favicons />
          <link rel="sitemap" href="sitemap.xml" type="application/xml" />
          <link
            rel="alternate"
            type="application/rss+xml"
            href={useURL('/posts/feed/rss.xml')}
            title="Articles by François Best (RSS)"
          />
          <link
            rel="alternate"
            type="application/atom+xml"
            href={useURL('/posts/feed/atom.xml')}
            title="Articles by François Best (Atom)"
          />
          <link
            rel="alternate"
            type="application/json"
            href={useURL('/posts/feed/articles.json')}
            title="Articles by François Best (JSON)"
          />
          <meta name="twitter:dnt" content="on" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {process.env.NODE_ENV === 'production' &&
            !!process.env.NEXT_PUBLIC_CHIFFRE_PUBLIC_KEY &&
            !!process.env.NEXT_PUBLIC_CHIFFRE_PROJECT_ID && (
              <>
                <script
                  id="chiffre:analytics"
                  src="https://chiffre.io/analytics.js"
                  data-chiffre-project-id={
                    process.env.NEXT_PUBLIC_CHIFFRE_PROJECT_ID
                  }
                  data-chiffre-public-key={
                    process.env.NEXT_PUBLIC_CHIFFRE_PUBLIC_KEY
                  }
                  crossOrigin="anonymous"
                  async
                ></script>
                <noscript>
                  <img
                    src={`https://chiffre.io/noscript/${process.env.NEXT_PUBLIC_CHIFFRE_PROJECT_ID}`}
                    alt="Chiffre.io anonymous visit counting for clients without JavaScript"
                    crossOrigin="anonymous"
                  />
                </noscript>
              </>
            )}
        </body>
      </Html>
    )
  }
}

export default MyDocument
