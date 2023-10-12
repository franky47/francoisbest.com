import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const fetchCacheDir = path.resolve(
  process.cwd(),
  '.next',
  'cache',
  'fetch-cache',
)
export const tagsManifestFilePath = path.resolve(
  fetchCacheDir,
  'tags-manifest.json',
)

export const packageJsonPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../package.json',
)
