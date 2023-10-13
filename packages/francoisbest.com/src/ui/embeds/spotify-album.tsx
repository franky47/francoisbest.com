import Image from 'next/image'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { WideContainer } from 'ui/layouts/wide-container'
import { SpotifyData, SpotifyLoader } from './spotify-loader'

export const SpotifyAlbumGrid: React.FC<{
  children: React.ReactNode
}> = props => (
  <WideContainer>
    <section
      role="feed"
      aria-busy={false}
      className="not-prose grid grid-cols-1 justify-center gap-x-4 gap-y-8 overflow-hidden sm:grid-cols-2 md:grid-cols-3"
      {...props}
    />
  </WideContainer>
)

type SpotifyAlbumProps = Partial<SpotifyData> & {
  url: string
}

export function SpotifyAlbum({ url, ...props }: SpotifyAlbumProps) {
  return (
    <Suspense fallback={<EmptyAlbumView type="loading" />}>
      <SpotifyLoader
        url={url}
        Success={SpotifyAlbumView}
        Failure={EmptyAlbumView}
        {...props}
      />
    </Suspense>
  )
}

type EmptyAlbumViewProps = {
  type: 'loading' | 'error'
}

export const EmptyAlbumView: React.FC<EmptyAlbumViewProps> = ({
  type = 'error'
}) => {
  return (
    <figure>
      <Image
        width={256}
        height={256}
        src={
          type === 'error'
            ? '/img/album-cover-missing.jpg'
            : '/img/album-cover-placeholder.jpg'
        }
        alt="Album not found"
        className="font-xs relative mx-auto flex h-64 w-64 items-center justify-center overflow-hidden rounded bg-black drop-shadow-lg"
      />
      <figcaption className="mt-2 text-center text-sm italic text-gray-500">
        {type === 'error' ? 'Missing album data' : 'Loading...'}
      </figcaption>
    </figure>
  )
}

const SpotifyAlbumView: React.FC<SpotifyData> = ({
  link,
  title,
  artist,
  image
}) => {
  // @ts-expect-error
  ReactDOM.preconnect('https://i.scdn.co')
  // @ts-expect-error
  ReactDOM.prefetchDNS('https://i.scdn.co')
  return (
    <figure>
      <a href={link}>
        <Image
          width={256}
          height={256}
          src={image}
          alt={`${title}, an album by ${artist}`}
          className="font-xs relative mx-auto flex h-64 w-64 items-center justify-center overflow-hidden rounded bg-gray-200 drop-shadow-lg dark:bg-gray-800"
          unoptimized
        />
      </a>
      <figcaption className="mt-2 text-center text-sm text-gray-500">
        <a href={link}>{title === artist ? title : title + ' • ' + artist}</a>
      </figcaption>
    </figure>
  )
}
