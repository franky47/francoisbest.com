import 'server-only'
import { createPngDataUri } from 'unlazy/blurhash'
import { z } from 'zod'

const mediaAttachmentSchema = z
  .object({
    type: z.union([
      z.literal('unknown'),
      z.literal('image'),
      z.literal('gifv'),
      z.literal('video'),
      z.literal('audio'),
    ]),
    url: z.string().url(),
    meta: z.object({
      small: z.object({
        width: z.number(),
        height: z.number(),
      }),
    }),
    description: z.string().nullable(),
    blurhash: z.string(),
  })
  .transform(async obj => {
    obj.blurhash = createPngDataUri(obj.blurhash, { size: 9 })
    return obj
  })

const emojiSchema = z.object({
  shortcode: z.string(),
  url: z.string().url(),
})

type Emoji = z.infer<typeof emojiSchema>

const tootDataSchema = z.object({
  created_at: z.string().datetime(),
  content: z.string(),
  account: z.object({
    username: z.string(),
    display_name: z.string(),
    avatar: z.string().url(),
    url: z.string().url(),
    emojis: z.array(emojiSchema),
  }),
  emojis: z.array(emojiSchema),
  media_attachments: z.array(mediaAttachmentSchema),
})

export type TootMediaAttachment = z.infer<typeof mediaAttachmentSchema>

export async function fetchTootData(tootUrl: string) {
  const url = new URL(tootUrl)
  const match = url.pathname.match(/^\/@.+\/(\d+)$/)
  if (!match) {
    throw new Error(`Invalid toot URL: ${tootUrl}`)
  }
  const tootId = match[1]
  url.pathname = `/api/v1/statuses/${tootId}`
  const response = await (
    await fetch(url, {
      next: {
        revalidate: 86_400,
      },
    })
  ).json()
  const data = await tootDataSchema.parseAsync(response)
  if (!data.account.display_name) {
    data.account.display_name = data.account.username
  }
  data.account.username = `@${data.account.username}@${url.hostname}`
  data.account.display_name = injectEmojis(
    data.account.display_name,
    data.account.emojis
  )
  data.content = injectEmojis(data.content, data.emojis)
  return data
}

function injectEmojis(source: string, emojis: Emoji[]) {
  for (const { shortcode, url } of emojis) {
    source = source.replace(
      `:${shortcode}:`,
      `<img src="${url}" alt=":${shortcode}:" title=":${shortcode}:" draggable="false" width="1em" height="1em" style="width:1em;height:1em;margin-top:-1px;display:inline;">`
    )
  }
  return source
}
