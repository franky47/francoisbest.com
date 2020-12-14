import React from 'react'
import {
  Stack,
  StackProps,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Box,
  Text
} from '@chakra-ui/react'
import { OutgoingLink } from '@47ng/chakra-next'
import { FiDownload, FiPackage } from 'react-icons/fi'
import { H5 } from 'src/components/primitives/Typography'
import { formatStatNumber } from 'src/ui/format'
import { NpmDownloadsGraph } from './NpmDownloadsGraph'

export interface NpmPackageStatsData {
  packageName: string
  lastWeek: number
  lastMonth: number
  lastYear: number
  allTime: number
  last30Days: number[]
  lastDate: string
}

export interface NpmPackageStatsProps extends StackProps, NpmPackageStatsData {}

export const NpmPackageStats: React.FC<NpmPackageStatsProps> = ({
  packageName,
  lastWeek,
  lastMonth,
  lastYear,
  allTime,
  last30Days,
  lastDate,
  ...props
}) => {
  return (
    <Stack spacing={4} pb="2px" overflow="hidden" {...props}>
      <Stack isInline alignItems="baseline" spacing={4}>
        <H5 my={0}>
          <OutgoingLink href={`https://www.npmjs.com/package/${packageName}`}>
            <Box as={FiPackage} d="inline" mr={1} mt={-0.75} />
            {packageName}
          </OutgoingLink>
        </H5>
        <Text fontSize="sm" fontWeight="medium" display={['none', 'block']}>
          <Box as={FiDownload} mr={1} mt={-1} d="inline" />
          NPM Downloads
        </Text>
      </Stack>
      <StatGroup textAlign="center" alignItems="flex-end">
        <Stat>
          <StatLabel fontSize="xs">Last Week</StatLabel>
          <StatNumber fontSize="xl">{formatStatNumber(lastWeek)}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel fontSize="xs">Last Month</StatLabel>
          <StatNumber fontSize="xl">{formatStatNumber(lastMonth)}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel fontSize="xs">Last Year</StatLabel>
          <StatNumber fontSize="xl">{formatStatNumber(lastYear)}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel fontSize="xs">All Time</StatLabel>
          <StatNumber fontSize="xl">{formatStatNumber(allTime)}</StatNumber>
        </Stat>
      </StatGroup>
      <NpmDownloadsGraph h="80px" downloads={last30Days} lastDate={lastDate} />
    </Stack>
  )
}
