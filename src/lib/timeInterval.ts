import React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import duration, { Duration } from 'dayjs/plugin/duration'
import isoWeek from 'dayjs/plugin/isoWeek'
import { useQueryState } from 'next-usequerystate'
import { useHotkeys } from 'react-hotkeys-hook'

dayjs.extend(duration)
dayjs.extend(isoWeek)

export { dayjs }

export interface TimeQueryParts {
  base: Dayjs
  duration: Duration
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

export function _getDurationUnit(d: Duration, unit: DurationUnits) {
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
  const factor = direction === 'future' ? 1 : -1
  return DURATION_UNITS.reduce(
    (date, unit) => date.add(factor * _getDurationUnit(duration, unit), unit),
    base
  )
}

export function stringifyDuration(duration: Duration) {
  const weeks = _getDurationUnit(duration, 'week')
  return weeks !== 0 ? `P${weeks}W` : duration.toISOString()
}

// --

export function getTimestampRange({ base, duration }: TimeQueryParts) {
  return {
    from: base.valueOf(),
    to: applyDuration({ base, duration }).valueOf()
  }
}

// --

export function parseTimeQuery(query: string): TimeQueryParts {
  const [base, duration] = query.split('--')
  return {
    base: dayjs(base),
    duration: dayjs.duration(duration)
  }
}

export function stringifyTimeQuery({ base, duration }: TimeQueryParts) {
  let format = 'YYYY-MM-DD'
  if (base.get('hour') > 0) {
    format = 'YYYY-MM-DDTHH'
  }
  if (base.get('minute') > 0) {
    format = 'YYYY-MM-DDTHH:mm'
  }
  if (base.get('second') > 0) {
    format = 'YYYY-MM-DDTHH:mm:ss'
  }
  return `${base.format(format)}--${stringifyDuration(duration)}`
}

// --

export function getDefaultQuery(now = dayjs()): TimeQueryParts {
  return {
    base: now.startOf('day'),
    duration: dayjs.duration('P1D')
  }
}

// --

export function createQueryUpdater(
  direction: DurationDirection,
  shiftByDuration?: Duration
) {
  return (currentQuery: TimeQueryParts | null) => {
    const { base: currentBase, duration: currentDuration } =
      currentQuery ?? getDefaultQuery()
    const newBase = applyDuration(
      {
        base: currentBase,
        duration: shiftByDuration ?? currentDuration
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

export function zoomOut({ base, duration }: TimeQueryParts): TimeQueryParts {
  if (duration.asYears() >= 1) {
    return { base, duration }
  }
  if (duration.asMonths() >= 6) {
    return {
      base: base.startOf('year'),
      duration: dayjs.duration(1, 'year')
    }
  }
  if (duration.asMonths() >= 3) {
    return {
      base: base.startOf('month'),
      duration: dayjs.duration(6, 'months')
    }
  }
  if (duration.asMonths() >= 1) {
    return {
      base: base.startOf('month'),
      duration: dayjs.duration(3, 'months')
    }
  }
  if (duration.asDays() >= 14) {
    return {
      base: base.startOf('month'),
      duration: dayjs.duration(1, 'month')
    }
  }
  if (duration.asDays() >= 7) {
    return {
      base: base.startOf('isoWeek'),
      duration: dayjs.duration('P2W')
    }
  }
  if (duration.asDays() >= 1) {
    return {
      base: base.startOf('isoWeek'),
      duration: dayjs.duration('P1W')
    }
  }
  return {
    base: base.startOf('day'),
    duration: dayjs.duration(1, 'day')
  }
  // todo: Handle sub-day zoom levels
}

export function getFineDuration(duration: Duration): Duration {
  if (duration.asMonths() >= 1) {
    return dayjs.duration(1, 'week')
  }
  if (duration.asDays() > 1) {
    return dayjs.duration(1, 'day')
  }
  return dayjs.duration(6, 'hours')
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

  const fine = getFineDuration(parts.duration)

  const useKeybinding = (
    binding: string,
    shiftByDuration: Duration,
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
  useKeybinding('shift+left', fine, 'past')
  useKeybinding('shift+right', fine, 'future')
  useHotkeys('up', () => setParts(zoomOut(parts)), [parts])

  return {
    duration: parts.duration,
    interval,
    fine,
    next,
    previous
  } as const
}
