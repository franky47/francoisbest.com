import { url } from 'lib/paths'
import seo from 'lib/seo.json'
import { chiffreConfig } from 'lib/services/chiffre'
import { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Favicons } from 'ui/head/favicons'
import './global.css'

export const metadata: Metadata = {
  metadataBase: new URL(url('/')),
  ...seo
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en-GB"
      className="motion-safe:scroll-smooth"
      suppressHydrationWarning
    >
      <head>
        <Favicons />
        <link
          key="rss-feed"
          rel="alternate"
          type="application/rss+xml"
          href="/posts/feed/rss.xml"
          title="Articles by François Best (RSS)"
        />
        <link
          key="atom-feed"
          rel="alternate"
          type="application/atom+xml"
          href="/posts/feed/atom.xml"
          title="Articles by François Best (Atom)"
        />
        <link
          key="json-feed"
          rel="alternate"
          type="application/json"
          href="/posts/feed/articles.json"
          title="Articles by François Best (JSON)"
        />
        <meta name="twitter:dnt" content="on" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>{children}</NuqsAdapter>
        </ThemeProvider>
        {chiffreConfig.enabled && (
          <>
            <script
              id="chiffre:analytics"
              src="https://chiffre.io/analytics.js"
              data-chiffre-project-id={chiffreConfig.projectId}
              data-chiffre-public-key={chiffreConfig.publicKey}
              crossOrigin="anonymous"
              async
            />
            <noscript>
              <img
                src={`https://chiffre.io/noscript/${chiffreConfig.projectId}`}
                alt="Chiffre.io anonymous visit counting for clients without JavaScript"
                crossOrigin="anonymous"
              />
            </noscript>
          </>
        )}
      </body>
    </html>
  )
}
