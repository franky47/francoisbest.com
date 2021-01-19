import React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import duration, { Duration } from 'dayjs/plugin/duration'
import isoWeek from 'dayjs/plugin/isoWeek'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { useQueryState } from 'next-usequerystate'
import { useHotkeys } from 'react-hotkeys-hook'
import { cursorTo } from 'readline'

dayjs.extend(duration)
dayjs.extend(isoWeek)
dayjs.extend(advancedFormat)

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
  const isDST = base.utcOffset() > base.add(1, 'hour').utcOffset()
  let format = 'YYYY-MM-DD'
  if (base.get('hour') > 0) {
    format = isDST ? 'YYYY-MM-DDTHH:mmZ' : 'YYYY-MM-DDTHH'
  }
  if (base.get('minute') > 0) {
    format = isDST ? 'YYYY-MM-DDTHH:mmZ' : 'YYYY-MM-DDTHH:mm'
  }
  if (base.get('second') > 0) {
    format = isDST ? 'YYYY-MM-DDTHH:mm:ssZ' : 'YYYY-MM-DDTHH:mm:ss'
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

export function handleDaylightSaving(
  { base, duration }: TimeQueryParts,
  direction: DurationDirection
): TimeQueryParts {
  const hours = duration.asHours()
  if (hours >= 24) {
    // Only apply fix for sub-day shifts
    return {
      base,
      duration
    }
  }
  const next = applyDuration({ base, duration }, direction)
  //                     base      next
  // Winter, -> future: +02:00 to +01:00 => +1 (extra hour)
  // Summer, -> future: +01:00 to +02:00 => -1 (skipped hour)
  // Winter, <- past:   +01:00 to +02:00 => +1 (extra hour)
  // Summer, <- past:   +02:00 to +01:00 => -1 (skipped hour)
  const delta =
    (next.utcOffset() - base.utcOffset()) / (direction === 'past' ? 60 : -60)
  return {
    base,
    duration: duration.add(delta, 'hour')
  }
}

export function createQueryUpdater(
  direction: DurationDirection,
  shiftByDuration?: Duration
) {
  return (currentQuery: TimeQueryParts | null) => {
    const { base: currentBase, duration: currentDuration } =
      currentQuery ?? getDefaultQuery()
    const withDST = handleDaylightSaving(
      {
        base: currentBase,
        duration: shiftByDuration ?? currentDuration
      },
      direction
    )
    const newBase = applyDuration(withDST, direction)
    return {
      base: newBase,
      duration: currentDuration // Keep the same interval width
    }
  }
}

// --

export function _zoomOut({ base, duration }: TimeQueryParts): TimeQueryParts {
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

// --

export function formatInterval({ base, duration }: TimeQueryParts) {
  const from = base
  const to = applyDuration({ base, duration }).subtract(1, 'ms')
  if (from.isSame(from.startOf('year')) && to.isSame(to.endOf('year'))) {
    return from.get('year').toString()
  }
  if (from.isSame(from.startOf('month')) && to.isSame(to.endOf('month'))) {
    const sameYear = from.year() === to.year()
    const sameMonth = from.month() === to.month() && sameYear
    return sameMonth
      ? from.format('MMMM YYYY')
      : sameYear
      ? `${from.format('MMMM')} - ${to.format('MMMM YYYY')}`
      : `${from.format('MMMM YYYY')} - ${to.format('MMMM YYYY')}`
  }
  if (from.isSame(from.startOf('day')) && to.isSame(to.endOf('day'))) {
    const sameYear = from.year() === to.year()
    const sameMonth = from.month() === to.month() && sameYear
    const sameDay = from.isSame(to, 'day')
    const isToday = sameDay && from.isSame(dayjs(), 'day')
    return isToday
      ? 'Today'
      : sameDay
      ? from.format('D MMMM YYYY')
      : sameMonth
      ? `${from.format('D')} - ${to.format('D MMMM YYYY')}`
      : sameYear
      ? `${from.format('D MMMM')} - ${to.format('D MMMM YYYY')}`
      : `${from.format('D MMMM YYYY')} - ${to.format('D MMMM YYYY')}`
  }
  // todo: Improve time formatting
  return `${from.format('D MMMM YYYY HH:mm')} - ${to
    .add(1, 'ms')
    .format('HH:mm')}`
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

  const zoomOut = React.useCallback(() => {
    setParts(() => _zoomOut(parts))
  }, [parts])

  const interval = React.useMemo(() => getTimestampRange(parts), [parts])

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

  // Keyboard navigation
  useHotkeys('left', previous, { keyup: false, keydown: true })
  useHotkeys('right', next, { keyup: false, keydown: true })
  useKeybinding('shift+left', fine, 'past')
  useKeybinding('shift+right', fine, 'future')
  useHotkeys('up', zoomOut, [parts])

  return {
    ...parts,
    interval,
    fine,
    previous,
    next,
    zoomOut,
    set: setParts
  } as const
}

// --

export interface Subdivisions {
  coarse: Duration
  fine: Duration
  lengthUnit: 'hour' | 'day'
}

export function getSubdivisions(duration: Duration): Subdivisions {
  if (duration.asMonths() >= 3) {
    return {
      coarse: dayjs.duration(1, 'month'),
      fine: dayjs.duration('P1W'),
      lengthUnit: 'day'
    }
  }
  if (duration.asDays() >= 14) {
    return {
      coarse: dayjs.duration('P1W'),
      fine: dayjs.duration(1, 'day'),
      lengthUnit: 'hour'
    }
  }
  if (duration.asDays() >= 3) {
    return {
      coarse: dayjs.duration(1, 'day'),
      fine: dayjs.duration(6, 'hours'),
      lengthUnit: 'hour'
    }
  }
  return {
    coarse: dayjs.duration(6, 'hours'),
    fine: dayjs.duration(1, 'hour'),
    lengthUnit: 'hour'
  }
}

// --

export interface TimeSlice {
  from: Dayjs | string
  to: Dayjs | string
  key: string
  label: string
  length: number
}

export function enumerateTimeSlices({
  base,
  duration
}: TimeQueryParts): {
  coarse: TimeSlice[]
  fine: TimeSlice[]
  lengthUnit: 'day' | 'hour'
} {
  const { coarse, fine, lengthUnit } = getSubdivisions(duration)
  const to = applyDuration({ base, duration })

  // todo: Handle daylight saving (both ways, 23 & 25 hour days)
  // todo: Handle leap years (relatively easy as months are variable)
  // DS days in 2020: 29 March (23h) & 25 October (25h)
  // todo: Screw leap seconds
  const enumerate = (baseDuration: Duration) => {
    let cursor = base
    const out: TimeSlice[] = []
    while (cursor.isBefore(to)) {
      // todo: Calculate actual duration, adjusted for daylight saving.
      // if baseDuration is 6 hours, and the time slice includes UTC offset change
      let duration = baseDuration
      let next = applyDuration(
        //handleDaylightSaving(
        { base: cursor, duration }
        //, 'future')
      )
      const utcA = cursor.utcOffset()
      const utcB = next.utcOffset()
      if (utcA !== utcB) {
        console.dir({
          utcA,
          utcB,
          diff: utcA - utcB,
          baseDuration,
          from: cursor.format('YYYY-MM-DDTHHZ'),
          to: next.format('YYYY-MM-DDTHHZ')
        })
        duration = baseDuration.add((utcA - utcB) / 60, 'hours')
        next = applyDuration({ base: cursor, duration })
      }
      if (duration.asHours() === 1 && next.isSame(cursor)) {
        // Daylight saving in autumn, repeating hour (25 hour day)
        next = next.add(1, 'hour')
      }
      out.push({
        from: cursor.format('YYYY-MM-DDTHHZ'),
        to: next.format('YYYY-MM-DDTHHZ'),
        key: stringifyTimeQuery({ base: cursor, duration }),
        label: formatInterval({ base: cursor, duration }),
        length: next.diff(cursor, lengthUnit)
      })
      cursor = next
    }
    return out
  }
  return {
    coarse: enumerate(coarse),
    fine: enumerate(fine),
    lengthUnit
  }
}
