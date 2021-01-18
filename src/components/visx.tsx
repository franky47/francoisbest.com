import React from 'react'
import {
  Box,
  Text,
  BoxProps,
  Flex,
  //useToken,
  Button
} from '@chakra-ui/react'
// import { Bar } from '@visx/shape'
// import { Group } from '@visx/group'
// import { LinearGradient } from '@visx/gradient'
// import letterFrequency, {
//   LetterFrequency
// } from '@visx/mock-data/lib/mocks/letterFrequency'
// import { scaleBand, scaleLinear } from '@visx/scale'
import {
  dayjs,
  enumerateTimeSlices,
  parseTimeQuery,
  stringifyDuration,
  useTimeInterval
} from 'src/lib/timeInterval'
import { TimeGraphNavigation } from './TimeGraph/Navigation'

export interface SandboxProps extends BoxProps {}

export const Sandbox: React.FC<SandboxProps> = ({ ...props }) => {
  const { interval, fine, base, duration, set } = useTimeInterval()
  const { coarse: coarseSlices, fine: fineSlices } = enumerateTimeSlices({
    base,
    duration
  })
  return (
    <Box {...props}>
      <Flex justifyContent="flex-end">
        <TimeGraphNavigation />
      </Flex>
      <pre>
        <code>
          {'from:   '}
          {dayjs(interval.from).format('YYYY-MM-DDTHH:mm:ss')}
          <br />
          {'to:     '}
          {dayjs(interval.to).format('YYYY-MM-DDTHH:mm:ss')}
          <br />
          {'delta:  '}
          {stringifyDuration(duration)}
          <br />
          {'fine:   '}
          {stringifyDuration(fine)}
        </code>
      </pre>
      <Text>Coarse</Text>
      {coarseSlices.map(slice => (
        <Button
          d="block"
          size="xs"
          key={slice.key}
          onClick={() => set(parseTimeQuery(slice.key))}
        >
          {slice.label}
        </Button>
      ))}
      <Text>Fine</Text>
      {fineSlices.map(slice => (
        <Button
          d="block"
          size="xs"
          key={slice.key}
          onClick={() => set(parseTimeQuery(slice.key))}
        >
          {slice.label}
        </Button>
      ))}
      {/* <Bargraph width={800} /> */}
    </Box>
  )
}

// --

// const data = letterFrequency
// const verticalMargin = 120

// // accessors
// const getLetter = (d: LetterFrequency) => d.letter
// const getLetterFrequency = (d: LetterFrequency) => Number(d.frequency) * 100

// export type BarsProps = {
//   width: number
//   height?: number
//   events?: boolean
// }

// const useColor = (token: string) => useToken('colors', token)

// export default function Bargraph({
//   width,
//   height = width * 0.4,
//   events = false
// }: BarsProps) {
//   // bounds
//   const xMax = width
//   const yMax = height // - verticalMargin

//   // scales, memoize for performance
//   const xScale = React.useMemo(
//     () =>
//       scaleBand<string>({
//         range: [0, xMax],
//         round: true,
//         domain: data.map(getLetter),
//         padding: 0.4
//       }),
//     [xMax]
//   )
//   const yScale = React.useMemo(
//     () =>
//       scaleLinear<number>({
//         range: [yMax, 0],
//         round: true,
//         domain: [0, Math.max(...data.map(getLetterFrequency))]
//       }),
//     [yMax]
//   )

//   const maxBarHeight = data.reduce(
//     (max, d) => Math.max(yScale(getLetterFrequency(d)) ?? 0, max),
//     0
//   )

//   return width < 10 ? null : (
//     <svg
//       // don't specify the dimensions for responsive
//       // width={width}
//       // height={height}
//       viewBox={`0 0 ${width} ${height}`}
//       style={{ maxWidth: '100%' }}
//     >
//       <LinearGradient
//         from={useColor('gray.900')}
//         to={useColor('accent.900')}
//         id="bg-gradient"
//       />
//       <rect width={width} height={height} fill="url(#bg-gradient)" />
//       <Group
//         top={
//           height - maxBarHeight - 2 * xScale.paddingOuter() * xScale.bandwidth()
//         }
//       >
//         {data.map(d => {
//           const letter = getLetter(d)
//           const barWidth = xScale.bandwidth()
//           const barHeight = yMax - (yScale(getLetterFrequency(d)) ?? 0)
//           const barX = xScale(letter)
//           const barY = yMax - barHeight
//           return (
//             <Bar
//               key={`bar-${letter}`}
//               x={barX}
//               y={barY}
//               width={barWidth}
//               height={barHeight}
//               fill={useColor('accent.400')}
//               onClick={() => {
//                 if (events)
//                   alert(`clicked: ${JSON.stringify(Object.values(d))}`)
//               }}
//             />
//           )
//         })}
//       </Group>
//     </svg>
//   )
// }
