import { z } from 'zod'
import { sanitizeHTML } from './html-sanitizer'

const hackerNewsId = z.number().int().positive()

const hackerNewsItemSchema = z.object({
  id: hackerNewsId,
  type: z.enum([
    // 'job',
    'story',
    'comment',
    // 'poll',
    // 'pollopt',
  ]),
  by: z.string(),
  text: z.string().transform(html => sanitizeHTML(html.trim())),
  time: z.number().transform(t => new Date(t * 1000)),
  // descendants: z.number().int().positive().optional(),
  // parent: hackerNewsId.optional(),
  // kids: z.array(hackerNewsId).optional().default([]),
  // deleted: z.boolean().optional(),
  // dead: z.boolean().optional(),
  // score: z.number().int().positive().optional(),
})

export type HackerNewsItem = z.infer<typeof hackerNewsItemSchema>

const hnUrlRegexp = /^https?:\/\/news\.ycombinator\.com\/item\?id=(\d+)$/

export async function getHackerNewsItem(url: string) {
  const match = hnUrlRegexp.exec(url)
  if (!match) {
    throw new Error('Invalid Hacker News URL')
  }
  const id = parseInt(match[1], 10)
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  )
  const item = await res.json()
  return hackerNewsItemSchema.parse(item)
}
