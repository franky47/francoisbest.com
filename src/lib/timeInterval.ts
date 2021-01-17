import React from 'react'
import dayjs from 'dayjs'
import duration, { Duration } from 'dayjs/plugin/duration'
import { useQueryState } from 'next-usequerystate'
import { useHotkeys } from 'react-hotkeys-hook'

dayjs.extend(duration)

export { dayjs }

export interface TimeQueryParts {
  base: string
  duration: string
}

type DurationUnits =
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year'

const DURATION_UNITS: DurationUnits[] = [
  'second',
  'minute',
  'hour',
  'day',
  'week',
  'month',
  'year'
]

// --

export function getDurationUnit(d: Duration, unit: DurationUnits) {
  const key = `${unit}s`
  // @ts-ignore
  const value: string | undefined = d.$d[key]
  return parseInt(value ?? '0') || 0
}

// --

export type DurationDirection = 'future' | 'past'

export function applyDuration(
  { base, duration }: TimeQueryParts,
  direction: DurationDirection = 'future'
) {
  const b = dayjs(base)
  const d = dayjs.duration(duration)
  const factor = direction === 'future' ? 1 : -1
  return DURATION_UNITS.reduce(
    (date, unit) => date.add(factor * getDurationUnit(d, unit), unit),
    b
  )
}

// --

export function getNextBase(
  { base, duration }: TimeQueryParts,
  direction: DurationDirection = 'future'
) {
  let date = applyDuration({ base, duration }, direction)
  if (dayjs.duration(duration).asDays() > 1) {
    // Round off to whole days when navigating over 1 day windows
    date = date.startOf('day')
  }
  return date.format(findShortestFormat(date))
}

// --

export function getTimestampRange({ base, duration }: TimeQueryParts) {
  return {
    from: dayjs(base).valueOf(),
    to: applyDuration({ base, duration }).valueOf()
  }
}

// --

export function findShortestFormat(date: dayjs.Dayjs) {
  if (date.get('second') > 0) {
    return 'YYYY-MM-DDTHH:mm:ss'
  }
  if (date.get('minute') > 0) {
    return 'YYYY-MM-DDTHH:mm'
  }
  if (date.get('hour') > 0) {
    return 'YYYY-MM-DDTHH'
  }
  return 'YYYY-MM-DD'
}

// --

export function parseTimeQuery(query: string): TimeQueryParts {
  const [base, duration] = query.split('--')
  return {
    base,
    duration
  }
}

export function stringifyTimeQuery({ base, duration }: TimeQueryParts) {
  return `${base}--${duration}`
}

// --

export function getDefaultQuery(now = dayjs()): TimeQueryParts {
  return {
    base: now.startOf('day').format('YYYY-MM-DD'),
    duration: 'P1D'
  }
}

// --

export function createQueryUpdater(
  direction: DurationDirection,
  shiftByDuration?: string
) {
  return (currentQuery: TimeQueryParts | null) => {
    const { base: currentBase, duration: currentDuration } =
      currentQuery ?? getDefaultQuery()
    const newBase = getNextBase(
      {
        base: currentBase,
        duration: shiftByDuration || currentDuration
      },
      direction
    )
    return {
      base: newBase,
      duration: currentDuration // Keep the same interval width
    }
  }
}

// --

const DURATIONS = [
  'P1Y',
  'P6M',
  'P3M',
  'P1M',
  'P2W',
  'P1W',
  'P1D',
  'PT6H',
  'PT1H'
]

export function zoomDuration(duration: string, zoomIn = true) {
  const i = DURATIONS.indexOf(duration)
  if (i === -1) {
    return duration
  }
  const newIndex = zoomIn
    ? Math.min(i + 1, DURATIONS.length - 1)
    : Math.max(i - 1, 0)
  return DURATIONS[newIndex]
}

// React hook --

export function useTimeInterval(key = 'interval') {
  const [_parts, setParts] = useQueryState(key, {
    parse: parseTimeQuery,
    serialize: stringifyTimeQuery,
    history: 'replace'
  })

  const parts = React.useMemo(() => _parts ?? getDefaultQuery(), [_parts])

  const next = React.useCallback(() => {
    setParts(createQueryUpdater('future'))
  }, [])

  const previous = React.useCallback(() => {
    setParts(createQueryUpdater('past'))
  }, [])

  const interval = React.useMemo(() => getTimestampRange(parts), [parts])

  useHotkeys('left', previous, { keyup: false, keydown: true })
  useHotkeys('right', next, { keyup: false, keydown: true })

  const coarse = zoomDuration(parts.duration, true)
  const fine = zoomDuration(coarse, true)

  const useKeybinding = (
    binding: string,
    shiftByDuration: string,
    direction: DurationDirection
  ) => {
    useHotkeys(
      binding,
      event => {
        event.preventDefault()
        setParts(createQueryUpdater(direction, shiftByDuration))
      },
      { keyup: false, keydown: true },
      [shiftByDuration]
    )
  }
  useKeybinding('shift+left', coarse, 'past')
  useKeybinding('shift+right', coarse, 'future')
  useKeybinding('shift+alt+left', fine, 'past')
  useKeybinding('shift+alt+right', fine, 'future')

  useHotkeys(
    'up',
    () => {
      setParts({
        base: parts.base,
        duration: zoomDuration(parts.duration, false)
      })
    },
    [parts]
  )
  useHotkeys(
    'down',
    () => {
      setParts({
        base: parts.base,
        duration: zoomDuration(parts.duration)
      })
    },
    [parts]
  )

  return {
    interval,
    coarse,
    fine,
    next,
    previous
  } as const
}
