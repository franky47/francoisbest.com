import { Post } from 'lib/blog'
import Link from 'next/link'
import { formatDate } from 'ui/format'
import { TagsNav } from '../../../../ui/components/tag'

type BlogPostPreviewProps = Post & {
  Heading?: 'h2' | 'h3'
}

export const BlogPostPreview: React.FC<BlogPostPreviewProps> = ({
  meta: { title, publicationDate, description, tags },
  readingTime,
  urlPath,
  Heading = 'h2',
}) => {
  return (
    <article className="not-prose">
      <hgroup>
        <Heading
          className="text-2xl font-bold mb-1"
          style={{ color: 'var(--tw-prose-headings)' }}
        >
          <Link href={urlPath}>{title}</Link>
        </Heading>
        <figcaption className="flex text-gray-500 text-sm flex-wrap gap-y-1">
          <span className="inline-block mr-2">
            {publicationDate ? (
              formatDate(publicationDate)
            ) : (
              <span className="text-amber-600 font-semibold italic">
                Unpublished
              </span>
            )}
            &nbsp;•&nbsp;{readingTime}
          </span>
          {tags && Boolean(tags.length) && <TagsNav tags={tags} />}
        </figcaption>
      </hgroup>
      <p className="mt-3 leading-relaxed">{description}</p>
    </article>
  )
}
