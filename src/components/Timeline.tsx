import React from 'react'
import {
  Box,
  BoxProps,
  Circle,
  Flex,
  useColorModeValue
} from '@chakra-ui/react'
import { ColorKeys } from 'src/ui/theme'
import { FiCheckCircle } from 'react-icons/fi'
import { useAccentStyles } from './Accent'

export interface TimelineItemProps extends BoxProps {
  icon?: any
  boxProps?: BoxProps
  accentColor?: ColorKeys
  skipTrail?: boolean
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  icon = FiCheckCircle,
  boxProps = {},
  accentColor,
  skipTrail = false,
  children,
  ...props
}) => {
  return (
    <Flex minH={skipTrail ? undefined : 20} {...props}>
      <Flex flexDir="column" alignItems="center" mr={4} pos="relative">
        <Circle
          size={12}
          bg={useColorModeValue(`accent.600`, `accent.600`)}
          opacity={useColorModeValue(0.07, 0.15)}
          sx={accentColor ? useAccentStyles(accentColor) : {}}
        />
        <Box
          as={icon}
          size="1.25rem"
          color={useColorModeValue(
            `${accentColor ?? 'accent'}.500`,
            `${accentColor ?? 'accent'}.200`
          )}
          pos="absolute"
          left="0.875rem"
          top="0.875rem"
        />
        {!skipTrail && (
          <Box
            w="1px"
            flex={1}
            bg={useColorModeValue('gray.300', 'gray.700')}
            my={1}
          />
        )}
      </Flex>
      <Box pt={3} {...boxProps}>
        {children}
      </Box>
    </Flex>
  )
}
