import { resolve } from 'lib/paths'
import fs from 'node:fs/promises'

export const dynamic = 'force-dynamic'

export default async function ISRTestPage() {
  const filePath = resolve(import.meta.url, '../relative.txt')
  const contents = await fs.readFile(filePath, 'utf-8')
  return (
    <section>
      <p>Page generated at {new Date().toISOString().slice(11, 16)}</p>
      <p>{contents}</p>
    </section>
  )
}
