import {
  dayjs,
  applyDuration,
  parseTimeQuery,
  _getDurationUnit
} from './timeInterval'

test('getDurationUnit', () => {
  const MUT = _getDurationUnit
  expect(MUT(dayjs.duration('PT1S'), 'second')).toEqual(1)
  expect(MUT(dayjs.duration('PT1M'), 'minute')).toEqual(1)
  expect(MUT(dayjs.duration('PT1H'), 'hour')).toEqual(1)
  expect(MUT(dayjs.duration('P1D'), 'day')).toEqual(1)
  expect(MUT(dayjs.duration('P1W'), 'week')).toEqual(1)
  expect(MUT(dayjs.duration('P1M'), 'month')).toEqual(1)
  expect(MUT(dayjs.duration('P1Y'), 'year')).toEqual(1)
})

test('applyDuration', () => {
  const MUT = applyDuration // method under test
  const parse = parseTimeQuery
  expect(MUT(parse('2020-01-01--PT1S'))).toEqual(dayjs('2020-01-01T00:00:01'))
  expect(MUT(parse('2020-01-01--PT1M'))).toEqual(dayjs('2020-01-01T00:01:00'))
  expect(MUT(parse('2020-01-01--PT1H'))).toEqual(dayjs('2020-01-01T01:00:00'))
  expect(MUT(parse('2020-01-01--P1D'))).toEqual(dayjs('2020-01-02'))
  expect(MUT(parse('2020-01-01--P1W'))).toEqual(dayjs('2020-01-08'))
  expect(MUT(parse('2020-01-01--P1M'))).toEqual(dayjs('2020-02-01'))
  expect(MUT(parse('2020-01-01--P1Y'))).toEqual(dayjs('2021-01-01'))
})
