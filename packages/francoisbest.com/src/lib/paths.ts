import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const nextJsRootDir = path.resolve(__dirname, '../../')
export const repoRoot = path.resolve(nextJsRootDir, '../../')
export const nextJsAppDir = path.resolve(nextJsRootDir, 'src', 'app')
export const postsDir = path.resolve(
  nextJsAppDir,
  '(pages)',
  'posts',
  '(content)'
)

export function resolve(importMetaUrl: string, ...paths: string[]) {
  const filePath = fileURLToPath(importMetaUrl)
  const dirname = path.dirname(filePath)
  const fileName = path.basename(filePath)
  const absPath = path.resolve(
    dirname,
    // This makes sure that if only the import.meta.url is passed,
    // we resolve to the same file. Otherwise, allow relative paths.
    ...(paths.length === 0 ? [fileName] : paths)
  )
  // Required for ISR serverless functions to pick up the file path
  // as a dependency to bundle.
  return path.resolve(process.cwd(), absPath.replace(nextJsRootDir, '.'))
}

export function isBlogPost(filePath: string) {
  const relativePath = filePath.slice(filePath.indexOf('francoisbest.com'))
  const relativeBase = postsDir.slice(postsDir.indexOf('francoisbest.com'))
  console.dir({ relativePath, relativeBase })
  return relativePath.startsWith(relativeBase) && filePath.endsWith('/page.mdx')
}

export function filePathToUrlPath(filePath: string) {
  if (filePath.startsWith('file://')) {
    throw new Error(`Unexpected file:// URL in filePathToUrlPath: ${filePath}`)
  }
  return filePath
    .replace(nextJsAppDir, '') // Drop fs references to app dir location
    .replace(/\/\([\w-]+\)\//g, '/') // Remove route groups
    .replace(/\/page\.(md|ts)x?$/, '') // Drop final page.mdx or tsx
}

export function url(routePath: string) {
  const base = process.env.DEPLOYMENT_URL ?? process.env.VERCEL_URL
  if (base) {
    return `https://${base}${routePath}`
  }
  return `http://localhost:${process.env.PORT ?? 3000}` + routePath
}

export function gitHubUrl(
  filePath: string,
  branch = process.env.VERCEL_GIT_COMMIT_REF ?? 'next'
) {
  return filePath.replace(
    repoRoot,
    `https://github.com/franky47/francoisbest.com/blob/${branch}`
  )
}

export function hnDiscussionUrl(filePath: string) {
  const pageUrl = url(filePathToUrlPath(filePath))
  return `https://hn.algolia.com/?q=${encodeURIComponent(pageUrl)}`
}
