import Link from 'next/link'
import { Suspense } from 'react'
import { twMerge } from 'tailwind-merge'
import { readCacheEntry } from '../cache'
import { Await } from './await'
import { Tag } from './tag'

type EntryListItemProps = React.ComponentProps<'li'> & {
  id: string
  mountPath: string
}

export const EntryListItem: React.FC<EntryListItemProps> = ({
  id,
  mountPath,
  className,
  ...props
}) => {
  return (
    <li className={twMerge('whitespace-nowrap text-xs', className)} {...props}>
      <Suspense fallback={<code className="text-gray-500 text-sm">{id}</code>}>
        <Await promise={readCacheEntry(id)}>
          {entry => (
            <>
              <Link href={`${mountPath}/entry/${id}`}>
                <code className="text-gray-500">{id.slice(0, 8)}</code>{' '}
                <code>{entry.data.url}</code>{' '}
              </Link>
              {entry.data.tags.map(tag => (
                <Link
                  key={tag}
                  href={`${mountPath}/tag/${encodeURIComponent(tag)}`}
                >
                  <Tag className="mr-2 text-xs">{tag}</Tag>
                </Link>
              ))}
            </>
          )}
        </Await>
      </Suspense>
    </li>
  )
}
