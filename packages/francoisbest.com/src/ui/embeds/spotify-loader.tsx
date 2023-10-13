import { z } from 'zod'

// @ts-ignore
import spotifyUrlInfo from 'spotify-url-info'

const { getPreview } = spotifyUrlInfo(fetch)

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
    const data = spotifyDataSchema.parse(await getPreview(url))
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
