import React from 'react'
import {
  useColorModeValue,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  BoxProps
} from '@chakra-ui/react'
import { formatStatNumber } from 'src/ui/format'

// --

export interface ReadingListStatsData {
  oldest: string
  week: number
  month: number
  total: number
  lastWeekPct: number
  lastMonthPct: number
}

export interface ReadingListStatsProps extends BoxProps, ReadingListStatsData {}

export const ReadingListStats: React.FC<ReadingListStatsProps> = ({
  oldest,
  week,
  month,
  total,
  lastWeekPct,
  lastMonthPct,
  ...props
}) => {
  return (
    <StatGroup {...props}>
      <Stat flex={2} ml={2}>
        <StatLabel>Articles Read</StatLabel>
        <StatNumber fontSize="4xl">{formatStatNumber(total)}</StatNumber>
        <StatHelpText fontSize="xs">Since {oldest}</StatHelpText>
      </Stat>
      <Stat textAlign="center">
        <StatLabel>This Week</StatLabel>
        <StatNumber>{week}</StatNumber>
        {lastWeekPct !== 0 && (
          <StatHelpText
            fontSize="xs"
            color={useColorModeValue(
              lastWeekPct > 0 ? 'green.500' : 'red.500',
              lastWeekPct > 0 ? 'green.400' : 'red.400'
            )}
          >
            <StatArrow type={lastWeekPct > 0 ? 'increase' : 'decrease'} />
            {formatStatNumber(lastWeekPct, {
              signDisplay: 'exceptZero'
            })}
            %
          </StatHelpText>
        )}
      </Stat>
      <Stat textAlign="center">
        <StatLabel>This Month</StatLabel>
        <StatNumber>{month}</StatNumber>
        {lastMonthPct !== 0 && (
          <StatHelpText
            fontSize="xs"
            color={useColorModeValue(
              lastMonthPct > 0 ? 'green.600' : 'red.600',
              lastMonthPct > 0 ? 'green.400' : 'red.400'
            )}
          >
            <StatArrow type={lastMonthPct > 0 ? 'increase' : 'decrease'} />
            {formatStatNumber(lastMonthPct, {
              signDisplay: 'exceptZero'
            })}
            %
          </StatHelpText>
        )}
      </Stat>
    </StatGroup>
  )
}
