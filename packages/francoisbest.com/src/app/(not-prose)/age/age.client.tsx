'use client'

import dayjs from 'dayjs'
import { queryTypes, useQueryState } from 'next-usequerystate/app'
import React from 'react'
import { Input } from 'ui/components/forms/inputs'
import { FormControl, FormLabel } from 'ui/components/forms/structure'
import { Stat, StatHelpText, StatNumber } from 'ui/components/stat'
import { formatNumber } from 'ui/format'
import { useHydration } from 'ui/hooks/useHydration'

export const AgeClient: React.FC = ({}) => {
  const hydrated = useHydration()
  const [ref, setRef] = useQueryState('ref', {
    ...queryTypes.isoDateTime,
    defaultValue: new Date('2020-11-21T11:51:00Z'),
  })
  const now = dayjs()
  const seconds = now.diff(ref, 'second')
  const hours = now.diff(ref, 'hour')
  const minutes = now.diff(ref, 'minute')
  const days = now.diff(ref, 'day')
  const weeks = now.diff(ref, 'week')
  const months = now.diff(ref, 'month')
  const [, rerender] = React.useState(0)

  React.useEffect(() => {
    const t = window.setInterval(() => {
      rerender(x => x + 1)
    }, 1000)
    return () => window.clearInterval(t)
  }, [])

  return (
    <>
      <FormControl name="date-of-birth" className="my-8 mx-auto max-w-xs">
        <FormLabel>Date of birth</FormLabel>
        <Input
          type="datetime-local"
          value={ref.toISOString().slice(0, 16)}
          onChange={e => setRef(e.target.valueAsDate)}
        />
      </FormControl>
      <ul className="my-12 grid grid-cols-1 md:grid-cols-3 gap-y-8 text-center">
        <Stat className="mx-auto">
          <StatNumber>{formatNumber(months)}</StatNumber>
          <StatHelpText>months</StatHelpText>
        </Stat>
        <Stat className="mx-auto">
          <StatNumber>{formatNumber(weeks)}</StatNumber>
          <StatHelpText>weeks</StatHelpText>
        </Stat>
        <Stat className="mx-auto">
          <StatNumber>{formatNumber(days)}</StatNumber>
          <StatHelpText>days</StatHelpText>
        </Stat>
        <Stat className="mx-auto">
          <StatNumber>{formatNumber(hours)}</StatNumber>
          <StatHelpText>hours</StatHelpText>
        </Stat>
        <Stat className="mx-auto">
          <StatNumber>{formatNumber(minutes)}</StatNumber>
          <StatHelpText>minutes</StatHelpText>
        </Stat>
        <Stat className="mx-auto">
          <StatNumber className="tabular-nums">
            {hydrated ? formatNumber(seconds) : '--'}
          </StatNumber>
          <StatHelpText>seconds</StatHelpText>
        </Stat>
      </ul>
    </>
  )
}
