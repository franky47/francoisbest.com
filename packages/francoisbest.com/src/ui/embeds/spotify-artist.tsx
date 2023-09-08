import Image from 'next/image'
import { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { SpotifyData, SpotifyLoader } from './spotify-loader'

export const SpotifyArtistGrid: React.FC<{
  children: React.ReactNode
}> = props => (
  <section
    role="feed"
    aria-busy={false}
    className="not-prose grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 overflow-hidden"
    {...props}
  />
)

type SpotifyArtistProps = Partial<SpotifyData> & {
  url: string
}

export function SpotifyArtist({ url, ...props }: SpotifyArtistProps) {
  return (
    <Suspense fallback={<SpotifyArtistLoading />}>
      <SpotifyLoader
        url={url}
        Success={SpotifyArtistView}
        Failure={SpotifyArtistError}
        {...props}
      />
    </Suspense>
  )
}

export const SpotifyArtistLoading: React.FC = props => (
  <div
    role="presentation"
    aria-hidden
    className="mx-auto rounded-full w-24 h-24 bg-gray-300 animate-pulse"
    {...props}
  />
)
export const SpotifyArtistError: React.FC = props => (
  <SpotifyArtistView
    title="No artist data"
    artist="No artist data"
    image="#"
    link="#"
    {...props}
  />
)

export const SpotifyArtistView: React.FC<SpotifyData> = ({
  title,
  link,
  image,
  ...props
}) => {
  // @ts-expect-error
  ReactDOM.preconnect('https://i.scdn.co')
  // @ts-expect-error
  ReactDOM.prefetchDNS('https://i.scdn.co')

  return (
    <figure className="text-center" {...props}>
      <a
        href={link}
        className="block w-24 h-24 rounded-full mx-auto drop-shadow-lg overflow-hidden"
      >
        <Image width={24 * 4} height={24 * 4} src={image} alt={title} />
      </a>
      <figcaption className="text-center text-gray-500 text-sm mt-2">
        <a href={link}>{title}</a>
      </figcaption>
    </figure>
  )
}
