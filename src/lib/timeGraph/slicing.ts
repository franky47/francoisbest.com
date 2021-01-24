import { Dayjs } from 'dayjs'
import { Duration } from 'dayjs/plugin/duration'
import { applyDuration, dayjs } from './dayjs'
import { Slicer, Subdivisions, TimeQuery, TimeSlice } from './defs'
import { formatInterval } from './format'
import { stringifyTimeQuery } from './query'

export const sliceByMonth: Slicer = ({ base, duration }) => {
  const end = applyDuration({ base, duration })
  const numMonths = Math.ceil(end.diff(base, 'month', true))
  return Array(numMonths)
    .fill(undefined)
    .map((_, i) => {
      const from = base.add(i, 'month')
      const to = clip(from.endOf('month'), from, end)
      return {
        from: from.valueOf(),
        to: to.valueOf(),
        key: stringifyTimeQuery({
          base: from,
          duration: dayjs.duration(1, 'month')
        }),
        labels: {
          long: from.format('MMMM'),
          short: from.format('MMM')
        },
        length: from.daysInMonth()
      }
    })
}

export const sliceByWeek: Slicer = ({ base, duration }) => {
  const end = applyDuration({ base, duration })
  const numWeeks = 1 + Math.ceil(end.diff(base, 'week', true))
  return Array(numWeeks)
    .fill(undefined)
    .map((_, i) => {
      const from = clip(base.startOf('isoWeek').add(i, 'week'), base, end)
      const to = clip(from.endOf('isoWeek'), from, end)
      const length = Math.round(to.diff(from, 'day', true))
      return {
        from: from.valueOf(),
        to: to.valueOf(),
        key: stringifyTimeQuery({
          base: from,
          duration: dayjs.duration('P1W')
        }),
        labels: {
          long: formatInterval({
            base: from,
            duration: dayjs.duration(length, 'day')
          }),
          short: 'IM'
        },
        length
      }
    })
    .filter(slice => slice.length > 0)
}

export const sliceByDay = (unit: 'day' | 'hour'): Slicer => ({
  base,
  duration
}) => {
  const end = applyDuration({ base, duration })
  const numDays = Math.ceil(end.diff(base, 'day', true))
  return Array(numDays)
    .fill(undefined)
    .map((_, i) => {
      const from = base.add(i, 'day')
      const to = clip(from.endOf('day'), from, end)
      return {
        from: from.valueOf(),
        to: to.valueOf(),
        key: stringifyTimeQuery({
          base: from,
          duration: dayjs.duration(1, 'day')
        }),
        labels: {
          long: from.format('ddd D'),
          short: from.format('dd D')
        },
        length: Math.round(to.diff(from, unit, true))
      }
    })
}

export const sliceByQuarterDay: Slicer = ({ base, duration }) => {
  const end = applyDuration({ base, duration })
  const numDays = Math.ceil(end.diff(base, 'day', true))
  return Array(numDays)
    .fill(undefined)
    .flatMap<TimeSlice>((_, i) => {
      const day = base.startOf('day').add(i, 'day')
      return [
        {
          from: day.valueOf(),
          to: day.hour(5).endOf('hour').valueOf(),
          key: day.format('YYYY-MM-DD[--PT6H]'),
          // DST can happen here
          length: Math.round(day.hour(5).endOf('hour').diff(day, 'hour', true)),
          labels: {
            long: 'Night',
            short: 'N'
          }
        },
        {
          from: day.hour(6).valueOf(),
          to: day.hour(11).endOf('hour').valueOf(),
          key: day.format('YYYY-MM-DD[T06--PT6H]'),
          length: 6,
          labels: {
            long: 'Morning',
            short: 'M'
          }
        },
        {
          from: day.hour(12).valueOf(),
          to: day.hour(17).endOf('hour').valueOf(),
          key: day.format('YYYY-MM-DD[T12--PT6H]'),
          length: 6,
          labels: {
            long: 'Afternoon',
            short: 'A'
          }
        },
        {
          from: day.hour(18).valueOf(),
          to: day.hour(23).endOf('hour').valueOf(),
          key: day.format('YYYY-MM-DD[T18--PT6H]'),
          length: 6,
          labels: {
            long: 'Evening',
            short: 'E'
          }
        }
      ]
    })
}

export const sliceByHour: Slicer = ({ base, duration }) => {
  const end = applyDuration({ base, duration })
  const numHours = Math.ceil(end.diff(base, 'hour', true))
  return Array(numHours)
    .fill(undefined)
    .map((_, i) => {
      const from = base.add(i, 'hour')
      const to = from.endOf('hour')
      return {
        from: from.valueOf(),
        to: to.valueOf(),
        key: stringifyTimeQuery({
          base: from,
          duration: dayjs.duration(1, 'hour')
        }),
        labels: {
          long: from.format('HH[:00]'),
          short: from.format('HH')
        },
        length: 1
      }
    })
}

// --

export function getSlicers(duration: Duration): Subdivisions {
  if (duration.asMonths() >= 3) {
    return {
      coarse: sliceByMonth,
      fine: sliceByWeek,
      lengthUnit: 'day'
    }
  }
  if (duration.asDays() >= 14) {
    return {
      coarse: sliceByWeek,
      fine: sliceByDay('day'),
      lengthUnit: 'day'
    }
  }
  if (duration.asDays() >= 3) {
    return {
      coarse: sliceByDay('hour'),
      fine: sliceByQuarterDay,
      lengthUnit: 'hour'
    }
  }
  return {
    coarse: sliceByQuarterDay,
    fine: sliceByHour,
    lengthUnit: 'hour'
  }
}

// --

export function clip(date: Dayjs, from: Dayjs, to: Dayjs) {
  if (date.isBefore(from)) {
    return from
  }
  if (date.isAfter(to)) {
    return to
  }
  return date
}

// --

export function enumerateTimeSlices({
  base,
  duration
}: TimeQuery): {
  coarse: TimeSlice[]
  fine: TimeSlice[]
  lengthUnit: 'day' | 'hour'
} {
  const { coarse, fine, lengthUnit } = getSlicers(duration)
  const out = {
    coarse: coarse({ base, duration }),
    fine: fine({ base, duration }),
    lengthUnit
  }
  // const getLength = (array: TimeSlice[]) =>
  //   array.reduce((sum, slice) => sum + slice.length, 0)
  // const cl = getLength(out.coarse)
  // const fl = getLength(out.fine)

  // console.assert(
  //   cl === fl,
  //   `${stringifyTimeQuery({
  //     base,
  //     duration
  //   })} - Coarse: ${cl} ${lengthUnit}, Fine: ${fl} ${lengthUnit}.`
  // )
  return out
}
