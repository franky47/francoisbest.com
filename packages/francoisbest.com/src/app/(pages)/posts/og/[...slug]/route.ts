import fs from 'node:fs/promises'
import path from 'node:path'
import { getAllPosts, type OgImageExtension } from 'lib/blog'

const CONTENT_DIR = path.join(process.cwd(), 'content/blog')

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts
    .filter(post => post.ogImageExtension)
    .map(post => ({ slug: post.slug }))
}

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  const dir = path.join(CONTENT_DIR, ...slug)

  const extensions: OgImageExtension[] = ['jpg', 'png']
  for (const ext of extensions) {
    const filePath = path.join(dir, `opengraph-image.${ext}`)
    try {
      const buffer = await fs.readFile(filePath)
      return new Response(new Uint8Array(buffer), {
        headers: {
          'Content-Type': ext === 'jpg' ? 'image/jpeg' : 'image/png',
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      })
    } catch {
      continue
    }
  }

  return new Response(null, { status: 404 })
}
