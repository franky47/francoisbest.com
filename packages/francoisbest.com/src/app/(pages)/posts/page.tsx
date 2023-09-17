import { getAllPosts } from 'lib/blog'
import { BlogPostPreview } from './components/blog-post-preview'
import { BlogRollHeader } from './components/blog-roll-header'

export const metadata = {
  title: 'Articles',
  description:
    'I write about TypeScript, Node.js, React, security and privacy.',
}

export default async function BlogIndex() {
  const posts = await getAllPosts()
  return (
    <>
      <BlogRollHeader title="Articles" />
      <section role="feed" aria-busy={false} className="space-y-12 mt-12">
        {posts.map(post => (
          <BlogPostPreview {...post} key={post.urlPath} />
        ))}
      </section>
    </>
  )
}
