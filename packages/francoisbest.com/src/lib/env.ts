import { z } from 'zod'

const envSchema = z.object({
  SPOTIFY_CLIENT_ID: z.string(),
  SPOTIFY_CLIENT_SECRET: z.string()
})

export const env = envSchema.parse(process.env)
