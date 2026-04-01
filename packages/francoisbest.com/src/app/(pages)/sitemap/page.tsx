import { Metadata } from 'next'
import Link from 'next/link'
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
        Also available in <Link href="/sitemap.xml">XML</Link>, if that's your
        thing.
      </p>

      <h2>Main Content</h2>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/posts">Articles</Link>
        </li>
        <li>
          <Link href="/open-source">Open Source</Link>
        </li>
      </ul>
      <p>
        Here are a few other pages not worthy of featuring on the main index
        page:
      </p>
      <ul>
        <li>
          <Link href="/public-keys">My public keys</Link>
        </li>
        <li>
          <Link href="/uses">
            <code>/uses</code>
          </Link>
        </li>
        <li>
          <Link href="/music">Music I enjoy listening too</Link>
        </li>
      </ul>

      <h2>Demos & Tests</h2>
      <ul>
        <li>
          <Link href="/horcrux">Horcrux</Link>, a playground for Shamir Secret
          Sharing
        </li>
        <li>
          End-to-end encryption demo (for{' '}
          <a href="https://github.com/47ng/simple-e2ee">
            <code>47ng/simple-e2ee</code>
          </a>
          )
          <ul>
            <li>
              <Link href="/e2ee/encrypt">Encrypt</Link>
            </li>
            <li>
              <Link href="/e2ee/decrypt">Decrypt</Link>
            </li>
          </ul>
        </li>
      </ul>
    </>
  )
}
