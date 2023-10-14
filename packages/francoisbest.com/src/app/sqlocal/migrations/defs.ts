import { globby } from 'globby'
import { resolve } from 'lib/paths'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { sha256 } from 'ui/components/hashvatar.server'

export type ServerMigration = {
  name: string
  sql: string
  hash: string
  index: number
}

const migrationNameRegex = /^(\d+)_(.+)\.sql$/

export async function getServerMigrations(): Promise<ServerMigration[]> {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const migrationFiles = await globby(['*.sql'], { cwd: __dirname })
  return Promise.all(
    migrationFiles.map(async file => {
      const filePath = resolve(import.meta.url, file)
      const sql = await fs.readFile(filePath, 'utf-8')
      if (!migrationNameRegex.test(file)) {
        throw new Error(`Invalid migration name: ${file}`)
      }
      const [, index, name] = migrationNameRegex.exec(file)!
      return {
        name,
        sql,
        hash: await sha256(sql),
        index: parseInt(index)
      }
    })
  )
}
