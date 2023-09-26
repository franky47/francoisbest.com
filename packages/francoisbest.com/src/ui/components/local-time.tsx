'use client'

import { formatDate, formatTime } from 'ui/format'

type DateLike = Date | string | number

export function LocalDate({ date }: { date: DateLike }) {
  // useHydration()
  return <time dateTime={new Date(date).toISOString()}>{formatDate(date)}</time>
}

export function LocalTime({ date }: { date: DateLike }) {
  // useHydration()
  return <time dateTime={new Date(date).toISOString()}>{formatTime(date)}</time>
}

export function LocalDateTime({ date }: { date: DateLike }) {
  // useHydration()
  return (
    <time dateTime={new Date(date).toISOString()}>
      {formatDate(date)}, {formatTime(date)}
    </time>
  )
}
