import { globby } from 'globby'
import fs from 'node:fs/promises'
import path from 'node:path'
import readingTime from 'reading-time'
import 'server-only'
import { filePathToUrlPath, nextJsAppDir, postsDir } from '../paths'
import { PostMetadata, postMetadataSchema } from './defs'

export type Post = {
  filePath: string
  urlPath: string
  meta: PostMetadata
  ogImageUrlPath?: string
  readingTime: string
}

export async function getAllPosts() {
  const mdxFiles = await listAllMdxFiles()
  const allPosts = await Promise.all(mdxFiles.map(getPost))
  // Drafts first in lexicographic order, then newest on top
  return allPosts.sort((a, b) => {
    const aPub = a.meta.publicationDate?.valueOf() ?? Infinity
    const bPub = b.meta.publicationDate?.valueOf() ?? Infinity
    if (aPub === bPub) {
      return a.meta.title > b.meta.title ? 1 : -1
    }
    return aPub > bPub ? -1 : 1
  })
}

async function listAllMdxFiles(sourceDir = postsDir): Promise<string[]> {
  // const tick = performance.now()
  const files = await globby(['**/page.mdx'], { cwd: sourceDir })
  // console.trace(
  //   `${process.pid} listAllMdxFiles (${performance.now() - tick}ms)`
  // )
  // Return absolute paths
  return files.map(file => path.resolve(sourceDir, file))
}

export async function getPost(filePath: string): Promise<Post> {
  // const tick = performance.now()
  const urlPath = filePathToUrlPath(filePath)
  const contents = await fs.readFile(filePath, 'utf-8')
  const metadataHeader = contents.slice(0, contents.indexOf('\n}\n') + 2)
  const articleBody = contents.slice(metadataHeader.length)
  try {
    const meta = postMetadataSchema.parse(
      new Function(
        metadataHeader.replace(/^export const metadata =/, 'return')
      )()
    )
    const ogImageUrlPath = await getOpenGraphImageUrlPath(filePath)
    if (meta.publicationDate && !ogImageUrlPath) {
      console.warn(`Missing OpenGraph image for published post ${urlPath}`)
    }
    return {
      meta,
      ogImageUrlPath,
      readingTime: readingTime(articleBody).text,
      filePath,
      urlPath
    }
  } catch (error) {
    console.error(`Failed to parse metadata for post ${urlPath}:`)
    console.error(metadataHeader)
    throw error
  } finally {
    // console.trace(
    //   `${process.pid} getPost ${filePath} (${performance.now() - tick}ms)`
    // )
  }
}

/**
 * Next.js injects a suffix for og:images when under a route group, see
 * https://github.com/vercel/next.js/pull/47985
 * In order to correctly resolve the right URLs, we're replicating this here.
 */
async function getOpenGraphImageUrlPath(pageFilePath: string) {
  const extensions = ['jpg', 'png']
  for (const ext of extensions) {
    const ogPath = path.resolve(
      path.dirname(pageFilePath),
      `opengraph-image.${ext}`
    )
    try {
      const stat = await fs.stat(ogPath)
      if (!stat.isFile()) {
        continue
      }
      const segment = path.dirname(ogPath.replace(nextJsAppDir, ''))
      const suffix = djb2Hash(segment)
      return filePathToUrlPath(
        ogPath.replace(new RegExp(`\\.${ext}$`), `-${suffix}.${ext}`)
      )
    } catch {
      continue
    }
  }
  return undefined
}

// http://www.cse.yorku.ca/~oz/hash.html
function djb2Hash(str: string) {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) + hash + char
  }
  return Math.abs(hash).toString(36).slice(0, 6)
}
