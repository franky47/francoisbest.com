'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { Button } from 'ui/components/buttons/button'

export const QuerySpy: React.FC = () => {
  const searchParams = useSearchParams()

  return (
    <figure className="not-prose !my-0">
      <figcaption className="flex items-center justify-between text-sm font-medium">
        <span>Query string</span>
        <Link href="?" replace scroll={false} tabIndex={-1}>
          <Button size="xs" variant="ghost">
            Clear
          </Button>
        </Link>
      </figcaption>
      <pre
        aria-label="Querystring spy - For browsers where the query is hard to see (eg: on mobile)"
        className="my-2 overflow-auto rounded-sm border border-gray-200 bg-gray-50/50 !p-2 text-sm dark:border-gray-800 dark:bg-gray-950 dark:shadow-inner"
      >
        {searchParams.size === 0 && (
          <span className="italic text-gray-500/50">{'<empty>'}</span>
        )}
        {Array.from(searchParams.entries()).map(([key, value], i) => (
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
