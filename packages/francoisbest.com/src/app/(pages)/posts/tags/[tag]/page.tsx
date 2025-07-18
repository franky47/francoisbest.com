import { getAllPosts } from 'lib/blog'
import Link from 'next/link'
import { FiX } from 'react-icons/fi'
import { Button } from 'ui/components/buttons/button'
import { StaticTag } from 'ui/components/tag'
import { BlogPostPreview } from '../../components/blog-post-preview'
import { BlogRollHeader } from '../../components/blog-roll-header'

type PageProps = {
  params: Promise<{
    tag: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { tag } = await params
  return Promise.resolve({
    title: `${tag} posts`,
    description: `A list of posts talking about \'${tag}\'`
  })
}

export default async function TagPage({ params }: PageProps) {
  const tag = decodeURIComponent((await params).tag)
  const posts = await getAllPosts()
  const filtered = posts.filter(post => post.meta.tags?.includes(tag))
  return (
    <>
      <BlogRollHeader title="Articles" />
      <nav className="flex items-center justify-between">
        <Link href="/posts">
          <Button
            size="sm"
            className="rounded-full"
            variant="outline"
            leftIcon={<FiX />}
          >
            Clear filter &nbsp;<StaticTag>{tag}</StaticTag>
          </Button>
        </Link>
        <Link href="/posts/tags" className="text-sm">
          All tags
        </Link>
      </nav>
      <section role="feed" aria-busy={false} className="mt-12 space-y-12">
        {filtered.map(post => (
          <BlogPostPreview {...post} key={post.urlPath} />
        ))}
      </section>
    </>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  const tags = Array.from(new Set(posts.flatMap(post => post.meta.tags ?? [])))
  return tags.map(tag => ({ tag }))
}
