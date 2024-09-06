import { NextResponse } from 'next/server'
import { getServerMigrations } from './defs'

export async function GET() {
  const migrations = await getServerMigrations()
  return NextResponse.json(migrations)
}
