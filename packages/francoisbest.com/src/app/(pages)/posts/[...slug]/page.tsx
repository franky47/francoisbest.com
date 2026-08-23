import { getAllPosts, getPost } from 'lib/blog'
import { computeReadingTime } from 'lib/blog/reading-time'
import { getMdxComponents } from 'lib/mdx-components'
import { url } from 'lib/paths'
import { blogSource } from 'lib/source'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { HireMe } from 'ui/components/hire-me'
import { Logo } from 'ui/components/logo'
import { TagsNav } from 'ui/components/tag'
import { formatDate } from 'ui/format'

type PageProps = {
  params: Promise<{ slug: string[] }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = blogSource.getPage(slug)
  if (!page) return {}
  const post = await getPost(slug)
  return {
    title: page.data.title,
    description: page.data.description,
    ...(post?.ogImageExtension && {
      openGraph: {
        images: [{ url: url(`/posts/og/${slug.join('/')}`) }]
      }
    }),
    ...(page.data.canonical && {
      alternates: { canonical: page.data.canonical }
    })
  }
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params
  const page = blogSource.getPage(slug)
  if (!page) notFound()

  const { body: Content, title, publicationDate, tags } = page.data
  const readingTimeText = await computeReadingTime(slug)
  const slugPath = slug.join('/')
  const editUrl = `https://github.com/franky47/francoisbest.com/blob/next/packages/francoisbest.com/content/blog/${slugPath}/index.mdx`
  const hnUrl = `https://hn.algolia.com/?q=${encodeURIComponent(url(`/posts/${slugPath}`))}`
  const separator = <>&nbsp;•&nbsp;</>
  // SAFETY: Fumadocs and MDX expose structurally compatible component maps.
  const mdxComponents = getMdxComponents() as any

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
          {separator}
          {readingTimeText}
          {tags && Boolean(tags.length) && (
            <TagsNav tags={tags} className="ml-auto" />
          )}
        </figcaption>
      </figure>

      {/* Post Content */}
      <Content components={mdxComponents} />

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
