import { Dayjs } from 'dayjs'
import { Duration } from 'dayjs/plugin/duration'

export interface TimeQuery {
  base: Dayjs
  duration: Duration
}

export type DurationUnits =
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year'

export const DURATION_UNITS: DurationUnits[] = [
  'second',
  'minute',
  'hour',
  'day',
  'week',
  'month',
  'year'
]

export type DurationDirection = 'future' | 'past'

export interface TimeSlice {
  from: number
  to: number
  key: string | null
  labels: {
    long: string
    short: string
  }
  length: number
}

export type Slicer = (parts: TimeQuery) => TimeSlice[]

export interface Subdivisions {
  coarse: Slicer
  fine: Slicer
  lengthUnit: 'hour' | 'day'
}

// --

export interface TimeSliceWithData<T> extends TimeSlice {
  data: T[]
}
