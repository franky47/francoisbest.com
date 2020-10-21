import React from 'react'
import Stack, { StackProps } from '@chakra-ui/core/dist/Stack'
import {
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Box,
  Flex
} from '@chakra-ui/core'
import { Graph } from '../Graph'
import dayjs from 'dayjs'
import { H5 } from 'src/components/primitives/Typography'
import { FiDownload } from 'react-icons/fi'

export interface NpmPackageStatsData {
  lastWeek: number
  lastMonth: number
  lastYear: number
  allTime: number
  last30Days: number[]
}

export interface NpmPackageStatsProps extends StackProps, NpmPackageStatsData {}

function formatNumber(number: number): string {
  return number.toLocaleString('en-GB', {
    notation: 'compact',
    unitDisplay: 'short'
  })
}

export const NpmPackageStats: React.FC<NpmPackageStatsProps> = ({
  lastWeek,
  lastMonth,
  lastYear,
  allTime,
  last30Days,
  ...props
}) => {
  const now = dayjs()
  return (
    <Stack spacing={4} mb={8} {...props}>
      <Flex justifyContent="space-between" alignItems="baseline">
        <H5 my={0}>
          <Box as={FiDownload} mr={2} mt={-1} d="inline" />
          NPM Downloads
        </H5>
      </Flex>
      <StatGroup textAlign="center" mb={4}>
        <Stat>
          <StatLabel fontSize="xs">Last Week</StatLabel>
          <StatNumber fontSize="xl">{formatNumber(lastWeek)}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel fontSize="xs">Last Month</StatLabel>
          <StatNumber fontSize="xl">{formatNumber(lastMonth)}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel fontSize="xs">Last Year</StatLabel>
          <StatNumber fontSize="xl">{formatNumber(lastYear)}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel fontSize="xs">All Time</StatLabel>
          <StatNumber fontSize="xl">{formatNumber(allTime)}</StatNumber>
        </Stat>
      </StatGroup>
      <Graph
        h="80px"
        data={last30Days.map((value, i) => ({
          date: now.subtract(30 - i, 'day').format('YYYY-MM-DD'),
          value
        }))}
      />
    </Stack>
  )
}
