import axios from 'axios'
import type { UnsplashImageData } from '../../components/UnsplashImage'

function formatPhotoData(data: any): UnsplashImageData {
  return {
    w: data.width,
    h: data.height,
    alt: data.description,
    src: data.urls.full,
    // srcset: `${data.urls.regular} 1080w, ${data.urls.small} 400w`,
    color: data.color,
    blurhash: data.blur_hash,
    author: {
      username: data.user.username,
      name: data.user.name
    }
  }
}

async function fetchPhoto(photoID: string): Promise<UnsplashImageData> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY!
  const url = `https://api.unsplash.com/photos/${photoID}`
  const res = await axios.get(url, {
    headers: {
      authorization: `Client-ID ${accessKey}`
    }
  })
  try {
    return formatPhotoData(res.data)
  } catch (error) {
    console.error(`Failed to format Unsplash API data for photoID ${photoID}`)
    console.dir(res.data, { depth: Infinity })
    throw error
  }
}

export async function fetch(photoIDs: string[]) {
  let out: [string, UnsplashImageData][] = []
  for (const photoID of photoIDs) {
    const data = await fetchPhoto(photoID)
    out.push([photoID, data])
  }
  return out
}
