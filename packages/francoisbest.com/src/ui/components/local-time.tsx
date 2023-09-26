'use client'

import { Suspense } from 'react'
import { formatDate, formatTime } from 'ui/format'
import { useHydration } from 'ui/hooks/useHydration'

type Props = React.ComponentProps<'time'> & {
  date: Date | string | number
  hydratedSuffix?: React.ReactNode
}

export function LocalDate({ date, hydratedSuffix = null, ...props }: Props) {
  const iso = new Date(date).toISOString()
  const hydrated = useHydration()
  return (
    <Suspense key={hydrated ? 'local' : 'utc'}>
      <time dateTime={iso} title={iso} {...props}>
        {formatDate(date)}
        {hydrated ? hydratedSuffix : ' (UTC)'}
      </time>
    </Suspense>
  )
}

export function LocalTime({ date, hydratedSuffix = null, ...props }: Props) {
  const iso = new Date(date).toISOString()
  const hydrated = useHydration()
  return (
    <Suspense key={hydrated ? 'local' : 'utc'}>
      <time dateTime={iso} title={iso} {...props}>
        {formatDate(date)}
        {hydrated ? hydratedSuffix : ' (UTC)'}
      </time>
    </Suspense>
  )
}

export function LocalDateTime({
  date,
  separator = ', ',
  hydratedSuffix = null,
  ...props
}: Props & {
  separator?: string
}) {
  const iso = new Date(date).toISOString()
  const hydrated = useHydration()
  return (
    <Suspense key={hydrated ? 'local' : 'utc'}>
      <time dateTime={iso} title={iso} {...props}>
        {formatDate(date)}
        {separator}
        {formatTime(date)}
        {hydrated ? hydratedSuffix : ' (UTC)'}
      </time>
    </Suspense>
  )
}
