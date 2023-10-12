import Link from 'next/link'
import prettyBytes from 'pretty-bytes'
import React, { Suspense } from 'react'
import { readCacheEntry } from '../cache'
import { colors, font } from '../theme'
import { Await } from './await'
import { Tag } from './tag'

type EntryListItemProps = React.ComponentProps<'li'> & {
  id: string
  mountPath: string
}

export const EntryListItem: React.FC<EntryListItemProps> = ({
  id,
  mountPath,
  style = {},
  ...props
}) => {
  return (
    <li
      style={{
        display: 'flex',
        gap: '0.5rem',
        whiteSpace: 'nowrap',
        fontSize: font.xs,
        ...style,
      }}
      {...props}
    >
      <Suspense
        fallback={<code style={{ color: colors.gray[500] }}>{id}</code>}
      >
        <Await promise={readCacheEntry(id)}>
          {entry => (
            <>
              <Link href={`${mountPath}/entry/${id}`}>
                <code style={{ color: colors.gray[500] }} title={id}>
                  {id.slice(0, 8)}
                </code>{' '}
              </Link>
              <span
                style={{
                  width: '3rem',
                  textAlign: 'right',
                  color:
                    entry.data.body.length > 100_000
                      ? colors.red[500]
                      : entry.data.body.length > 10_000
                      ? colors.yellow[500]
                      : colors.green[500],
                  opacity: 0.5,
                }}
                title={`${entry.data.body.length} bytes`}
              >
                {prettyBytes(entry.data.body.length)}
              </span>
              <Link href={`${mountPath}/entry/${id}`}>
                <code>{entry.data.url}</code>
              </Link>
              {entry.data.tags.map(tag => (
                <Link
                  key={tag}
                  href={`${mountPath}/tag/${encodeURIComponent(tag)}`}
                >
                  <Tag>{tag}</Tag>
                </Link>
              ))}
            </>
          )}
        </Await>
      </Suspense>
    </li>
  )
}
