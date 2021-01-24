import React from 'react'
import { chakra, useColorModeValue } from '@chakra-ui/react'
import { QUERY_KEY, TimeSliceWithData } from 'src/lib/timeGraph'
import { useQueryState } from 'next-usequerystate'
import { Group } from '@visx/group'
import { Text as VisxText } from '@visx/text'
import { scaleLinear } from '@visx/scale'

type GroupProps = Parameters<typeof Group>[0]

const Text = chakra(VisxText, {
  //shouldForwardProp: prop => {
  //  console.log(prop)
  //  return true
  //}
})

export interface FineBargraphProps<T> extends GroupProps {
  w: number
  h: number
  spacing: number
  fill?: string
  fillOpacity?: number
  slices: TimeSliceWithData<T>[]
}

export const FineBargraph = <T,>({
  w,
  h,
  spacing,
  slices,
  fill = 'accent.500',
  fillOpacity = 0.5,
  ...props
}: FineBargraphProps<T>) => {
  const { 1: setQuery } = useQueryState(QUERY_KEY)

  const margin = spacing * w
  const wb = w - (slices.length - 1) * margin
  const dataWithLayout = React.useMemo(() => {
    const totalLength = slices.reduce((sum, slice) => sum + slice.length, 0)
    return slices
      .map(slice => ({
        ...slice,
        w: (wb * slice.length) / totalLength
      }))
      .map((slice, i, input) => ({
        ...slice,
        x: input
          .filter((_, j) => j < i)
          .reduce((sum, slice) => sum + (slice.w + margin), 0)
      }))
  }, [wb, margin, slices])

  const yScale = React.useMemo(
    () =>
      scaleLinear<number>({
        range: [3 * margin, h],
        domain: [0, Math.max(...dataWithLayout.map(slice => slice.data.length))]
      }),
    [h, dataWithLayout]
  )

  return (
    <Group {...props}>
      {dataWithLayout.map(slice => {
        const barH = yScale(slice.data.length)

        return (
          <React.Fragment key={slice.key}>
            {slice.data.length > 0 && (
              <chakra.rect
                fill={fill}
                fillOpacity={fillOpacity}
                x={slice.x}
                y={h - barH}
                width={slice.w}
                height={`${barH}px`}
                rx={margin * 1}
                cursor="pointer"
                onClick={() => setQuery(slice.key)}
                aria-label={`${slice.key} • ${slice.labels.long}`}
                opacity={0.9}
                _hover={{
                  opacity: 1
                }}
              />
            )}
            {slice.data.length > 0 && (
              <Text
                x={slice.x + slice.w * 0.5}
                y={h - 2 * margin}
                width={slice.w}
                scaleToFit={true}
                fontSize="0.8em"
                textAnchor="middle"
                verticalAnchor="end"
                fill={useColorModeValue('gray.700', 'accent.100')}
                opacity={0.8}
                cursor="pointer"
                onClick={() => setQuery(slice.key)}
                sx={{
                  'rect:hover + * &, &:hover': {
                    opacity: 1
                  }
                }}
              >
                {slice.data.length}
              </Text>
            )}
            <Text
              x={slice.x + slice.w * 0.5}
              y={h + 2 * margin}
              width={slice.w}
              scaleToFit={true}
              fontSize="0.8em"
              textAnchor="middle"
              verticalAnchor="start"
              fill={useColorModeValue('gray.700', 'accent.200')}
              fillOpacity={useColorModeValue(1, 0.7)}
              opacity={0.7}
              cursor="pointer"
              onClick={() => setQuery(slice.key)}
              sx={{
                'rect:hover + * &, &:hover': {
                  opacity: 1
                }
              }}
            >
              {slice.labels.short}
            </Text>
          </React.Fragment>
        )
      })}
    </Group>
  )
}
