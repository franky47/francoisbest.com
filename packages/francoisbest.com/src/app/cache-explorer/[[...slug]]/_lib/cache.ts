import { base64toUTF8 } from '@47ng/codec'
import fs from 'node:fs/promises'
import path from 'node:path'
import { z } from 'zod'
import { fetchCacheDir, tagsManifestFilePath } from './paths'

const cacheEntrySchema = z.object({
  kind: z.literal('FETCH'),
  data: z.object({
    headers: z.record(z.string()),
    body: z.string().transform(base64toUTF8),
    status: z.number(),
    tags: z.array(z.string()),
    url: z.string(),
  }),
  revalidate: z.number().optional(),
})
export type CacheEntry = z.infer<typeof cacheEntrySchema>

export async function readCacheEntry(id: string) {
  const filePath = path.resolve(fetchCacheDir, id)
  const contents = await fs.readFile(filePath, 'utf-8')
  return cacheEntrySchema.parse(JSON.parse(contents))
}

// --

const tagsManifestSchema = z.object({
  version: z.literal(1),
  items: z.record(
    z.object({
      keys: z.array(z.string()),
      revalidatedAt: z
        .number()
        .transform(v => new Date(v))
        .optional(),
    }),
  ),
})
export type TagsManifest = z.infer<typeof tagsManifestSchema>

export async function readTagsManifest() {
  try {
    const contents = await fs.readFile(tagsManifestFilePath, 'utf-8')
    return tagsManifestSchema.safeParse(JSON.parse(contents))
  } catch {
    return tagsManifestSchema.safeParse(null)
  }
}
