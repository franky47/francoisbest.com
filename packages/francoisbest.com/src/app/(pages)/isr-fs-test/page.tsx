import { nextJsRootDir, resolve } from 'lib/paths'
import fs from 'node:fs/promises'
import path from 'node:path'

export const metadata = {
  title: 'ISR Filesystem test',
}
export const revalidate = 60

export default async function ISRFSTestPage() {
  const now = new Date().toISOString().slice(11, 16)
  console.log(`[ISR-FS-TEST] Now: ${now}`)
  console.log(`[ISR-FS-TEST] process.cwd(): ${process.cwd()}`)
  const absPath = resolve(import.meta.url, './file.txt')
  console.log(`[ISR-FS-TEST] Abs path: ${absPath}`)
  const filePath = path.resolve(
    process.cwd(),
    absPath.replace(nextJsRootDir, '.')
  )
  console.log(`[ISR-FS-TEST] File path: ${filePath}`)
  const contents = await fs.readFile(filePath, 'utf-8')
  console.log(`[ISR-FS-TEST] Read: ${contents}`)
  return (
    <>
      <p>Page generated at: {now} UTC</p>
      <p>{contents}</p>
    </>
  )
}
