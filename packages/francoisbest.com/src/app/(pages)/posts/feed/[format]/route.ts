import { Feed } from 'feed'
import { getAllPosts } from 'lib/blog'
import { url } from 'lib/paths'
import { NextResponse } from 'next/server'

export async function generateStaticParams() {
  return [
    { format: 'rss.xml' },
    { format: 'atom.xml' },
    { format: 'articles.json' },
  ]
}

export async function GET(
  _: Request,
  { params }: { params: { format: string } }
) {
  const format =
    params.format === 'rss.xml'
      ? 'rss'
      : params.format === 'atom.xml'
      ? 'atom'
      : params.format === 'articles.json'
      ? 'json'
      : null

  if (format === null) {
    return NextResponse.json(
      {
        error: 'Unsupported feed format',
      },
      {
        status: 400,
      }
    )
  }

  const now = Date.now()
  const allPosts = await getAllPosts()
  const publishedPosts = allPosts.filter(
    post => (post.meta.publicationDate?.valueOf() ?? Infinity) < now
  )
  const tags = new Set(publishedPosts.flatMap(post => post.meta.tags ?? []))
  const feed = new Feed({
    title: 'Articles by François Best',
    description:
      'I write about TypeScript, Node.js, React, security and privacy.',
    id: url('/posts'),
    link: url('/posts'),
    language: 'en',
    image: url('/favicons/apple-icon-120x120.png'),
    favicon: url('/favicon.ico'),
    copyright: 'All rights reserved 2023, François Best',
    feedLinks: {
      json: url('/posts/feed/articles.json'),
      atom: url('/posts/feed/atom.xml'),
      rss: url('/posts/feed/rss.xml'),
    },
    author: {
      name: 'Francois Best',
      email: 'rss@francoisbest.com',
      link: url('/'),
    },
  })

  // Register tags as categories
  tags.forEach(tag => {
    feed.addCategory(tag)
  })

  publishedPosts.forEach(post => {
    const postUrl = new URL(url(post.urlPath))
    postUrl.searchParams.set('utm_source', format)
    feed.addItem({
      title: post.meta.title,
      id: post.urlPath,
      link: postUrl.toString(),
      image: post.ogImageUrlPath && url(post.ogImageUrlPath),
      category: post.meta.tags?.map(tag => ({
        name: tag,
        term: tag,
      })),
      description: post.meta.description,
      content: `${post.meta.description}

<a href="${postUrl.toString()}">Full article</a> (${post.readingTime}).`,
      author: [
        {
          name: 'Francois Best',
          email: `${format}@francoisbest.com`,
          link: url('/'),
        },
      ],
      published: new Date(post.meta.publicationDate!),
      date: new Date(post.meta.publicationDate!),
    })
  })

  if (format === 'rss') {
    return new Response(feed.rss2())
  }
  if (format === 'atom') {
    return new Response(feed.atom1())
  }
  return new Response(feed.json1())
}
