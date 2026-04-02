import fs from 'node:fs'
import path from 'node:path'
import readingTime from 'reading-time'

const CONTENT_DIR = path.join(process.cwd(), 'content/blog')

export function computeReadingTime(slug: string[]): string {
  const filePath = path.join(CONTENT_DIR, ...slug, 'index.mdx')
  const content = fs.readFileSync(filePath, 'utf-8')
  // Strip YAML frontmatter before computing
  const body = content.replace(/^---\n[\s\S]*?\n---/, '')
  return readingTime(body).text
}
