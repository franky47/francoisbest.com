'use client'

import React from 'react'
import { Input } from 'ui/components/forms/inputs'
import { FormControl, FormLabel } from 'ui/components/forms/structure'
import { addGrocery } from '../query'

export default function AddGrocery() {
  const [newItem, setNewItem] = React.useState('')

  const onAdd = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      addGrocery(newItem)
        .then(() => setNewItem(''))
        .catch(console.error)
    },
    [newItem]
  )
  return (
    <form onSubmit={onAdd} className="space-y-2">
      <FormControl>
        <FormLabel>Add item</FormLabel>
        <Input
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              onAdd(e)
            }
          }}
        />
      </FormControl>
    </form>
  )
}
