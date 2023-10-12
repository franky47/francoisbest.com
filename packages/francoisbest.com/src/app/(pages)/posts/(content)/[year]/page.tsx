import { getAllPosts } from 'lib/blog'
import Link from 'next/link'
import { FiX } from 'react-icons/fi'
import { Button } from 'ui/components/buttons/button'
import { BlogPostPreview } from '../../components/blog-post-preview'
import { BlogRollHeader } from '../../components/blog-roll-header'

type PageProps = {
  params: {
    year: string
  }
}

export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await getAllPosts()
  const years = Array.from(
    new Set(
      posts
        .filter(post => post.meta.publicationDate?.getFullYear())
        .map(post => post.meta.publicationDate?.getFullYear())
    )
  )
  return years.map(year => ({ year: year!.toString() }))
}

export async function generateMetadata({ params: { year } }: PageProps) {
  const posts = await getAllPosts()
  const fromThisYear = posts.filter(
    post => post.meta.publicationDate?.getFullYear() === parseInt(year)
  )
  const count = fromThisYear.length
  const tags = Array.from(
    new Set(fromThisYear.flatMap(post => post.meta.tags ?? []))
  ).filter(tag => tag !== 'til')
  const tagsString =
    tags.length === 1
      ? tags[0]
      : tags.slice(0, tags.length - 1).join(', ') +
        ', and ' +
        tags[tags.length - 1]
  return {
    title: year,
    description: `I wrote ${count} article${
      count > 1 ? 's' : ''
    } in ${year}, about ${tagsString}`,
  }
}

export default async function YearIndex({ params: { year } }: PageProps) {
  const posts = await getAllPosts()
  const fromThisYear = posts.filter(
    post => post.meta.publicationDate?.getFullYear() === parseInt(year)
  )
  return (
    <>
      <BlogRollHeader title="Articles" />
      <Link href="/posts">
        <Button
          size="sm"
          className="rounded-full"
          variant="outline"
          leftIcon={<FiX />}
        >
          Clear filter {year}
        </Button>
      </Link>
      <section role="feed" aria-busy={false} className="mt-12 space-y-12">
        {fromThisYear.map(post => (
          <BlogPostPreview {...post} key={post.urlPath} />
        ))}
      </section>
    </>
  )
}
