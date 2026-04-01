import { getAllPosts } from 'lib/blog'
import { getMdxComponents } from 'lib/mdx-components'
import { blogSource } from 'lib/source'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatDate } from 'ui/format'
import { HireMe } from 'ui/components/hire-me'
import { Logo } from 'ui/components/logo'
import { TagsNav } from 'ui/components/tag'
import { url } from 'lib/paths'

type PageProps = {
  params: Promise<{ slug: string[] }>
}

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = blogSource.getPage(slug)
  if (!page) return {}
  return {
    title: page.data.title,
    description: page.data.description
  }
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params
  const page = blogSource.getPage(slug)
  if (!page) notFound()

  const data = page.data as typeof page.data & {
    body: React.ComponentType<{ components?: Record<string, React.ComponentType> }>
    publicationDate?: Date
    tags?: string[]
  }
  const Content = data.body

  const { title, publicationDate, tags } = data
  const slugPath = slug.join('/')
  const editUrl = `https://github.com/franky47/francoisbest.com/blob/next/packages/francoisbest.com/content/blog/${slugPath}/index.mdx`
  const hnUrl = `https://hn.algolia.com/?q=${encodeURIComponent(url(`/posts/${slugPath}`))}`
  const separator = <>&nbsp;•&nbsp;</>

  return (
    <article>
      {/* Post Header */}
      <figure role="header" className="not-prose">
        <h1 className="mb-4 mt-8 text-5xl font-bold leading-[1.15] text-gray-950 dark:text-gray-50">
          {title}
        </h1>
        <figcaption className="flex flex-wrap gap-2 text-sm text-gray-500">
          François Best{separator}
          {publicationDate ? (
            formatDate(publicationDate)
          ) : (
            <span className="font-semibold italic text-amber-600">
              Unpublished
            </span>
          )}
          {tags && Boolean(tags.length) && (
            <TagsNav tags={tags} className="ml-auto" />
          )}
        </figcaption>
      </figure>

      {/* Post Content */}
      <Content components={getMdxComponents() as any} />

      {/* Post Footer */}
      <hr />
      <div className="not-prose flex items-center">
        <Logo size={16} />
        <div className="ml-4">
          <Link href="/" className="text-xl font-bold">
            François Best
          </Link>
          <p>Freelance developer & founder</p>
          <nav className="mt-1 text-sm font-medium">
            <a href="https://github.com/47ng" className="underline">
              47ng
            </a>
            {separator}
            <a href="https://chiffre.io" className="underline">
              {' '}
              Chiffre.io
            </a>
          </nav>
        </div>
      </div>

      <HireMe outerClass="mt-12" />

      <nav
        role="list"
        className="!mt-12 flex flex-col items-center gap-4 text-center text-sm sm:block"
      >
        <a role="listitem" href={editUrl} className="!text-gray-500">
          Edit this page on GitHub
        </a>
        <span className="hidden text-gray-500 sm:inline">{separator}</span>
        <a role="listitem" href={hnUrl} className="!text-gray-500">
          Discuss on Hacker News
        </a>
      </nav>
    </article>
  )
}
