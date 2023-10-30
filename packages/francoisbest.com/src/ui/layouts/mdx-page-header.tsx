import { getPost } from 'lib/blog'
import { isBlogPost, resolve } from 'lib/paths'
import { formatDate } from 'ui/format'
import { TagsNav } from '../components/tag'

type MdxPageHeaderProps = {
  file: string
}

export const MdxPageHeader: React.FC<MdxPageHeaderProps> = async ({ file }) => {
  const filePath = resolve(file)
  if (!isBlogPost(filePath)) {
    return null
  }
  const post = await getPost(filePath)
  const { title, publicationDate, tags } = post.meta
  return (
    <figure role="header" className="not-prose">
      <h1 className="mb-4 mt-8 text-5xl font-bold leading-[1.15] text-gray-950 dark:text-gray-50">
        {title}
      </h1>
      <figcaption className="flex flex-wrap gap-2 text-sm text-gray-500">
        François Best&nbsp;•&nbsp;
        {publicationDate ? (
          formatDate(publicationDate)
        ) : (
          <span className="font-semibold italic text-amber-600">
            Unpublished
          </span>
        )}
        &nbsp;•&nbsp;{post.readingTime}
        {tags && Boolean(tags.length) && (
          <TagsNav tags={tags} className="ml-auto" />
        )}
      </figcaption>
    </figure>
  )
}
