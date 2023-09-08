import 'lib/blog/engine'
import { url } from 'lib/paths'
import seo from 'lib/seo.json'
import { Favicons } from 'ui/head/favicons'

import './global.css'

export const metadata = {
  metadataBase: new URL(url('/')),
  ...seo,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const enableChiffreAnalytics =
    Boolean(process.env.CHIFFRE_PUBLIC_KEY) &&
    Boolean(process.env.CHIFFRE_PROJECT_ID)

  return (
    <html lang="en-GB" className="motion-safe:scroll-smooth">
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
        <link rel="sitemap" href="sitemap.xml" type="application/xml" />
        <meta name="twitter:dnt" content="on" />
        <script
          id="load-theme"
          dangerouslySetInnerHTML={{ __html: loadTheme }}
        />
      </head>
      <body>
        <div className="h-8 flex justify-center items-center bg-green-400 dark:bg-emerald-500/50">
          <a
            href="mailto:freelance@francoisbest.com"
            className="font-semibold underline"
          >
            Hire me!
          </a>
        </div>
        {children}
        {enableChiffreAnalytics && (
          <>
            <script
              id="chiffre:analytics"
              src="https://chiffre.io/analytics.js"
              data-chiffre-project-id={process.env.CHIFFRE_PROJECT_ID}
              data-chiffre-public-key={process.env.CHIFFRE_PUBLIC_KEY}
              crossOrigin="anonymous"
              async
            />
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://chiffre.io/noscript/${process.env.CHIFFRE_PROJECT_ID}`}
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

// --

// Apply the "dark" class to the <html> element when applicable,
// and keep it in sync across tabs/windows using the storage API.
const loadTheme = `(function() {
  function loadTheme() {
    if (localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
  addEventListener('storage', function(event) {
    if (event.key !== 'theme') {
      return
    }
    loadTheme()
  })
  loadTheme()
})()
`
