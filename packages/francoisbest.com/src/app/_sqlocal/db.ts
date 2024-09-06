import { drizzle } from 'drizzle-orm/sqlite-proxy'
import mitt from 'mitt'
import { SQLocalDrizzle } from 'sqlocal/drizzle'
import { migrate } from './migrate'
import * as schema from './schema'

const { driver, ...client } = new SQLocalDrizzle('francoisbest.com.sqlite3')

export { client }

type EmitterEvents = {
  insert: { name: string; id: number; ticked: boolean }
  update: { name: string; id: number; ticked: boolean }
  delete: { id: number }
}

export const emitter = mitt<EmitterEvents>()

export const db = drizzle(driver, {
  schema,
  logger: true
})

// client.overwriteDatabaseFile(new File([], 'francoisbest.com.sqlite3'))

export const databaseReady = migrate()

databaseReady.then(async () => {
  client.createCallbackFunction(
    'onInsert',
    (_, id: number, name: string, ticked: boolean) => {
      emitter.emit('insert', {
        id,
        name,
        ticked
      })
    }
  )
  client.createCallbackFunction(
    'onUpdate',
    (_, id: number, name: string, ticked: boolean) => {
      emitter.emit('update', {
        id,
        name,
        ticked
      })
    }
  )
  client.createCallbackFunction('onDelete', (_, id: number) => {
    emitter.emit('delete', { id })
  })
  await client.sql`
    CREATE TEMP TRIGGER 'trigOnInsert' AFTER INSERT ON groceries
    BEGIN
      SELECT onInsert('groceries', new.id, new.name, new.ticked);
    END
  `
  await client.sql`
    CREATE TEMP TRIGGER 'trigOnUpdate' AFTER UPDATE ON groceries
    BEGIN
      SELECT onUpdate('groceries', new.id, new.name, new.ticked);
    END
  `
  await client.sql`
    CREATE TEMP TRIGGER 'trigOnDelete' AFTER DELETE ON groceries
    BEGIN
      SELECT onDelete('groceries', old.id);
    END
  `
})
