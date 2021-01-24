import { dayjs, applyDuration, stringifyDuration } from './dayjs'
import { TimeQuery } from './defs'

export const QUERY_KEY = 'interval'

export function getDefaultQuery(now = dayjs()): TimeQuery {
  return {
    base: now.startOf('day'),
    duration: dayjs.duration('P1D')
  }
}

// --

export function parseTimeQuery(query: string): TimeQuery {
  const [base, duration] = query.split('--')
  return {
    base: dayjs(base),
    duration: dayjs.duration(duration)
  }
}

// --

export function stringifyTimeQuery({ base, duration }: TimeQuery) {
  const isDST = base.utcOffset() > base.add(1, 'hour').utcOffset()
  let format = 'YYYY-MM-DD'
  if (base.get('hour') > 0) {
    format = isDST ? 'YYYY-MM-DDTHH:mmZ' : 'YYYY-MM-DDTHH'
  }
  // if (base.get('minute') > 0) {
  //   format = isDST ? 'YYYY-MM-DDTHH:mmZ' : 'YYYY-MM-DDTHH:mm'
  // }
  // if (base.get('second') > 0) {
  //   format = isDST ? 'YYYY-MM-DDTHH:mm:ssZ' : 'YYYY-MM-DDTHH:mm:ss'
  // }
  return `${base.format(format)}--${stringifyDuration(duration)}`
}

// --

export function queryToTimestamps({ base, duration }: TimeQuery) {
  return {
    from: base.valueOf(),
    to: applyDuration({ base, duration }).valueOf()
  }
}
