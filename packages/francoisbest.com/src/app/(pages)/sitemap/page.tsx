import { Metadata } from 'next'
import { HoverPrefetchLink } from 'ui/components/hover-prefetch-link'
import { HireMe } from 'ui/components/hire-me'
import { Note } from 'ui/components/note'

export const metadata: Metadata = {
  title: 'Site map',
  description:
    "Welcome to the Dungeon. It's dangerous to go alone. Here be dragons."
}

export default function SitemapPage() {
  return (
    <>
      <h1>Site map</h1>

      <Note status="warning" title="Here be dragons.">
        Links might break. If they do, let me know by{' '}
        <a href="https://github.com/franky47/francoisbest.com/blob/next/packages/francoisbest.com/src/app/(pages)/sitemap/page.tsx">
          editing this page on GitHub
        </a>
        .
      </Note>

      <p>
        Also available in <a href="/sitemap.xml">XML</a>, if that&apos;s your
        thing.
      </p>

      <h2>Main Content</h2>
      <ul>
        <li>
          <HoverPrefetchLink href="/">Home</HoverPrefetchLink>
        </li>
        <li>
          <HoverPrefetchLink href="/posts">Articles</HoverPrefetchLink>
        </li>
        <li>
          <HoverPrefetchLink href="/open-source">Open Source</HoverPrefetchLink>
        </li>
      </ul>
      <p>
        Here are a few other pages not worthy of featuring on the main index
        page:
      </p>
      <ul>
        <li>
          <HoverPrefetchLink href="/public-keys">
            My public keys
          </HoverPrefetchLink>
        </li>
        <li>
          <HoverPrefetchLink href="/uses">
            <code>/uses</code>
          </HoverPrefetchLink>
        </li>
        <li>
          <HoverPrefetchLink href="/music">
            Music I enjoy listening to
          </HoverPrefetchLink>
        </li>
      </ul>

      <h2>Demos & Tests</h2>
      <ul>
        <li>
          <HoverPrefetchLink href="/horcrux">Horcrux</HoverPrefetchLink>, a
          playground for Shamir Secret Sharing
        </li>
      </ul>

      <HireMe outerClass="mt-12" />

      <nav
        role="list"
        className="!mt-12 flex flex-col items-center text-center text-sm"
      >
        <a
          role="listitem"
          href="https://github.com/franky47/francoisbest.com/blob/next/packages/francoisbest.com/src/app/(pages)/sitemap/page.tsx"
          className="!text-gray-500"
        >
          Edit this page on GitHub
        </a>
      </nav>
    </>
  )
}
