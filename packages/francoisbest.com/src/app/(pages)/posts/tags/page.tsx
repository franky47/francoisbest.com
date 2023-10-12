import { getAllPosts } from 'lib/blog'
import { LinkedTag } from 'ui/components/tag'
import { BlogRollHeader } from '../components/blog-roll-header'

export const metadata = {
  title: 'Tags',
  description: 'A list of the common topics I talk about',
}

export default async function TagsIndex() {
  const posts = await getAllPosts()
  // Count tag frequency
  const tags = posts
    .flatMap(post => post.meta.tags ?? [])
    .map(decodeURIComponent)
    .reduce(
      (dict, tag) => ({
        ...dict,
        [tag]: (dict[tag] ?? 0) + 1,
      }),
      {} as Record<string, number>
    )
  const sortedByFrequency = Object.fromEntries(
    Object.entries(tags).sort(([, a], [, b]) => b - a)
  )

  return (
    <>
      <BlogRollHeader title="Articles" description={metadata.description} />
      <nav className="not-prose mt-12 flex flex-wrap gap-4">
        {Object.entries(sortedByFrequency).map(([tag, frequency]) => (
          <LinkedTag key={tag} href={`/posts/tags/${tag}`}>
            {tag} ({frequency})
          </LinkedTag>
        ))}
      </nav>
    </>
  )
}
