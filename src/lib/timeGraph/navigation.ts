import { Duration } from 'dayjs/plugin/duration'
import { applyDuration, dayjs } from './dayjs'
import { DurationDirection, TimeQuery } from './defs'
import { getDefaultQuery } from './query'

export function handleDaylightSaving(
  { base, duration }: TimeQuery,
  direction: DurationDirection
): TimeQuery {
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

// --

export function createQueryUpdater(
  direction: DurationDirection,
  shiftByDuration?: Duration
) {
  return (currentQuery: TimeQuery | null) => {
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

export function zoomOut({ base, duration }: TimeQuery): TimeQuery {
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

export const today = (): TimeQuery => ({
  base: dayjs().startOf('day'),
  duration: dayjs.duration(1, 'day')
})

export const thisWeek = (): TimeQuery => ({
  base: dayjs().startOf('isoWeek'),
  duration: dayjs.duration('P1W')
})

export const thisMonth = (): TimeQuery => ({
  base: dayjs().startOf('month'),
  duration: dayjs.duration(1, 'month')
})
