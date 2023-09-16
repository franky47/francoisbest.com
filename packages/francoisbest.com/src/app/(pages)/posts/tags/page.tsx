import { getAllPosts } from 'lib/blog'
import { FiRss } from 'react-icons/fi'
import { LinkedTag } from 'ui/components/tag'

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
      <header className="flex items-baseline">
        <h1>{metadata.title}</h1>
        <nav className="not-prose text-sm text-gray-500 space-x-2 ml-auto">
          <FiRss
            className="inline-block -mt-1 stroke-amber-500"
            strokeWidth={3}
          />
          <a href="/posts/feed/rss.xml">RSS</a>
          <a href="/posts/feed/atom.xml">Atom</a>
          <a href="/posts/feed/articles.json">JSON</a>
        </nav>
      </header>
      <p>{metadata.description}</p>
      <nav className="mt-12 flex flex-wrap gap-4 not-prose">
        {Object.entries(sortedByFrequency).map(([tag, frequency]) => (
          <LinkedTag key={tag} href={`/posts/tags/${encodeURIComponent(tag)}`}>
            {decodeURIComponent(tag)} ({frequency})
          </LinkedTag>
        ))}
      </nav>
    </>
  )
}
