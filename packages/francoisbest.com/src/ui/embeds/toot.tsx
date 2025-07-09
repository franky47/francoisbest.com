import { TootMediaAttachment, fetchTootData } from 'lib/services/mastodon'
import Image from 'next/image'
import { BsMastodon } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'
import { LocalDateTime } from 'ui/components/local-time'
import { EmbedFrame } from './embed-frame'

type TootProps = React.ComponentProps<'section'> & {
  url: string
}

export const Toot: React.FC<TootProps> = async ({ url, className }) => {
  try {
    const data = await fetchTootData(url)
    return (
      <EmbedFrame
        Icon={BsMastodon}
        iconFill
        className={twMerge('mx-auto max-w-xl', className)}
      >
        <article className="not-prose space-y-3">
          <header className="flex items-center gap-3 pt-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.account.avatar}
              alt={data.account.username}
              width={48}
              height={48}
              className="h-12 w-12 rounded-sm"
            />
            <div className="leading-tight">
              <a
                href={data.account.url}
                className="font-medium"
                dangerouslySetInnerHTML={{
                  __html: data.account.display_name
                }}
              />
              <div className="text-sm text-gray-500">
                {data.account.username}
              </div>
            </div>
          </header>
          <section
            dangerouslySetInnerHTML={{ __html: data.content }}
            className="toot-content leading-normal"
          />
          <MediaSection attachments={data.media_attachments} />
          <nav className="text-sm text-gray-500">
            <a href={url}>
              <LocalDateTime date={data.created_at} />
            </a>
          </nav>
        </article>
      </EmbedFrame>
    )
  } catch (error) {
    return (
      <EmbedFrame
        Icon={BsMastodon}
        iconFill
        className={twMerge('mx-auto max-w-xl', className)}
        isError
      >
        <div className="not-prose">
          <p className="font-medium">Error displaying toot</p>
          <code className="text-sm text-red-500">{String(error)}</code>
          <p className="mt-2 text-sm underline">
            <a href={url}>Open on Mastodon</a>
          </p>
        </div>
      </EmbedFrame>
    )
  }
}

// --

type MediaSectionProps = {
  attachments: TootMediaAttachment[]
}

const MediaSection: React.FC<MediaSectionProps> = ({ attachments }) => {
  const images = attachments.filter(({ type }) => type === 'image')
  if (images.length === 0) {
    return null
  }
  if (images.length === 1) {
    const img = images[0]
    return (
      <Image
        src={img.url}
        alt={img.description ?? 'No description provided'}
        title={img.description ?? undefined}
        width={img.meta.small.width}
        height={img.meta.small.height}
        unoptimized
        className="w-full rounded-sm object-cover"
      />
    )
  }
  let containerClass =
    images.length === 2
      ? 'grid grid-cols-2 gap-2'
      : 'grid grid-cols-2 grid-rows-2 gap-2'
  let imgClasses = Array(images.length).fill(null)
  if (images.length === 3) {
    imgClasses[0] = 'row-span-2'
  }
  return (
    <section className={twMerge('h-80', containerClass)}>
      {images.map((img, i) => (
        <div key={img.url} className={twMerge('relative', imgClasses[i])}>
          <Image
            src={img.url}
            alt={img.description ?? 'No description provided'}
            title={img.description ?? undefined}
            placeholder="blur"
            blurDataURL={img.blurhash}
            fill
            unoptimized
            className="rounded-sm object-cover"
          />
        </div>
      ))}
    </section>
  )
}
