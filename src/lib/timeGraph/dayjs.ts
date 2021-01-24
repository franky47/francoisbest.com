import dayjs from 'dayjs'
import duration, { Duration } from 'dayjs/plugin/duration'
import isoWeek from 'dayjs/plugin/isoWeek'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import {
  DurationDirection,
  DurationUnits,
  TimeQuery,
  DURATION_UNITS
} from './defs'

dayjs.extend(duration)
dayjs.extend(isoWeek)
dayjs.extend(advancedFormat)

export { dayjs }

// --

export function applyDuration(
  { base, duration }: TimeQuery,
  direction: DurationDirection = 'future'
) {
  const factor = direction === 'future' ? 1 : -1
  return DURATION_UNITS.reduce(
    (date, unit) => date.add(factor * _getDurationUnit(duration, unit), unit),
    base
  )
}

// --

export function stringifyDuration(duration: Duration) {
  const weeks = _getDurationUnit(duration, 'week')
  return weeks !== 0 ? `P${weeks}W` : duration.toISOString()
}

// Internal, exported for testing --

export function _getDurationUnit(d: Duration, unit: DurationUnits) {
  const key = `${unit}s`
  // @ts-ignore
  const value: string | undefined = d.$d[key]
  return parseInt(value ?? '0') || 0
}
