import { FiMap } from 'react-icons/fi'
import { Note } from 'ui/components/note'
import { HireMe } from 'ui/components/hire-me'
import { HoverPrefetchLink } from 'ui/components/hover-prefetch-link'
import { FavouriteAlbums, FavouriteArtists } from './_landing-sections/music'
import { FeaturedPosts } from './_landing-sections/featured-posts'
import { AboutMe } from './_landing-sections/about-me'
import { Career } from './_landing-sections/career/career'

export default function HomePage() {
  return (
    <>
      <h1>Hi, I&apos;m François Best</h1>
      <p>
        I am a web developer and an{' '}
        <HoverPrefetchLink href="/open-source">
          open sourcerer
        </HoverPrefetchLink>{' '}
        from France.
      </p>
      <p>
        This is my digital garden, where I write about the things I&apos;m
        working on and share what I&apos;ve learned.
      </p>

      <HireMe />

      <h2>Featured posts</h2>
      <FeaturedPosts />

      <h2>About Me</h2>
      <AboutMe />

      <h2>Career</h2>
      <Career />

      <h2>Music</h2>
      <p>
        I like listening to progressive metal, fusion jazz and synthwave when
        working:
        <wbr />
        syncopated beats, meter changes and arpeggios do wonders for web
        development. 🤘
      </p>
      <p>My favourite artists and albums of the moment:</p>

      <FavouriteArtists />

      <br />

      <FavouriteAlbums />

      <p className="text-center">
        <HoverPrefetchLink href="/music">More albums</HoverPrefetchLink>
      </p>

      <hr />

      <p>
        This website is{' '}
        <a href="https://github.com/franky47/francoisbest.com">open-source</a>,
        and was made with <a href="https://nextjs.org">Next.js</a>,{' '}
        <a href="https://tailwindcss.com">TailwindCSS</a> and{' '}
        <a href="https://mdxjs.com/">MDX</a>.
      </p>

      <Note status="info">
        I used to style my apps and websites with CSS-in-JS (using{' '}
        <a href="https://chakra-ui.com/">Chakra-UI</a>), but the introduction of
        React Server Components in Next.js 13+ helped me switch to a leaner HTML
        + CSS static render, only shipping client components where interaction
        is needed, while keeping external content (Spotify albums, GitHub repo
        stats etc..).
      </Note>

      <p className="!mt-12 text-center text-sm">
        <FiMap className="-mt-0.5 mr-1.5 inline-block" />
        <HoverPrefetchLink href="/sitemap">Site map</HoverPrefetchLink>
      </p>
    </>
  )
}
