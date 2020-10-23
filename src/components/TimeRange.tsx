import React from 'react'
import Stack, { StackProps } from '@chakra-ui/core/dist/Stack'
import {
  defaultTimeRange,
  TimeRange as TimeRangeType,
  timeRanges,
  useTimeRange
} from 'src/ui/timeRange'
import { Button, IconButton, Select, SelectProps } from '@chakra-ui/core'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useKeyPressEvent } from 'react-use'

export interface TimeRangeProps extends StackProps {}

export const TimeRange: React.FC<TimeRangeProps> = ({ ...props }) => {
  const { next, previous, set, canDoNext, canDoPrevious } = useTimeRange()
  useKeyPressEvent('ArrowLeft', previous)
  useKeyPressEvent('ArrowRight', next)
  return (
    <Stack isInline alignItems="center" {...props}>
      <Button onClick={() => set(defaultTimeRange)}>Reset</Button>
      <IconButton
        icon={FiChevronLeft}
        isDisabled={!canDoPrevious}
        onClick={previous}
        aria-label="Previous"
      />
      <TimeRangeSelect />
      <IconButton
        icon={FiChevronRight}
        isDisabled={!canDoNext}
        onClick={next}
        aria-label="Next"
      />
    </Stack>
  )
}

// --

export const TimeRangeSelect: React.FC<SelectProps> = ({ ...props }) => {
  const { range, set } = useTimeRange()
  const value = JSON.stringify(range)
  return (
    <Select
      value={value}
      onChange={e => {
        const range: TimeRangeType = JSON.parse(e.target.value)
        set(range)
      }}
      {...props}
    >
      {!timeRanges.map(range => JSON.stringify(range)).includes(value) && (
        <option value={value}>{range.label}</option>
      )}
      {timeRanges.map(range => {
        const value = JSON.stringify(range)
        return (
          <option key={value} value={value}>
            {range.label}
          </option>
        )
      })}
    </Select>
  )
}
