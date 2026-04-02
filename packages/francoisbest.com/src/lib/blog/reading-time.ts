import fs from 'node:fs/promises'
import path from 'node:path'
import readingTime from 'reading-time'

const CONTENT_DIR = path.join(process.cwd(), 'content/blog')

export async function computeReadingTime(slug: string[]): Promise<string> {
  const filePath = path.join(CONTENT_DIR, ...slug, 'index.mdx')
  const content = await fs.readFile(filePath, 'utf-8')
  // Strip YAML frontmatter before computing
  const body = content.replace(/^---\n[\s\S]*?\n---/, '')
  return readingTime(body).text
}
