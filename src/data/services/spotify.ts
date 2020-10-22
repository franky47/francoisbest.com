import crypto from 'crypto'
import codec from '@47ng/codec'
import Fastify from 'fastify'
import axios from 'axios'
import open from 'open'
import qs from 'querystring'
import chunk from 'lodash/chunk'
import { injectQuery } from '../utility'
import type { SpotifyAlbumData } from 'src/components/embeds/SpotifyAlbum'

// Auth --

async function requestAuthorizationCode() {
  const state = codec.b64.encode(crypto.randomBytes(8))
  const authorizeUrl = injectQuery('https://accounts.spotify.com/authorize', {
    client_id: process.env.SPOTIFY_CLIENT_ID,
    redirect_uri: 'http://localhost:12345',
    response_type: 'code',
    state
  })
  console.log(authorizeUrl)
  const server = Fastify({ logger: false })
  const queryPromise = new Promise<any>(resolve => {
    server.get('/', (req, res) => {
      resolve(req.query)
      res
        .status(200)
        .send('You can close this window now and return to the terminal')
    })
  })
  const address = await server.listen(12345, '0.0.0.0')
  console.log('server started at', address)
  await open(authorizeUrl.toString())
  const query = await queryPromise
  server.server.close()
  if (query.state !== state) {
    console.error('Mismatching request ID', query.state, state)
    return null
  }
  return query.code
}

async function requestTokens(code: string) {
  const res = await axios.post(
    'https://accounts.spotify.com/api/token',
    qs.stringify({
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:12345',
      code,
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET
    }),
    {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }
  )
  return res.data
}

async function refreshAccessToken() {
  const res = await axios.post(
    'https://accounts.spotify.com/api/token',
    qs.stringify({
      grant_type: 'refresh_token',
      refresh_token: process.env.SPOTIFY_CLIENT_REFRESH_TOKEN,
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET
    }),
    {
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }
  )
  return res.data.access_token
}

async function requestAccessToken() {
  try {
    return await refreshAccessToken()
  } catch (e) {
    console.error(e)
    console.info('No refresh token, going the full route')
    const code = await requestAuthorizationCode()
    const { access_token, refresh_token } = await requestTokens(code)
    console.log(`Add this to your .env file:
  SPOTIFY_CLIENT_REFRESH_TOKEN="${refresh_token}"
  `)
    return access_token
  }
}

// -----------------------------------------------------------------------------

function formatAlbumMetadata(data: any): SpotifyAlbumData | null {
  if (data === null) {
    return null
  }
  return {
    name: data.name,
    url: `https://open.spotify.com/album/${data.id}`,
    artist: {
      name: data.artists[0].name,
      url: `https://open.spotify.com/artist/${
        data.artists[0].uri.split(':')[2]
      }`
    },
    cover: {
      src: data.images[0].url
      // srcset: data.images
      //   .map(({ width, url }: any) => `${url} ${width}w`)
      //   .join(', '),
      // sizes: data.images.map(({ width, url }: any) => ({
      //   size: width,
      //   src: url
      // }))
    }
  }
}

// async function getAlbumMetadata(
//   id: string,
//   token: string
// ): Promise<SpotifyAlbumData> {
//   const { data } = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
//     headers: {
//       authorization: `Bearer ${token}`
//     }
//   })
//   return formatAlbumMetadata(data)
// }

async function getAlbumsMetadata(
  ids: string[],
  token: string
): Promise<SpotifyAlbumData[]> {
  const url = injectQuery('https://api.spotify.com/v1/albums', {
    ids: ids.join(',')
  })
  const { data } = await axios.get(url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  return data.albums.map((album: any) => formatAlbumMetadata(album))
}

// -----------------------------------------------------------------------------

async function fetchAlbums(albumIDs: string[], token: string) {
  const MAX_BATCH_SIZE = 20
  const albumChunks = chunk(albumIDs, MAX_BATCH_SIZE)
  return (
    await Promise.all(albumChunks.map(chunk => getAlbumsMetadata(chunk, token)))
  ).flat()
}

export async function fetch(
  contentIDs: string[]
): Promise<[string, SpotifyAlbumData][]> {
  const token = await requestAccessToken()

  const albumIDs = contentIDs
    .filter(contentID => contentID.startsWith('spotify:album:'))
    .map(albumID => albumID.split(':')[2])

  const albums = await fetchAlbums(albumIDs, token)
  return albums.map((album, i) => [`spotify:album:${albumIDs[i]}`, album])
}
