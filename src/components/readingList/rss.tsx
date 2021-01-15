import Head from 'next/head'
import { useURL } from 'src/hooks/useURL'

export const ReadingListDailyRSSHeadLinks: React.FC = () => (
  <Head>
    <link
      rel="alternate"
      type="application/rss+xml"
      href={useURL('/feeds/reading-list/daily/rss.xml')}
      title="Francois Best's Daily Reading List (RSS)"
    />
    <link
      rel="alternate"
      type="application/atom+xml"
      href={useURL('/feeds/reading-list/daily/atom.xml')}
      title="Francois Best's Daily Reading List (Atom)"
    />
    <link
      rel="alternate"
      type="application/json"
      href={useURL('/feeds/reading-list/daily/feed.json')}
      title="Francois Best's Daily Reading List (JSON)"
    />
  </Head>
)
