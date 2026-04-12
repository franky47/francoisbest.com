import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const nextJsRootDir = path.resolve(__dirname, '../../')
const repoRoot = path.resolve(nextJsRootDir, '../../')

export function resolve(importMetaUrl: string, ...paths: string[]) {
  const filePath = fileURLToPath(importMetaUrl)
  const dirname = path.dirname(filePath)
  const fileName = path.basename(filePath)
  const absPath = path.resolve(
    dirname,
    ...(paths.length === 0 ? [fileName] : paths)
  )
  return path.resolve(process.cwd(), absPath.replace(nextJsRootDir, '.'))
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
