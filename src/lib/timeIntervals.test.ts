import {
  dayjs,
  applyDuration,
  getDurationUnit,
  getNextBase,
  parseTimeQuery
} from './timeInterval'

test('getDurationUnit', () => {
  expect(getDurationUnit(dayjs.duration('PT1S'), 'second')).toEqual(1)
  expect(getDurationUnit(dayjs.duration('PT1M'), 'minute')).toEqual(1)
  expect(getDurationUnit(dayjs.duration('PT1H'), 'hour')).toEqual(1)
  expect(getDurationUnit(dayjs.duration('P1D'), 'day')).toEqual(1)
  expect(getDurationUnit(dayjs.duration('P1W'), 'week')).toEqual(1)
  expect(getDurationUnit(dayjs.duration('P1M'), 'month')).toEqual(1)
  expect(getDurationUnit(dayjs.duration('P1Y'), 'year')).toEqual(1)
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

test('getNextBase', () => {
  const MUT = getNextBase // method under test
  const parse = parseTimeQuery
  expect(MUT(parse('2020-01-01T12--PT5H'), 'future')).toEqual('2020-01-01T17')
  expect(MUT(parse('2020-01-01T12--PT5H'), 'past')).toEqual('2020-01-01T07')
  expect(MUT(parse('2020-01-01--P1D'), 'future')).toEqual('2020-01-02')
  expect(MUT(parse('2020-01-01--P1D'), 'past')).toEqual('2019-12-31')
  expect(MUT(parse('2020-01-01--P1W'), 'future')).toEqual('2020-01-08')
  expect(MUT(parse('2020-01-01--P1W'), 'past')).toEqual('2019-12-25')
  expect(MUT(parse('2020-01-01--P1M'), 'future')).toEqual('2020-02-01')
  expect(MUT(parse('2020-01-01--P1M'), 'past')).toEqual('2019-12-01')
  expect(MUT(parse('2020-01-01--P1Y'), 'future')).toEqual('2021-01-01')
  expect(MUT(parse('2020-01-01--P1Y'), 'past')).toEqual('2019-01-01')
})
