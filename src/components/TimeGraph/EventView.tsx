import React from 'react'
import { chakra } from '@chakra-ui/react'
import { Group } from '@visx/group'
import { scaleLinear } from '@visx/scale'

type GroupProps = Parameters<typeof Group>[0]

const Y_RESOLUTION = 8

export interface EventViewProps<T> extends GroupProps {
  w: number
  h: number
  from: number
  to: number
  fill?: string
  fillOpacity?: number
  data: T[]
  getTimestamp: (datum: T) => number
}

export const EventView = <T,>({
  w,
  h,
  from,
  to,
  spacing,
  data,
  getTimestamp,
  fill = 'accent.500',
  fillOpacity = 1,
  ...props
}: EventViewProps<T>) => {
  const xScale = React.useMemo(
    () =>
      scaleLinear<number>({
        range: [0, w],
        domain: [from, to]
      }),
    [w, from, to]
  )
  const yScale = React.useMemo(
    () =>
      scaleLinear<number>({
        range: [0, h],
        domain: [0, Y_RESOLUTION]
      }),
    [h, data]
  )
  return (
    <Group {...props}>
      {data.map(event => {
        const timestamp = getTimestamp(event)
        return (
          <chakra.circle
            key={timestamp}
            fill={fill}
            fillOpacity={fillOpacity}
            cx={xScale(timestamp)}
            cy={yScale(timestamp % Y_RESOLUTION)}
            r={3}
            cursor="pointer"
          />
        )
      })}
    </Group>
  )
}
