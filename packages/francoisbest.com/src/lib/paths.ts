import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const nextJsRootDir = path.resolve(__dirname, '../../')

export const repoRoot = path.resolve(nextJsRootDir, '../../')
export const nextJsAppDir = path.resolve(nextJsRootDir, 'src', 'app')
export const postsDir = path.resolve(
  nextJsAppDir,
  '(pages)',
  'posts',
  '(content)'
)

export function resolve(importMetaUrl: string, ...paths: string[]) {
  const dirname = path.dirname(fileURLToPath(importMetaUrl))
  return path.resolve(dirname, ...paths)
}

export function isBlogPost(filePath: string) {
  return filePath.startsWith(postsDir) && filePath.endsWith('/page.mdx')
}

export function filePathToUrlPath(filePath: string) {
  if (filePath.startsWith('file://')) {
    throw new Error(`Unexpected file:// URL in filePathToUrlPath: ${filePath}`)
  }
  return filePath
    .replace(nextJsAppDir, '') // Drop fs references to app dir location
    .replace(/\/\([\w-]+\)\//g, '/') // Remove route groups
    .replace(/\/page\.mdx$/, '') // Drop final page.mdx
}

export function url(routePath: string) {
  const base = process.env.DEPLOYMENT_URL ?? process.env.VERCEL_URL
  if (base) {
    return 'https://' + base + routePath
  }
  return 'http://localhost:3000' + routePath
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
