import { getAllPosts } from 'lib/blog'
import Link from 'next/link'
import { FiRss, FiX } from 'react-icons/fi'
import { Button } from 'ui/components/buttons/button'
import { StaticTag } from 'ui/components/tag'
import { BlogPostPreview } from './components/blog-post-preview'

export const metadata = {
  title: 'Articles',
  description:
    'I write about TypeScript, Node.js, React, security and privacy.',
}

type PageProps = {
  searchParams: {
    tag?: string
  }
}

export default async function BlogIndex({ searchParams }: PageProps) {
  const posts = await getAllPosts()
  const filtered = searchParams.tag
    ? posts.filter(post => post.meta.tags?.includes(searchParams.tag!))
    : posts
  console.log(`[BLOG INDEX] all: ${posts.length}, filtered: ${filtered.length}`)
  return (
    <>
      <header className="flex items-baseline">
        <h1>Articles</h1>
        <nav className="not-prose text-sm text-gray-500 space-x-2 ml-auto">
          <FiRss
            className="inline-block -mt-1 stroke-amber-500"
            strokeWidth={3}
          />
          <a href="/posts/feed/rss.xml">RSS</a>
          <a href="/posts/feed/atom.xml">Atom</a>
          <a href="/posts/feed/articles.json">JSON</a>
        </nav>
      </header>
      <p>I usually write about stuff. Not regularly.</p>
      {searchParams.tag && (
        <nav className="flex text-sm items-center gap-2">
          <Link href="/posts" replace>
            <Button
              size="sm"
              className="rounded-full"
              variant="outline"
              leftIcon={<FiX />}
            >
              Clear filter &nbsp;<StaticTag>{searchParams.tag}</StaticTag>
            </Button>
          </Link>
        </nav>
      )}
      <section role="feed" aria-busy={false} className="space-y-12 mt-12">
        {filtered.map(post => (
          <BlogPostPreview key={post.urlPath} {...post} />
        ))}
      </section>
    </>
  )
}
