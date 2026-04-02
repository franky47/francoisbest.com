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

  // Derive unique tags from all published posts
  const tags = Array.from(
    new Set(publishedPosts.flatMap(post => post.meta.tags ?? []))
  )
  const tagEntries: MetadataRoute.Sitemap = [
    { url: url('/posts/tags') },
    ...tags.map(tag => ({ url: url(`/posts/tags/${tag}`) }))
  ]

  // Derive unique years from all published posts
  const years = Array.from(
    new Set(
      publishedPosts
        .map(post => post.meta.publicationDate?.getFullYear())
        .filter((y): y is number => y !== undefined)
    )
  )
  const yearEntries: MetadataRoute.Sitemap = years.map(year => ({
    url: url(`/posts/${year}`)
  }))

  const staticPages: MetadataRoute.Sitemap = [
    { url: url('/') },
    { url: url('/posts') },
    { url: url('/open-source') },
    { url: url('/music') },
    { url: url('/links') },
    { url: url('/uses') },
    { url: url('/public-keys') },
    { url: url('/hashvatar') },
    { url: url('/horcrux') },
    { url: url('/woodworking/dovetail-designer') },
    { url: url('/safari-speedrun') },
    { url: url('/sitemap') }
  ]

  return [...staticPages, ...postEntries, ...tagEntries, ...yearEntries]
}
