import { int, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const groceries = sqliteTable('groceries', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  ticked: integer('ticked', { mode: 'boolean' }).notNull()
})

export type Grocery = typeof groceries.$inferSelect
