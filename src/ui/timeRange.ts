import React from 'react'
import dayjs, { OpUnitType } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import isoWeek from 'dayjs/plugin/isoWeek'
import timezone from 'dayjs/plugin/timezone'
import { queryTypes, useQueryStates } from 'next-usequerystate'

dayjs.extend(utc)
dayjs.extend(isoWeek)
dayjs.extend(timezone)

dayjs.tz.setDefault('Europe/Paris')

const timeRangeKeys = {
  from: queryTypes.string,
  to: queryTypes.string,
  step: queryTypes.string
}

// --

export interface TimeRange {
  from: string
  to: string
  label?: string
  step?: string
}

export interface TimestampRange {
  from: number
  to: number
  step?: number
}

export const timeRanges: TimeRange[] = [
  { from: 'now-5m', to: 'now', step: '10s', label: 'Last 5 minutes' },
  { from: 'now-15m', to: 'now', step: '30s', label: 'Last 15 minutes' },
  { from: 'now-30m', to: 'now', step: '1m', label: 'Last 30 minutes' },
  { from: 'now-1h', to: 'now', step: '1m', label: 'Last 1 hour' },
  { from: 'now-3h', to: 'now', step: '5m', label: 'Last 3 hours' },
  { from: 'now-6h', to: 'now', step: '10m', label: 'Last 6 hours' },
  { from: 'now-12h', to: 'now', step: '15m', label: 'Last 12 hours' },
  { from: 'now-24h', to: 'now', step: '30m', label: 'Last 24 hours' },
  { from: 'now-2d', to: 'now', step: '1h', label: 'Last 2 days' },
  { from: 'now-7d', to: 'now', step: '4h', label: 'Last 7 days' },
  { from: 'now-14d', to: 'now', step: '1d', label: 'Last 14 days' },
  { from: 'now-30d', to: 'now', step: '1d', label: 'Last 30 days' },
  { from: 'now-90d', to: 'now', step: '1d', label: 'Last 90 days' },
  { from: 'now-6M', to: 'now', step: '1w', label: 'Last 6 months' },
  { from: 'now-1d<d', to: 'now-1d>d', step: '30m', label: 'Yesterday' },
  {
    from: 'now-2d<d',
    to: 'now-2d>d',
    step: '30m',
    label: 'Day before yesterday'
  },
  {
    from: 'now-7d<d',
    to: 'now-7d>d',
    step: '30m',
    label: 'This day last week'
  },
  { from: 'now-1w<w', to: 'now-1w>w', step: '4h', label: 'Previous week' },
  { from: 'now-1M<M', to: 'now-1M>M', step: '1d', label: 'Previous month' },
  { from: 'now-1y<y', to: 'now-1y>y', step: '1w', label: 'Previous year' },
  { from: 'now<d', to: 'now>d', step: '30m', label: 'Today' },
  { from: 'now<d', to: 'now', step: '30m', label: 'Today so far' },
  { from: 'now<w', to: 'now>w', step: '4h', label: 'This week' },
  { from: 'now<w', to: 'now', step: '4h', label: 'This week so far' },
  { from: 'now<M', to: 'now>M', step: '1d', label: 'This month' },
  { from: 'now<M', to: 'now', step: '1d', label: 'This month so far' },
  { from: 'now<y', to: 'now>y', step: '1w', label: 'This year' },
  { from: 'now<y', to: 'now', step: '1w', label: 'This year so far' }
]

export const defaultTimeRange: TimeRange = {
  from: 'now-24h',
  to: 'now',
  step: '30m',
  label: 'Last 24 hours'
}

// --

export interface ParsedQuery {
  absoluteValue?: number
  relativeValue?: number
  unit?: OpUnitType
  roundUnit?: 'd' | 'isoWeek' | 'M' | 'y'
  roundTo?: 'start' | 'end'
}

export function parseTimeRangeQuery(query: string | null): ParsedQuery | null {
  if (query === null) {
    return null
  }
  if (query === 'now') {
    return {
      relativeValue: 0
    }
  }
  const asNumber = parseInt(query)
  if (Number.isInteger(asNumber) && asNumber >= 0) {
    return {
      absoluteValue: asNumber
    }
  }
  const match = query.match(
    /^now(?:([\+-])(\d+)([mhdwMy]))?(?:([<>])([dwMy]))?$/
  )
  if (!match) {
    // Unknown format
    return null
  }
  const out: ParsedQuery = {}

  if (match[1] && match[2] && match[3]) {
    const sign = match[1] === '-' ? -1 : 1
    out.relativeValue = sign * parseInt(match[2])
    out.unit = match[3] as OpUnitType
  } else {
    out.relativeValue = 0
    out.unit = 'd'
  }

  const round = !!match[4] && !!match[5]
  if (!round) {
    return out
  }

  let roundUnit = match[5] as ParsedQuery['roundUnit'] | 'w'
  if (roundUnit === 'w') {
    roundUnit = 'isoWeek'
  }
  out.roundUnit = roundUnit

  const roundDirection = match[4]
  if (roundDirection === '<') {
    out.roundTo = 'start'
  }
  if (roundDirection === '>') {
    out.roundTo = 'end'
  }
  return out
}

export function resolveQueryToTimestamp(
  query: ParsedQuery | null,
  now = Date.now()
): number | null {
  // console.dir({ _: 'resolveQueryToTimestamp', query })
  if (query === null) {
    return null
  }
  if (query.absoluteValue !== undefined) {
    return query.absoluteValue
  }
  if (query.relativeValue === undefined) {
    // Nothing to work with
    return null
  }
  if (query.relativeValue === 0) {
    return now
  }
  if (!query.unit) {
    // We need a unit from now on
    return null
  }

  let ref = dayjs.utc(now)
  ref = ref.add(query.relativeValue, query.unit!)

  if (!query.roundUnit || !query.roundTo) {
    return ref.valueOf()
  }

  if (query.roundTo === 'start') {
    ref = ref.startOf(query.roundUnit)
  }
  if (query.roundTo === 'end') {
    ref = ref.endOf(query.roundUnit)
  }
  return ref.valueOf()
}

export function resolveQueryToString(query: ParsedQuery): string | null {
  // console.dir({ _: 'resolveQueryToString', query })
  if (query.absoluteValue !== undefined) {
    return query.absoluteValue.toString()
  }
  if (query.relativeValue === undefined) {
    return null
  }
  if (query.unit === undefined) {
    return null
  }
  const sign = query.relativeValue > 0 ? '+' : ''
  let out = `now${sign}${query.relativeValue === 0 ? '' : query.relativeValue}${
    query.relativeValue === 0 ? '' : query.unit
  }`
  if (!query.roundUnit || !query.roundTo) {
    return out
  }
  if (query.roundTo === 'start') {
    out += `<${query.roundUnit}`
  }
  if (query.roundTo === 'end') {
    out += `>${query.roundUnit}`
  }
  return out
}

export function getPreviousNextQuery(
  range: TimeRange
): {
  previous: TimeRange | null
  next: TimeRange | null
} {
  const from = parseTimeRangeQuery(range.from)
  const to = parseTimeRangeQuery(range.to)

  if (!from || !to) {
    return {
      previous: null,
      next: null
    }
  }

  if (from.absoluteValue && to.absoluteValue) {
    const delta = Math.abs(to.absoluteValue - from.absoluteValue)
    return {
      previous: {
        from: (from.absoluteValue - delta).toString(),
        to: (to.absoluteValue - delta).toString(),
        step: range.step
      },
      next: {
        from: (from.absoluteValue + delta).toString(),
        to: (to.absoluteValue + delta).toString(),
        step: range.step
      }
    }
  }
  if (!from.unit && !to.unit) {
    return {
      previous: null,
      next: null
    }
  }

  const unit = from.unit ?? to.unit
  from.unit = unit
  to.unit = unit
  const prevFrom = { ...from }
  const prevTo = { ...to }
  const nextFrom = { ...from }
  const nextTo = { ...to }
  let delta = Math.max(1, Math.abs(to.relativeValue! - from.relativeValue!))
  prevFrom.relativeValue = (prevFrom.relativeValue ?? 0) - delta
  prevTo.relativeValue = (prevTo.relativeValue ?? 0) - delta
  nextFrom.relativeValue = (nextFrom.relativeValue ?? 0) + delta
  nextTo.relativeValue = (nextTo.relativeValue ?? 0) + delta

  return {
    previous: {
      from: resolveQueryToString(prevFrom)!,
      to: resolveQueryToString(prevTo)!,
      step: range.step
    },
    next: {
      from: resolveQueryToString(nextFrom)!,
      to: resolveQueryToString(nextTo)!,
      step: range.step
    }
  }
}

export function getSuitableTimeRange(
  from: string | null,
  to: string | null,
  now = Date.now()
): TimeRange {
  const idealTimeRange = timeRanges.find(tr => tr.from === from && tr.to === to)
  if (idealTimeRange) {
    return idealTimeRange
  }
  const fromQuery = parseTimeRangeQuery(from)
  const toQuery = parseTimeRangeQuery(to)

  // Generate an alternative
  let fromTime = resolveQueryToTimestamp(fromQuery, now)
  let toTime = resolveQueryToTimestamp(toQuery, now)
  // console.dir({ fromTime, toTime, fromQuery, toQuery })
  if (fromTime === null && toTime === null) {
    return defaultTimeRange
  }
  if (fromTime === null) {
    from = defaultTimeRange.from
    fromTime = 2
  }
  if (toTime === null) {
    to = 'now'
    toTime = now
  }
  const delta = toTime - fromTime
  const step = `${((32 * 1000) / delta).toFixed()}s` // value in seconds for 32 steps
  const strFrom = dayjs.utc(fromTime).toISOString()
  const strTo = dayjs.utc(toTime).toISOString()
  return {
    from: from!,
    to: to!,
    step,
    label: `${strFrom} - ${strTo}`
  }
}

export function createTimeRangeListener(
  onChange: (range: TimeRange) => void
): () => void {
  if (typeof window === 'undefined') {
    // Not available in SSR context
    return () => {}
  }

  const listener = () => {
    const query = new URLSearchParams()
    const range = getSuitableTimeRange(query.get('from'), query.get('to'))
    onChange(range)
  }

  window.addEventListener('popstate', listener)
  listener()
  return () => window.removeEventListener('popstate', listener)
}

// Hooks --

export function useTimeRange() {
  const [{ from, to }, setValues] = useQueryStates(timeRangeKeys)

  const range = React.useMemo(() => {
    return getSuitableTimeRange(from, to)
  }, [from, to])

  const { next, previous, canDoNext, canDoPrevious } = React.useMemo(() => {
    const { previous, next } = getPreviousNextQuery(range)
    // console.dir({ previous, next })
    return {
      canDoPrevious: Boolean(previous?.from && previous?.to),
      canDoNext: Boolean(next?.from && previous?.to),
      previous: () =>
        setValues({
          from: previous?.from,
          to: previous?.to,
          step: previous?.step
        }),
      next: () =>
        setValues({
          from: next?.from,
          to: next?.to,
          step: next?.step
        })
    }
  }, [range])

  // console.dir({
  //   range
  // })

  return {
    range,
    next,
    previous,
    canDoNext,
    canDoPrevious,
    set: (range: TimeRange) =>
      setValues({
        from: range.from,
        to: range.to,
        step: range.step
      })
  }
}
