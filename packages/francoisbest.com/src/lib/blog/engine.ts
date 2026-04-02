import 'server-only'
import { blogSource } from 'lib/source'
import { PostMetadata } from './defs'
import { computeReadingTime } from './reading-time'

export type Post = {
  slug: string[]
  urlPath: string
  meta: PostMetadata
  readingTime: string
}

export async function getAllPosts(): Promise<Post[]> {
  const pages = blogSource.getPages()
  const posts = await Promise.all(pages.map(pageToPost))
  return posts.sort((a, b) => {
    const aPub = a.meta.publicationDate?.valueOf() ?? Infinity
    const bPub = b.meta.publicationDate?.valueOf() ?? Infinity
    if (aPub === bPub) {
      return a.meta.title > b.meta.title ? 1 : -1
    }
    return aPub > bPub ? -1 : 1
  })
}

export async function getPost(slug: string[]): Promise<Post | undefined> {
  const page = blogSource.getPage(slug)
  if (!page) return undefined
  return pageToPost(page)
}

type FumadocsPage = ReturnType<typeof blogSource.getPages>[number]

async function pageToPost(page: FumadocsPage): Promise<Post> {
  return {
    slug: page.slugs,
    urlPath: page.url,
    meta: {
      title: page.data.title ?? '',
      description: page.data.description ?? '',
      publicationDate: page.data.publicationDate,
      tags: page.data.tags
    },
    readingTime: await computeReadingTime(page.slugs)
  }
}
