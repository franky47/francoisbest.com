import Document, { Html, Head, Main, NextScript } from 'next/document'
import Favicons from '../components/head/Favicons'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en-GB">
        <Head>
          <Favicons />
          <link rel="sitemap" href="sitemap.xml" type="application/xml" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {process.env.NODE_ENV === 'production' && (
            <>
              <script
                id="chiffre:analytics-config"
                type="application/json"
                dangerouslySetInnerHTML={{
                  __html: `{
                "publicKey": "pk.JkCGUvZxyfMTZ4NB1pxwq7mgHC1Ih0j5EzuXVgRG5B0",
                "pushURL": "https://push.chiffre.io/event/qlXAgUdLZmuW8vTm"
              }
              `,
                }}
              />
              <script
                src="https://embed.chiffre.io/analytics.js"
                async
              ></script>
            </>
          )}
        </body>
      </Html>
    )
  }
}

export default MyDocument
