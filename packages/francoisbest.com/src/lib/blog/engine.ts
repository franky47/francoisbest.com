import readingTime from 'reading-time'
import 'server-only'
import { blogSource } from 'lib/source'
import { PostMetadata } from './defs'

export type Post = {
  slug: string[]
  urlPath: string
  meta: PostMetadata
  readingTime: string
}

export function getAllPosts(): Post[] {
  const pages = blogSource.getPages()
  return pages
    .map(pageToPost)
    .sort((a, b) => {
      const aPub = a.meta.publicationDate?.valueOf() ?? Infinity
      const bPub = b.meta.publicationDate?.valueOf() ?? Infinity
      if (aPub === bPub) {
        return a.meta.title > b.meta.title ? 1 : -1
      }
      return aPub > bPub ? -1 : 1
    })
}

export function getPost(slug: string[]): Post | undefined {
  const page = blogSource.getPage(slug)
  if (!page) return undefined
  return pageToPost(page)
}

type FumadocsPage = ReturnType<typeof blogSource.getPages>[number]

function pageToPost(page: FumadocsPage): Post {
  return {
    slug: page.slugs,
    urlPath: page.url,
    meta: {
      title: page.data.title ?? '',
      description: page.data.description ?? '',
      publicationDate: page.data.publicationDate,
      tags: page.data.tags
    },
    readingTime: readingTime(page.data.description ?? '').text
  }
}
