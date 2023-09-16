import fs from 'node:fs/promises'
import path from 'node:path'

export const metadata = {
  title: 'ISR Filesystem test',
}
export const revalidate = 60

export default async function ISRFSTestPage() {
  const now = new Date().toISOString().slice(11, 16)
  console.log(`[ISR-FS-TEST] process.cwd(): ${process.cwd()}`)
  console.log(`[ISR-FS-TEST] Now: ${now}`)
  const filePath = path.resolve(
    process.cwd(),
    './packages/francoisbest.com/src/app/(pages)/isr-fs-test/file.txt'
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
