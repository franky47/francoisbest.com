import Link from 'next/link'
import { BlogPostEmbed } from '../../../ui/embeds/blog-post-embed'

const featuredPosts = [
  ['2023', 'storing-react-state-in-the-url-with-nextjs'],
  ['2021', 'hashvatars'],
  ['2020', 'password-reset-for-e2ee-apps']
]

export const FeaturedPosts: React.FC = () => {
  return (
    <section>
      {featuredPosts.map(slug => (
        <BlogPostEmbed key={slug.join('/')} slug={slug} className="my-4" />
      ))}
      <p className="text-center">
        <Link href="/posts">All posts</Link>
      </p>
    </section>
  )
}
