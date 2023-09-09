import { getPost } from 'lib/blog'
import { isBlogPost } from 'lib/paths'
import { fileURLToPath } from 'node:url'
import { formatDate } from 'ui/format'
import { TagsNav } from '../components/tag'

type MdxPageHeaderProps = {
  file: string
}

export const MdxPageHeader: React.FC<MdxPageHeaderProps> = async ({ file }) => {
  const filePath = fileURLToPath(file)
  if (!isBlogPost(filePath)) {
    return null
  }
  const post = await getPost(filePath)
  const { title, publicationDate, tags } = post.meta
  return (
    <figure role="header" className="not-prose">
      <h1 className="text-gray-950 dark:text-gray-50 text-5xl font-bold mt-8 mb-4 leading-[1.15]">
        {title}
      </h1>
      <figcaption className="flex flex-wrap gap-2 text-gray-500 text-sm">
        François Best&nbsp;•&nbsp;
        {publicationDate ? (
          formatDate(publicationDate)
        ) : (
          <span className="text-amber-600 font-semibold italic">
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
