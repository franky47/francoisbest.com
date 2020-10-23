import {
  ParsedQuery,
  parseTimeRangeQuery
  // resolveQueryToTimestamp,
  // resolveQueryToString,
  // getPreviousNextQuery,
  // getSuitableTimeRange
} from './timeRange'

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
