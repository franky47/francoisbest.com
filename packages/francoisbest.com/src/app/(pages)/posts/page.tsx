import { getAllPosts } from 'lib/blog'
import { FiRss } from 'react-icons/fi'
import { BlogPostPreview } from './components/blog-post-preview'

export const metadata = {
  title: 'Articles',
  description:
    'I write about TypeScript, Node.js, React, security and privacy.',
}

export default async function BlogIndex() {
  const posts = await getAllPosts()
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
      <section role="feed" aria-busy={false} className="space-y-12 mt-12">
        {posts.map(post => (
          <BlogPostPreview {...post} key={post.urlPath} />
        ))}
      </section>
    </>
  )
}
