import fs from 'fs'
import walk from 'walkdir'
import { Feed } from 'feed'
import { ArticleMeta } from '../components/blog/types'
import path from 'path'

export interface Post {
  slug: string
  year: string
  meta: ArticleMeta
}

export type YearPostsMap = {
  [year: string]: Post[]
}

export async function listBlogPosts(postsDir: string): Promise<YearPostsMap> {
  const metaRegex = /export\s+const\s+meta\s+=\s+({[\s\S]*?\n})/
  const paths = (await walk.async(postsDir)).filter(p => p.endsWith('.mdx'))
  const posts: YearPostsMap = {}
  for (const postPath of paths) {
    const [slug, year] = postPath.split('/').reverse()
    const contents = fs.readFileSync(postPath, 'utf-8')
    const match = metaRegex.exec(contents)
    if (!match || typeof match[1] !== 'string') {
      throw new Error(`Article ${slug} needs to export const meta = {}`)
    }
    // eslint-disable-next-line no-eval
    const meta: ArticleMeta = eval('(' + match[1] + ')')
    if (process.env.NODE_ENV === 'production' && !meta.publicationDate) {
      continue // Don't list drafts in production
    }
    if (!meta.title) {
      throw new Error(`Article ${slug} is missing a title`)
    }
    if (!meta.summary) {
      throw new Error(`Article ${slug} is missing a summary`)
    }

    // todo: Find last modification date from Git
    posts[year] = [
      ...(posts[year] || []),
      {
        slug: slug.replace(/\.mdx$/, ''), // Remove extension
        year,
        meta
      }
    ].sort((a, b) =>
      (a.meta.publicationDate || '9999') < (b.meta.publicationDate || '9999')
        ? 1
        : -1
    )
  }
  return posts
}

export async function generateSyndicationFeeds(posts: Post[]) {
  const feed = new Feed({
    title: 'Articles by François Best',
    description:
      'I write about TypeScript, Node.js, React, security and privacy.',
    id: 'https://francoisbest.com/posts',
    link: 'https://francoisbest.com/posts',
    language: 'en',
    image: 'https://francoisbest.com/favicons/apple-icon-120x120.png',
    favicon: 'https://francoisbest.com/favicon.ico',
    copyright: 'All rights reserved 2020, François Best',
    feedLinks: {
      json: 'https://francoisbest.com/posts/feed/articles.json',
      atom: 'https://francoisbest.com/posts/feed/atom.xml',
      rss: 'https://francoisbest.com/posts/feed/rss.xml'
    },
    author: {
      name: 'Francois Best',
      email: 'contact@francoisbest.com',
      link: 'https://francoisbest.com'
    }
  })

  posts
    .filter(post => post.meta.publicationDate)
    .forEach(post => {
      feed.addItem({
        title: post.meta.title,
        id: `https://francoisbest.com/posts/${post.year}/${post.slug}`,
        link: `https://francoisbest.com/posts/${post.year}/${post.slug}`,
        description: post.meta.summary,
        content: `${post.meta.summary}

Read the full article at:
https://francoisbest.com/posts/${post.year}/${post.slug}

(no ads, paywall or corporate tracking, I hate those things too)
`,
        author: [
          {
            name: 'Francois Best',
            email: 'contact@francoisbest.com',
            link: 'https://francoisbest.com'
          }
        ],
        date: new Date(post.meta.publicationDate)
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
