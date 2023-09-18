import { resolve } from 'lib/paths'
import { NextResponse } from 'next/server'
import fs from 'node:fs/promises'

export const dynamic = 'force-dynamic'

export async function GET() {
  const path = resolve(import.meta.url, '../../../package.json')
  const contents = await fs.readFile(path, 'utf8')
  return NextResponse.json({ contents })
}
