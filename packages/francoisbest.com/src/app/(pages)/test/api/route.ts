import { resolve } from 'lib/paths'
import { NextResponse } from 'next/server'
import fs from 'node:fs/promises'

export const dynamic = 'force-dynamic'

export async function GET() {
  const filePath = resolve(import.meta.url, '../relative.txt')
  const contents = await fs.readFile(filePath, 'utf-8')
  return NextResponse.json({ contents })
}
