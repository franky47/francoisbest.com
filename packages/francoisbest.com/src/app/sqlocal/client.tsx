'use client'

import React from 'react'
import AddGrocery from './components/add-grocery'
import { GroceryItem } from './components/item'
import { StorageInfo } from './components/storage-info'
import { databaseReady, emitter } from './db'
import { getGroceries } from './query'
import type { Grocery } from './schema'

export default function SQLocalClient() {
  const [groceries, setGroceries] = React.useState<Grocery[]>([])

  React.useEffect(() => {
    const update = () => databaseReady.then(getGroceries).then(setGroceries)
    update()
    emitter.on('insert', update)
    emitter.on('update', update)
    emitter.on('delete', update)
    return () => {
      emitter.off('insert', update)
      emitter.off('update', update)
      emitter.off('delete', update)
    }
  }, [])

  return (
    <>
      <AddGrocery />
      {groceries.length === 0 ? (
        <p className="my-12 text-center text-gray-500">No groceries yet.</p>
      ) : (
        <ul className="my-8 space-y-1">
          {groceries.map(data => (
            <GroceryItem key={data.id} data={data} />
          ))}
        </ul>
      )}
      <StorageInfo />
    </>
  )
}
