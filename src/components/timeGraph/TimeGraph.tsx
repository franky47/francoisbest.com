import React from 'react'
import { Box, BoxProps, Flex, useColorModeValue } from '@chakra-ui/react'
import { useTimeSlicedData } from 'src/lib/timeGraph'
import { Graph } from './Graph'
import { TimeGraphNavigation } from './Navigation'
import { CoarseBargraph } from './CoarseBargraph'
import { FineBargraph } from './FineBargraph'
import { EventView } from './EventView'

export interface TimeGraphProps<T> extends BoxProps {
  data: T[]
  getTimestamp: (datum: T) => number
}

export const TimeGraph = <T,>({
  data,
  getTimestamp,
  ...props
}: TimeGraphProps<T>) => {
  const { coarse, fine } = useTimeSlicedData(data, getTimestamp)
  const w = 800
  const h = 320
  const bottomAxisH = 16
  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      rounded="md"
      overflow="hidden"
      {...props}
    >
      <Flex justifyContent="flex-end">
        <TimeGraphNavigation />
      </Flex>
      <Box px={2} pb={2}>
        <Graph w={w} h={h} overflow="visible">
          <EventView
            w={w}
            h={h * 0.125}
            data={data}
            getTimestamp={getTimestamp}
            from={coarse[0].from}
            to={coarse[coarse.length - 1].to}
            top={3 * bottomAxisH}
          />
          <CoarseBargraph
            w={w}
            h={h - bottomAxisH}
            spacing={0.005}
            slices={coarse}
            fill={useColorModeValue('accent.400', 'accent.700')}
            fillOpacity={0.2}
          />
          <FineBargraph
            w={w}
            h={h * 0.5}
            spacing={0.005}
            fill={useColorModeValue('accent.700', 'accent.200')}
            fillOpacity={useColorModeValue(0.4, 0.6)}
            slices={fine}
            top={h * 0.5 - bottomAxisH}
          />
        </Graph>
      </Box>
    </Box>
  )
}
