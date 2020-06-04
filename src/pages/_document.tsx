import Document, { Html, Head, Main, NextScript } from 'next/document'
import Favicons from '../components/head/Favicons'

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
            href="/posts/feed/rss.xml"
            title="Articles by François Best"
          />
          <link
            rel="alternate"
            type="application/atom+xml"
            href="/posts/feed/atom.xml"
            title="Articles by François Best"
          />
          <link
            rel="alternate"
            type="application/json"
            href="/posts/feed/articles.json"
            title="Articles by François Best"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          {process.env.NODE_ENV === 'production' &&
            !!process.env.NEXT_PUBLIC_CHIFFRE_PUBLIC_KEY &&
            !!process.env.NEXT_PUBLIC_CHIFFRE_PROJECT_ID && (
              <>
                <script
                  id="chiffre:analytics-config"
                  type="application/json"
                  dangerouslySetInnerHTML={{
                    __html: `{
                "publicKey": "${process.env.NEXT_PUBLIC_CHIFFRE_PUBLIC_KEY}",
                "pushURL": "https://push.chiffre.io/event/${process.env.NEXT_PUBLIC_CHIFFRE_PROJECT_ID}"
              }`
                  }}
                />
                <script
                  src="https://embed.chiffre.io/analytics.js"
                  crossOrigin="anonymous"
                  async
                ></script>
                <noscript>
                  <img
                    src={`https://push.chiffre.io/noscript/${process.env.NEXT_PUBLIC_CHIFFRE_PROJECT_ID}`}
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
