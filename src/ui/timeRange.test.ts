import {
  ParsedQuery,
  parseTimeRangeQuery,
  resolveQueryToTimestamp,
  resolveQueryToString
} from './timeRange'
import dayjs, { Dayjs } from 'dayjs'

describe('parseTimeRangeQuery', () => {
  it('should return null on null', () => {
    const received = parseTimeRangeQuery(null)
    const expected = null
    expect(received).toEqual(expected)
  })
  it('should return null on empty string', () => {
    const received = parseTimeRangeQuery('')
    const expected = null
    expect(received).toEqual(expected)
  })
  it('should return null when value is not a time query', () => {
    const received = parseTimeRangeQuery('bar')
    const expected = null
    expect(received).toEqual(expected)
  })
  it('should return null when the value is a negative number', () => {
    const received = parseTimeRangeQuery('-12')
    const expected = null
    expect(received).toEqual(expected)
  })
  it('should return absolute values when the value is a positive number', () => {
    const received = parseTimeRangeQuery('1234567890')
    const expected: ParsedQuery = {
      absoluteValue: 1234567890
    }
    expect(received).toEqual(expected)
  })

  function itShouldUnderstand(value: string, expected: ParsedQuery) {
    it(`should understand '${value}'`, () => {
      const received = parseTimeRangeQuery(value)
      expect(received).toEqual(expected)
    })
  }
  itShouldUnderstand('now', { relativeValue: 0 })
  itShouldUnderstand('now+1m', { relativeValue: 1, unit: 'm' })
  itShouldUnderstand('now-1m', { relativeValue: -1, unit: 'm' })
  itShouldUnderstand('now+1h', { relativeValue: 1, unit: 'h' })
  itShouldUnderstand('now-1h', { relativeValue: -1, unit: 'h' })
  itShouldUnderstand('now+1d', { relativeValue: 1, unit: 'd' })
  itShouldUnderstand('now-1d', { relativeValue: -1, unit: 'd' })
  itShouldUnderstand('now+1w', { relativeValue: 1, unit: 'w' })
  itShouldUnderstand('now-1w', { relativeValue: -1, unit: 'w' })
  itShouldUnderstand('now+1M', { relativeValue: 1, unit: 'M' })
  itShouldUnderstand('now-1M', { relativeValue: -1, unit: 'M' })
  itShouldUnderstand('now+1y', { relativeValue: 1, unit: 'y' })
  itShouldUnderstand('now-1y', { relativeValue: -1, unit: 'y' })

  // Rounding
  itShouldUnderstand('now<d', {
    relativeValue: 0,
    unit: 'd',
    roundTo: 'start',
    roundUnit: 'd'
  })
  itShouldUnderstand('now>d', {
    relativeValue: 0,
    unit: 'd',
    roundTo: 'end',
    roundUnit: 'd'
  })
  itShouldUnderstand('now<w', {
    relativeValue: 0,
    unit: 'd',
    roundTo: 'start',
    roundUnit: 'isoWeek'
  })
  itShouldUnderstand('now>w', {
    relativeValue: 0,
    unit: 'd',
    roundTo: 'end',
    roundUnit: 'isoWeek'
  })
  itShouldUnderstand('now<M', {
    relativeValue: 0,
    unit: 'd',
    roundTo: 'start',
    roundUnit: 'M'
  })
  itShouldUnderstand('now>M', {
    relativeValue: 0,
    unit: 'd',
    roundTo: 'end',
    roundUnit: 'M'
  })
  itShouldUnderstand('now<y', {
    relativeValue: 0,
    unit: 'd',
    roundTo: 'start',
    roundUnit: 'y'
  })
  itShouldUnderstand('now>y', {
    relativeValue: 0,
    unit: 'd',
    roundTo: 'end',
    roundUnit: 'y'
  })
  itShouldUnderstand('now-2d<d', {
    relativeValue: -2,
    unit: 'd',
    roundTo: 'start',
    roundUnit: 'd'
  })
  itShouldUnderstand('now+3d>d', {
    relativeValue: +3,
    unit: 'd',
    roundTo: 'end',
    roundUnit: 'd'
  })
})

describe('resolveQueryToTimestamp', () => {
  it('should return null on null', () => {
    const received = resolveQueryToTimestamp(null)
    const expected = null
    expect(received).toEqual(expected)
  })
  it('should return absolute values as is', () => {
    const received = resolveQueryToTimestamp({ absoluteValue: 123456 }, 7890)
    const expected = 123456
    expect(received).toEqual(expected)
  })
  it('should return null on empty object', () => {
    const received = resolveQueryToTimestamp({})
    const expected = null
    expect(received).toEqual(expected)
  })
  it('should return now for relative = 0', () => {
    const received = resolveQueryToTimestamp({ relativeValue: 0 }, 123456)
    const expected = 123456
    expect(received).toEqual(expected)
  })
  it('should return null if relative unit is missing', () => {
    const received = resolveQueryToTimestamp({ relativeValue: 42 }, 123456)
    const expected = null
    expect(received).toEqual(expected)
  })

  function itShouldUnderstand(
    label: string,
    query: ParsedQuery,
    calculate: (now: Dayjs) => Dayjs
  ) {
    it(`should understand ${label}`, () => {
      const now = Date.now()
      const received = resolveQueryToTimestamp(query, now)
      const expected = calculate(dayjs(now).utc()).valueOf()
      expect(received).toEqual(expected)
    })
  }

  itShouldUnderstand('now-2d', { relativeValue: -2, unit: 'd' }, now =>
    now.subtract(2, 'day')
  )
  itShouldUnderstand('now+2w', { relativeValue: 2, unit: 'w' }, now =>
    now.add(2, 'week')
  )
  itShouldUnderstand('now+1M', { relativeValue: 1, unit: 'M' }, now =>
    now.add(1, 'month')
  )
  itShouldUnderstand(
    'now+1d>d',
    { relativeValue: 1, unit: 'd', roundTo: 'end', roundUnit: 'd' },
    now => now.add(1, 'day').endOf('day')
  )
  itShouldUnderstand(
    'now-1d<d',
    { relativeValue: -1, unit: 'd', roundTo: 'start', roundUnit: 'd' },
    now => now.add(-1, 'day').startOf('day')
  )
  itShouldUnderstand(
    'now<d',
    { relativeValue: 0, roundTo: 'start', roundUnit: 'd' },
    now => now.startOf('day')
  )
  itShouldUnderstand(
    'now>d',
    { relativeValue: 0, roundTo: 'start', roundUnit: 'd' },
    now => now.startOf('day')
  )
})

describe('resolveQueryToString', () => {
  it('should return absolute values as is', () => {
    const received = resolveQueryToString({ absoluteValue: 123456 })
    const expected = '123456'
    expect(received).toEqual(expected)
  })
  it('should return null on empty object', () => {
    const received = resolveQueryToString({})
    const expected = null
    expect(received).toEqual(expected)
  })
  it('should return `now` for relative = 0', () => {
    const received = resolveQueryToString({ relativeValue: 0 })
    const expected = 'now'
    expect(received).toEqual(expected)
  })
  it('should return null if relative unit is missing', () => {
    const received = resolveQueryToString({ relativeValue: 42 })
    const expected = null
    expect(received).toEqual(expected)
  })

  function itShouldUnderstand(expected: string, query: ParsedQuery) {
    it(`should understand ${expected}`, () => {
      const received = resolveQueryToString(query)
      expect(received).toEqual(expected)
    })
  }

  itShouldUnderstand('now-2d', { relativeValue: -2, unit: 'd' })
  itShouldUnderstand('now+2w', { relativeValue: 2, unit: 'w' })
  itShouldUnderstand('now+1M', { relativeValue: 1, unit: 'M' })
  itShouldUnderstand('now+1d>d', {
    relativeValue: 1,
    unit: 'd',
    roundTo: 'end',
    roundUnit: 'd'
  })
  itShouldUnderstand('now-1d<d', {
    relativeValue: -1,
    unit: 'd',
    roundTo: 'start',
    roundUnit: 'd'
  })
  itShouldUnderstand('now<d', {
    relativeValue: 0,
    roundTo: 'start',
    roundUnit: 'd'
  })
  itShouldUnderstand('now>d', {
    relativeValue: 0,
    roundTo: 'end',
    roundUnit: 'd'
  })
})
