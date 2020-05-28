import fs from 'fs'
import { Feed } from 'feed'
import path from 'path'
import { PostFrontMatter } from 'src/types'
import { useURL } from 'src/hooks/useURL'

export async function generateFeeds(posts: PostFrontMatter[]) {
  const feed = new Feed({
    title: 'Articles by François Best',
    description:
      'I write about TypeScript, Node.js, React, security and privacy.',
    id: useURL('/posts'),
    link: useURL('/posts'),
    language: 'en',
    image: useURL('/favicons/apple-icon-120x120.png'),
    favicon: useURL('/favicon.ico'),
    copyright: 'All rights reserved 2020, François Best',
    feedLinks: {
      json: useURL('/posts/feed/articles.json'),
      atom: useURL('/posts/feed/atom.xml'),
      rss: useURL('/posts/feed/rss.xml')
    },
    author: {
      name: 'Francois Best',
      email: 'contact@francoisbest.com',
      link: useURL()
    }
  })

  // Register tags as categories
  new Set(
    posts
      .filter(post => !!post.publicationDate)
      .flatMap(post => post.tags || [])
  ).forEach(tag => {
    feed.addCategory(tag)
  })

  posts
    .filter(post => !!post.publicationDate)
    .forEach(post => {
      const postUrl = new URL(post.url)
      postUrl.searchParams.set('utm_source', 'rss')
      feed.addItem({
        title: post.title,
        id: post.url,
        link: post.url,
        image: post.ogImage?.url,
        category: post.tags?.map(tag => ({
          name: tag,
          term: tag
        })),
        description: post.description,
        content: `${post.description}
<a href="${postUrl.toString()}">Full article</a>.`,
        author: [
          {
            name: 'Francois Best',
            email: 'contact@francoisbest.com',
            link: useURL()
          }
        ],
        date: new Date(post.publicationDate!)
      })
    })

  // Export --

  const writeFeedFile = (name: string, contents: string) => {
    const filePath = path.resolve(process.cwd(), 'public/posts/feed', name)
    fs.writeFileSync(filePath, contents)
  }

  writeFeedFile('articles.json', feed.json1())
  writeFeedFile('atom.xml', feed.atom1())
  writeFeedFile('rss.xml', feed.rss2())
}
