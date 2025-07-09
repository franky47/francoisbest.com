import { SpotifyApi } from '@spotify/web-api-ts-sdk'
import { env } from 'lib/env'
import { parse as parseSpotifyUri } from 'spotify-uri'
import { z } from 'zod'

const spotify = SpotifyApi.withClientCredentials(
  env.SPOTIFY_CLIENT_ID,
  env.SPOTIFY_CLIENT_SECRET
)

const spotifyDataSchema = z.object({
  title: z.string(),
  artist: z.string(),
  image: z.string().url(),
  link: z.string().url()
})

export type SpotifyData = z.infer<typeof spotifyDataSchema>

type SpotifyLoaderProps<OtherProps> = OtherProps & {
  url: string
  'aria-label'?: string
  Success: React.FC<SpotifyData>
  Failure: React.FC<any>
}

export async function SpotifyLoader<OtherProps>({
  url,
  Success,
  Failure,
  ...props
}: SpotifyLoaderProps<OtherProps>) {
  try {
    const data = await loadSpotifyData(url)
    return <Success {...data} {...props} />
  } catch (error) {
    console.group('Failed to fetch Spotify data')
    console.error(`label: ${props['aria-label']}`)
    console.error(`url:   ${url}`)
    console.dir(error)
    console.groupEnd()
    return <Failure {...props} />
  }
}

function loadSpotifyData(url: string): Promise<SpotifyData> {
  const { id, type } = parseSpotifyUri(url)
  switch (type) {
    case 'artist':
      return spotify.artists.get(id).then(artist => ({
        title: artist.name,
        artist: artist.name,
        image: artist.images[0]?.url ?? '',
        link: artist.external_urls.spotify
      }))
    case 'album':
      return spotify.albums.get(id).then(album => ({
        title: album.name,
        artist: album.artists.map(a => a.name).join(', '),
        image: album.images[0]?.url ?? '',
        link: album.external_urls.spotify
      }))
    default:
      throw new Error(`Unsupported Spotify type: ${type}`)
  }
}
