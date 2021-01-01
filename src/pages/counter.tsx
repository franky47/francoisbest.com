import React from 'react'
import { NextPage } from 'next'
import dayjs from 'dayjs'
import {
  Container,
  Progress,
  Stat,
  StatNumber,
  StatHelpText,
  StatGroup
} from '@chakra-ui/react'

export interface CounterProps {}

const goal = 100
const ref = dayjs('2020-11-21')

const Counter: NextPage<CounterProps> = ({}) => {
  const days = dayjs().diff(ref, 'day')
  const weeks = dayjs().diff(ref, 'week')
  const months = dayjs().diff(ref, 'month')
  return (
    <Container my={8}>
      <StatGroup textAlign="center" mb={4}>
        <Stat>
          <StatNumber>{days}</StatNumber>
          <StatHelpText>days</StatHelpText>
        </Stat>
        <Stat>
          <StatNumber>{weeks}</StatNumber>
          <StatHelpText>weeks</StatHelpText>
        </Stat>
        <Stat>
          <StatNumber>{months}</StatNumber>
          <StatHelpText>months</StatHelpText>
        </Stat>
      </StatGroup>
      <Progress value={(100 * days) / goal} rounded="sm" />
    </Container>
  )
}

export default Counter
