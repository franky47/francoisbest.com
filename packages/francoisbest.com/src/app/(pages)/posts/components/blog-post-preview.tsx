import { Post } from 'lib/blog'
import { HoverPrefetchLink } from 'ui/components/hover-prefetch-link'
import { formatDate } from 'ui/format'
import { TagsNav } from '../../../../ui/components/tag'

type BlogPostPreviewProps = Post & {
  Heading?: 'h2' | 'h3'
}

export const BlogPostPreview: React.FC<BlogPostPreviewProps> = ({
  meta: { title, publicationDate, description, tags },
  readingTime,
  urlPath,
  Heading = 'h2'
}) => {
  return (
    <article className="not-prose">
      <hgroup>
        <Heading
          className="mb-1 text-2xl font-bold"
          style={{ color: 'var(--tw-prose-headings)' }}
        >
          <HoverPrefetchLink href={urlPath}>{title}</HoverPrefetchLink>
        </Heading>
        <figcaption className="flex flex-wrap gap-y-1 text-sm text-gray-500">
          <span className="mr-2 inline-block">
            {publicationDate ? (
              formatDate(publicationDate)
            ) : (
              <span className="font-semibold italic text-amber-600">
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
