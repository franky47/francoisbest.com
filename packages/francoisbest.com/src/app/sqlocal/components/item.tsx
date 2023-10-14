import { ChangeEvent } from 'react'
import { twJoin } from 'tailwind-merge'
import { Button } from 'ui/components/buttons/button'
import { deleteGrocery, tickGrocery } from '../query'
import type { Grocery } from '../schema'

type GroceryItemProps = React.ComponentProps<'li'> & {
  data: Grocery
}

export function GroceryItem({ data, ...props }: GroceryItemProps) {
  const onTick = (e: ChangeEvent<HTMLInputElement>) => {
    tickGrocery(data.id, e.target.checked).catch(console.error)
  }
  const onDelete = () => {
    deleteGrocery(data.id).catch(console.error)
  }

  return (
    <li
      {...props}
      className={twJoin('flex items-center gap-2', data.ticked && 'opacity-50')}
    >
      <input type="checkbox" checked={data.ticked} onChange={onTick} />
      <span>{data.name}</span>
      <Button variant="ghost" size="xs" onClick={onDelete} className="ml-auto">
        x
      </Button>
    </li>
  )
}
