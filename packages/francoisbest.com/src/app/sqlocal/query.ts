import { asc, eq } from 'drizzle-orm'
import { db } from './db'
import { groceries } from './schema'

export function addGrocery(name: string) {
  return db.insert(groceries).values({ name, ticked: false })
}

export function tickGrocery(id: number, ticked = true) {
  return db.update(groceries).set({ ticked }).where(eq(groceries.id, id))
}

export function deleteGrocery(id: number) {
  return db.delete(groceries).where(eq(groceries.id, id))
}

export function getGroceries() {
  return db.select().from(groceries).orderBy(asc(groceries.id))
}
