import { dayjs, applyDuration } from './dayjs'
import { TimeQuery } from './defs'

export function formatInterval({ base, duration }: TimeQuery) {
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
