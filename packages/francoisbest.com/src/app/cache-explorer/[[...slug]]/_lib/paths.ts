import path from 'node:path'

export const fetchCacheDir = path.resolve(
  process.cwd(),
  '.next',
  'cache',
  'fetch-cache'
)
export const tagsManifestFilePath = path.resolve(
  fetchCacheDir,
  'tags-manifest.json'
)
