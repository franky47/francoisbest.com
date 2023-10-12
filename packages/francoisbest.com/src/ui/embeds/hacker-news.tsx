import { SiYcombinator } from '@icons-pack/react-simple-icons'
import { getHackerNewsItem } from 'lib/services/hacker-news'
import { LocalDateTime } from 'ui/components/local-time'

type HackerNewsCommentProps = {
  url: string
}

export async function HackerNewsComment({ url }: HackerNewsCommentProps) {
  try {
    const data = await getHackerNewsItem(url)
    return (
      <blockquote className="hacker-news border-l-orange-500">
        <div dangerouslySetInnerHTML={{ __html: data.text }} />
        <figcaption className="flex !text-sm">
          <a
            href={`https://news.ycombinator.com/user?id=${data.by}`}
            className="text-current no-underline"
          >
            {data.by}
          </a>
          &nbsp;|&nbsp;
          <a href={url} className="text-current no-underline">
            <LocalDateTime date={data.time} />
          </a>
          <SiYcombinator
            title="Hacker News"
            className="ml-auto mr-3 inline-block text-orange-500"
            size={16}
          />
        </figcaption>
      </blockquote>
    )
  } catch (error) {
    console.error(error)
    return (
      <blockquote className="hacker-news border-l-orange-500">
        <p>
          Failed to fetch Hacker News item:
          <br />
          <span className="text-red-500">{String(error)}</span>
        </p>
        <a href={url}>{url}</a>
        <figcaption className="flex !text-sm">
          <SiYcombinator
            title="Hacker News"
            className="ml-auto mr-3 inline-block text-orange-500"
            size={16}
          />
        </figcaption>
      </blockquote>
    )
  }
}
