import React from 'react'
import { Duration } from 'dayjs/plugin/duration'
import { useQueryState } from 'next-usequerystate'
import { useHotkeys } from 'react-hotkeys-hook'
import { DurationDirection, TimeSlice, TimeSliceWithData } from './defs'
import {
  createQueryUpdater,
  getFineDuration,
  zoomOut as _zoomOut
} from './navigation'
import {
  getDefaultQuery,
  queryToTimestamps,
  parseTimeQuery,
  stringifyTimeQuery,
  QUERY_KEY
} from './query'
import { enumerateTimeSlices } from './slicing'

export function useTimeQuery() {
  const [_parts, setParts] = useQueryState(QUERY_KEY, {
    parse: parseTimeQuery,
    serialize: stringifyTimeQuery,
    history: 'replace'
  })

  const parts = React.useMemo(() => _parts ?? getDefaultQuery(), [_parts])
  return [parts, setParts] as const
}

// --

export function useTimeInterval() {
  const [parts, setParts] = useTimeQuery()

  const next = React.useCallback(() => {
    setParts(createQueryUpdater('future'))
  }, [])

  const previous = React.useCallback(() => {
    setParts(createQueryUpdater('past'))
  }, [])

  const zoomOut = React.useCallback(() => {
    setParts(() => _zoomOut(parts))
  }, [parts])

  const interval = React.useMemo(() => queryToTimestamps(parts), [parts])

  const fine = getFineDuration(parts.duration)

  const useKeybinding = (
    binding: string,
    shiftByDuration: Duration,
    direction: DurationDirection
  ) => {
    useHotkeys(
      binding,
      event => {
        event.preventDefault()
        setParts(createQueryUpdater(direction, shiftByDuration))
      },
      { keyup: false, keydown: true },
      [shiftByDuration]
    )
  }

  // Keyboard navigation
  useHotkeys('left', previous, { keyup: false, keydown: true })
  useHotkeys('right', next, { keyup: false, keydown: true })
  useKeybinding('shift+left', fine, 'past')
  useKeybinding('shift+right', fine, 'future')
  useHotkeys('up', zoomOut, [parts])

  return {
    ...parts,
    interval,
    fine,
    previous,
    next,
    zoomOut,
    set: setParts
  } as const
}

// --

export function useTimeSlicedData<T>(
  data: T[],
  accessor: (datum: T) => number
) {
  const [query] = useTimeQuery()
  const { coarse, fine } = enumerateTimeSlices(query)
  const injectData = (slice: TimeSlice): TimeSliceWithData<T> => ({
    ...slice,
    data: data.filter(datum => {
      const ts = accessor(datum)
      return ts >= slice.from && ts <= slice.to
    })
  })
  const out = {
    coarse: coarse.map(injectData),
    fine: fine.map(injectData)
  }
  return out
}
