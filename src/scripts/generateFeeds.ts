import fs from 'fs'
import { Feed } from 'feed'
import path from 'path'
import dayjs from 'dayjs'
import { PostFrontMatter } from 'src/types'
import { useURL } from 'src/hooks/useURL'
import { GroupedReadingList } from 'src/components/readingList/defs'
import { useUTMLink } from 'src/hooks/useUTMLink'
import { filterArticles } from 'src/components/readingList/utils'

export async function generateBlogPostsFeeds(posts: PostFrontMatter[]) {
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
        link: postUrl.toString(),
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

// --

export async function generateReadingListDailyFeed(
  articles: GroupedReadingList
) {
  const feed = new Feed({
    title: "François Best's Reading List",
    description: "All the blog posts I've read in 2021",
    id: useURL('/reading-list'),
    link: useURL('/reading-list'),
    language: 'en',
    image: useURL('/images/reading-list/og.jpg'),
    favicon: useURL('/favicon.ico'),
    copyright: 'All rights reserved 2020, François Best',
    feedLinks: {
      json: useURL('/feeds/reading-list/daily/feed.json'),
      atom: useURL('/feeds/reading-list/daily/atom.xml'),
      rss: useURL('/feeds/reading-list/daily/rss.xml')
    },
    author: {
      name: 'Francois Best',
      email: 'contact@francoisbest.com',
      link: useURL()
    }
  })

  const until = dayjs().startOf('day').valueOf()
  const from = dayjs(until).subtract(5, 'day').valueOf()
  const last5DaysArticles = filterArticles(
    articles,
    article => article.timestamp >= from && article.timestamp < until
  )
  Object.entries(last5DaysArticles).forEach(([day, articles]) => {
    const isoDate = dayjs(day).format('YYYY-MM-DD')
    const pageURL = useUTMLink(useURL(`/reading-list/archives/${isoDate}`), {
      source: 'rss'
    })
    const description = `My reading list for ${day}: ${
      articles.length
    } article${articles.length > 1 ? 's' : ''} by ${articles
      .filter(article => !!article.author)
      .filter((_, i) => i < 5)
      .map(article => article.author)
      .join(', ')}${articles.length > 5 ? ' and more.' : '.'}`

    feed.addItem({
      title: '',
      id: pageURL,
      link: pageURL,
      image: articles.filter(
        article => !!article.image && article.image.startsWith('https://')
      )[0].image,
      description,
      content: `${description}
<a href="${pageURL}">Full list</a>.`,
      author: [
        {
          name: 'Francois Best',
          email: 'contact@francoisbest.com',
          link: useURL()
        }
      ],
      date: new Date(isoDate)
    })
  })

  // Export --

  const writeFeedFile = (name: string, contents: string) => {
    const filePath = path.resolve(
      process.cwd(),
      'public/feeds/reading-list/daily',
      name
    )
    fs.writeFileSync(filePath, contents)
  }

  writeFeedFile('feed.json', feed.json1())
  writeFeedFile('atom.xml', feed.atom1())
  writeFeedFile('rss.xml', feed.rss2())
}
