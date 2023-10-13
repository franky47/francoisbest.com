import { z } from 'zod'

export const postMetadataSchema = z.object({
  title: z.string({ required_error: 'Posts must have a title' }),
  description: z.string({ required_error: 'Posts must have a description' }),
  publicationDate: z
    .union([z.string().transform(str => new Date(str)), z.date()])
    .optional(),
  tags: z.array(z.string()).optional()
})

export type PostMetadata = z.infer<typeof postMetadataSchema>
