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
} from 'src/lib/timeGraph'
import { TimeGraphNavigation } from './timeGraph/Navigation'

export interface SandboxProps extends BoxProps {}

export const Sandbox: React.FC<SandboxProps> = ({ ...props }) => {
  const { interval, fine, base, duration, set } = useTimeInterval()
  const {
    coarse: coarseSlices,
    fine: fineSlices,
    lengthUnit
  } = enumerateTimeSlices({
    base,
    duration
  })
  return (
    <Box {...props}>
      <Flex justifyContent="flex-end">
        <TimeGraphNavigation />
      </Flex>
      <Button
        d="block"
        size="xs"
        onClick={() => set(parseTimeQuery('2020-10-25--P1D'))}
      >
        25th October (DST +1h)
      </Button>
      <Button
        d="block"
        size="xs"
        onClick={() => set(parseTimeQuery('2020-03-29--P1D'))}
      >
        29th March (DST -1h)
      </Button>
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
          isDisabled={!slice.key}
          onClick={() => set(parseTimeQuery(slice.key ?? ''))}
        >
          {slice.key} • {slice.labels.long} • {slice.length} {lengthUnit}
        </Button>
      ))}
      <Text>Fine</Text>
      {fineSlices.map(slice => (
        <Button
          d="block"
          size="xs"
          key={slice.key}
          isDisabled={!slice.key}
          onClick={() => set(parseTimeQuery(slice.key ?? ''))}
        >
          {slice.key} • {slice.labels.long} • {slice.length} {lengthUnit}
        </Button>
      ))}
      {/* <Bargraph width={800} /> */}
    </Box>
  )
}
