import React from 'react'
import { IconButton, Flex, Text, FlexProps } from '@chakra-ui/react'
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsRight,
  FiZoomOut
} from 'react-icons/fi'
import {
  useTimeInterval,
  getDefaultQuery,
  dayjs,
  formatInterval
} from 'src/lib/timeInterval'

export interface TimeGraphNavigationProps extends FlexProps {}

export const TimeGraphNavigation: React.FC<TimeGraphNavigationProps> = ({
  ...props
}) => {
  const {
    previous,
    next,
    zoomOut,
    set,
    interval,
    base,
    duration
  } = useTimeInterval()
  return (
    <Flex as="nav" alignItems="center" {...props}>
      <Text fontSize="sm" display="block" mr={2}>
        {formatInterval({ base, duration })}
      </Text>
      <IconButton
        icon={<FiChevronLeft size="18" />}
        aria-label="Previous"
        variant="ghost"
        rounded="full"
        onClick={previous}
        isDisabled={dayjs(interval.from).isBefore(dayjs('2020-01-01'))}
      />
      <IconButton
        icon={<FiChevronRight size="18" />}
        aria-label="Next"
        variant="ghost"
        rounded="full"
        onClick={next}
        isDisabled={dayjs(interval.to).isAfter(dayjs())}
      />
      <IconButton
        icon={<FiZoomOut size="18" />}
        aria-label="Zoom out"
        variant="ghost"
        rounded="full"
        onClick={zoomOut}
        isDisabled={duration.asYears() >= 1}
      />
      <IconButton
        icon={<FiChevronsRight size="18" />}
        aria-label="Back to today"
        variant="ghost"
        rounded="full"
        onClick={() => set(getDefaultQuery())}
        isDisabled={dayjs(interval.to).isAfter(dayjs())}
      />
    </Flex>
  )
}
