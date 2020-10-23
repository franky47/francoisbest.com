import React from 'react'
import Stack, { StackProps } from '@chakra-ui/core/dist/Stack'
import { defaultTimeRange, useTimeRange } from 'src/ui/timeRange'
import { Button, IconButton, Text } from '@chakra-ui/core'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export interface TimeRangeProps extends StackProps {}

export const TimeRange: React.FC<TimeRangeProps> = ({ ...props }) => {
  const {
    range,
    next,
    previous,
    set,
    canDoNext,
    canDoPrevious
  } = useTimeRange()

  return (
    <Stack isInline alignItems="center" {...props}>
      <Button onClick={() => set(defaultTimeRange)}>Reset</Button>
      <IconButton
        icon={FiChevronLeft}
        isDisabled={!canDoPrevious}
        onClick={previous}
        aria-label="Previous"
      />
      <Text>{range.label}</Text>
      <IconButton
        icon={FiChevronRight}
        isDisabled={!canDoNext}
        onClick={next}
        aria-label="Next"
      />
    </Stack>
  )
}
