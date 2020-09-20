import dotenv from 'dotenv'
import crypto from 'crypto'
import codec from '@47ng/codec'
import Fastify from 'fastify'
import axios from 'axios'
import open from 'open'
import qs from 'querystring'
import { SpotifyAlbumData } from 'src/components/SpotifyAlbum'

dotenv.config()

// Auth --

export async function requestAuthorizationCode() {
  const state = codec.b64.encode(crypto.randomBytes(8))
  const authorizeUrl = url('https://accounts.spotify.com/authorize', {
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

export async function requestTokens(code: string) {
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

export async function refreshAccessToken() {
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

export async function requestAccessToken() {
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

// --

export function url(base: string, args: object): string {
  const url = new URL(base)
  Object.entries(args).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })
  return url.toString()
}

// --

export async function getAlbumMetadata(
  id: string,
  token: string
): Promise<SpotifyAlbumData> {
  const { data } = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  return {
    name: data.name,
    url: `https://open.spotify.com/album/${id}`,
    artist: {
      name: data.artists[0].name,
      url: `https://open.spotify.com/artist/${
        data.artists[0].uri.split(':')[2]
      }`
    },
    cover: {
      src: data.images[0].url,
      srcset: data.images
        .map(({ width, url }: any) => `${url} ${width}w`)
        .join(', '),
      sizes: data.images.map(({ width, url }: any) => ({
        size: width,
        src: url
      }))
    }
  }
}

export function renderAlbumComponent(meta: SpotifyAlbumData) {
  return `<SpotifyAlbum
  name="${meta.name}"
  url="${meta.url}"
  artist={${JSON.stringify(meta.artist, null, 2)}}
  cover={${JSON.stringify(meta.cover, null, 2)}}
/>`
}

export async function main() {
  const id = process.argv[2].split(':')[2]
  const token = await requestAccessToken()
  const meta = await getAlbumMetadata(id, token)
  console.log(`"${meta.name}": ${JSON.stringify(meta, null, 2)}`)
}

main()
