import type { MetadataRoute } from 'next'
import { getAllPosts } from 'lib/blog'
import { url } from 'lib/paths'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await getAllPosts()
  const now = Date.now()
  const publishedPosts = allPosts.filter(
    post => (post.meta.publicationDate?.valueOf() ?? Infinity) < now
  )

  const postEntries: MetadataRoute.Sitemap = publishedPosts.map(post => ({
    url: url(post.urlPath),
    lastModified: post.meta.publicationDate
      ? new Date(post.meta.publicationDate)
      : undefined
  }))

  const staticPages: MetadataRoute.Sitemap = [
    { url: url('/') },
    { url: url('/posts') },
    { url: url('/open-source') },
    { url: url('/music') },
    { url: url('/links') },
    { url: url('/uses') },
    { url: url('/public-keys') }
  ]

  return [...staticPages, ...postEntries]
}
