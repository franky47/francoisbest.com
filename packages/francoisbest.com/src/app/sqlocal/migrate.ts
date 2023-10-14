import { desc, sql } from 'drizzle-orm'
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { db } from './db'
import { ServerMigration } from './migrations/defs'

function getClientMigrations() {
  return db.select().from(migrationTable).orderBy(desc(migrationTable.id))
}

const migrationTable = sqliteTable('__drizzle_migrations', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  hash: text('hash').notNull()
})

export async function migrate() {
  try {
    const migrationTableCreate = sql`
      CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
        id SERIAL PRIMARY KEY,
        name text NOT NULL,
        hash text NOT NULL
      )
    `
    await db.run(migrationTableCreate)
    const serverMigrations = await getServerMigrations()
    const clientMigrations = await getClientMigrations()
    console.dir({ serverMigrations, clientMigrations })
    let lastDbMigrationIndex = clientMigrations[0]?.id ?? -1
    console.dir({ lastDbMigrationIndex })
    for (const migration of serverMigrations) {
      console.dir({ lastDbMigrationIndex, migration })
      if (lastDbMigrationIndex === migration.index - 1) {
        console.log(`Applying migration ${migration.index}: ${migration.name}`)
        await db.transaction(async () => {
          await db.run(sql.raw(migration.sql))
          await db.insert(migrationTable).values({
            id: migration.index,
            name: migration.name,
            hash: migration.hash
          })
          const appliedMigrations = await getClientMigrations()
          console.dir({ appliedMigrations })
        })
        console.log(`Applied migration ${migration.index}: ${migration.name}`)
        lastDbMigrationIndex = migration.index
      }
    }
  } catch (error) {
    console.error('Migration failed:')
    console.error(error)
  }
}

async function getServerMigrations(): Promise<ServerMigration[]> {
  const res = await fetch('/sqlocal/migrations')
  return res.json()
}
