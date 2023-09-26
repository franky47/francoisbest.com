'use client'

import { Suspense } from 'react'
import { formatDate, formatTime } from 'ui/format'
import { useHydration } from 'ui/hooks/useHydration'

type DateLike = Date | string | number

export function LocalDate({ date }: { date: DateLike }) {
  const hydrated = useHydration()
  return (
    <Suspense key={hydrated ? 'local' : 'utc'}>
      <time dateTime={new Date(date).toISOString()}>
        {formatDate(date)}
        {hydrated ? '' : ' (UTC)'}
      </time>
    </Suspense>
  )
}

export function LocalTime({ date }: { date: DateLike }) {
  const hydrated = useHydration()
  return (
    <Suspense key={hydrated ? 'local' : 'utc'}>
      <time dateTime={new Date(date).toISOString()}>
        {formatDate(date)}
        {hydrated ? '' : ' (UTC)'}
      </time>
    </Suspense>
  )
}

export function LocalDateTime({ date }: { date: DateLike }) {
  const hydrated = useHydration()
  return (
    <Suspense key={hydrated ? 'local' : 'utc'}>
      <time dateTime={new Date(date).toISOString()}>
        {formatDate(date)}, {formatTime(date)}
        {hydrated ? '' : ' (UTC)'}
      </time>
    </Suspense>
  )
}
