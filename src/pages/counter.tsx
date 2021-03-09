import {
  Box,
  Stat,
  StatGroup,
  StatHelpText,
  StatNumber
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { NextPage } from 'next'
import { queryTypes, useQueryState } from 'next-usequerystate'
import React from 'react'
import { PageLayout } from 'src/layouts/PageLayout'
import { formatNumber } from 'src/ui/format'

export interface CounterProps {}

// const ref = dayjs()

const Counter: NextPage<CounterProps> = ({}) => {
  const [ref] = useQueryState('ref', {
    ...queryTypes.isoDateTime,
    defaultValue: new Date('2020-11-21T12:51:00+0100')
  })
  const now = dayjs()
  const hours = now.diff(ref, 'hour')
  const minutes = now.diff(ref, 'minute')
  const days = now.diff(ref, 'day')
  const weeks = now.diff(ref, 'week')
  const months = now.diff(ref, 'month')

  const [seconds, setSeconds] = React.useState(() => now.diff(ref, 'second'))

  React.useEffect(() => {
    const t = window.setInterval(() => {
      setSeconds(v => v + 1)
    }, 1000)
    return () => window.clearInterval(t)
  }, [])

  return (
    <PageLayout maxW="6xl">
      <Box my={12}>
        <StatGroup textAlign="center" my={8}>
          <Stat>
            <StatNumber>{months}</StatNumber>
            <StatHelpText>months</StatHelpText>
          </Stat>
          <Stat>
            <StatNumber>{weeks}</StatNumber>
            <StatHelpText>weeks</StatHelpText>
          </Stat>
          <Stat>
            <StatNumber>{days}</StatNumber>
            <StatHelpText>days</StatHelpText>
          </Stat>
        </StatGroup>
        <StatGroup textAlign="center" my={8}>
          <Stat>
            <StatNumber>{formatNumber(hours)}</StatNumber>
            <StatHelpText>hours</StatHelpText>
          </Stat>
          <Stat>
            <StatNumber>{formatNumber(minutes)}</StatNumber>
            <StatHelpText>minutes</StatHelpText>
          </Stat>
          <Stat>
            <StatNumber sx={{ fontVariantNumeric: 'tabular-nums' }}>
              {formatNumber(seconds)}
            </StatNumber>
            <StatHelpText>seconds</StatHelpText>
          </Stat>
        </StatGroup>
      </Box>
    </PageLayout>
  )
}

export default Counter
