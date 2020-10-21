import React from 'react'
import Stack, { StackProps } from '@chakra-ui/core/dist/Stack'
import { Stat, StatLabel, StatNumber, StatGroup } from '@chakra-ui/core'

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
  ...props
}) => {
  return (
    <Stack {...props}>
      <StatGroup textAlign="center">
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
    </Stack>
  )
}
