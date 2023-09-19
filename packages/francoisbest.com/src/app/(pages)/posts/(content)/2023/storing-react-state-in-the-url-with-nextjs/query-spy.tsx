'use client'

import { subscribeToQueryUpdates } from 'next-usequerystate'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { Button } from 'ui/components/buttons/button'

export const QuerySpy: React.FC = () => {
  const initialSearchParams = useSearchParams()
  const [search, setSearch] = React.useState<URLSearchParams>(() => {
    if (typeof location !== 'object') {
      // SSR
      const out = new URLSearchParams()
      if (!initialSearchParams) {
        return out
      }
      for (const [key, value] of initialSearchParams) {
        out.set(key, value)
      }
      return out
    } else {
      return new URLSearchParams(location.search)
    }
  })

  React.useLayoutEffect(
    () => subscribeToQueryUpdates(({ search }) => setSearch(search)),
    []
  )

  return (
    <figure className="not-prose !my-0">
      <figcaption className="text-sm font-medium flex justify-between items-center">
        <span>Query string</span>
        <Link href="?" replace scroll={false} tabIndex={-1}>
          <Button size="xs" variant="ghost">
            Clear
          </Button>
        </Link>
      </figcaption>
      <pre
        aria-label="Querystring spy"
        aria-description="For browsers where the query is hard to see (eg: on mobile)"
        className="text-sm bg-gray-50/50 dark:bg-gray-950 border dark:border-gray-800 dark:shadow-inner rounded !p-2 my-2 overflow-auto"
      >
        {search.size === 0 && (
          <span className="italic text-gray-500/50">{'<empty>'}</span>
        )}
        {Array.from(search.entries()).map(([key, value], i) => (
          <React.Fragment key={key + value + i}>
            <span className="text-gray-500">{i === 0 ? '?' : '&'}</span>
            <span className="text-blue-600 dark:text-blue-400">{key}</span>
            <span className="text-current">=</span>
            <span className="text-pink-600 dark:text-pink-400">
              {value.replaceAll(' ', '+')}
            </span>
          </React.Fragment>
        ))}
      </pre>
    </figure>
  )
}
