import { FiRss } from 'react-icons/fi'

type BlogRollHeaderProps = {
  title: React.ReactNode
  description?: React.ReactNode
}

export const BlogRollHeader: React.FC<BlogRollHeaderProps> = ({
  title,
  description = 'I usually write about stuff. Not regularly.',
}) => {
  return (
    <>
      <header className="flex items-baseline">
        <h1>{title}</h1>
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
      <p>{description}</p>
    </>
  )
}
