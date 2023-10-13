import { resolve } from 'lib/paths'
import Link from 'next/link'
import { BlogPostEmbed } from '../../../ui/embeds/blog-post-embed'

const featuredPosts = [
  '../posts/(content)/2023/storing-react-state-in-the-url-with-nextjs/page.mdx',
  '../posts/(content)/2021/hashvatars/page.mdx',
  '../posts/(content)/2020/password-reset-for-e2ee-apps/page.mdx'
]

export const FeaturedPosts: React.FC = () => {
  return (
    <section>
      {featuredPosts.map(relativePath => (
        <BlogPostEmbed
          key={relativePath}
          filePath={resolve(import.meta.url, relativePath)}
          className="my-4"
        />
      ))}
      <p className="text-center">
        <Link href="/posts">All posts</Link>
      </p>
    </section>
  )
}
