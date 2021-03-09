import {
  Box,
  BoxProps,
  Flex,
  IconButton,
  Stack,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react'
import React from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

export interface BrowserWindowFrameProps extends BoxProps {
  url?: string
  urlProps?: BoxProps
}

export const BrowserWindowFrame: React.FC<BrowserWindowFrameProps> = ({
  url,
  urlProps = {},
  children,
  ...props
}) => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box as="section" overflow="hidden" rounded="lg" shadow="2xl" {...props}>
      <Flex
        as="header"
        alignItems="center"
        bg={useColorModeValue('gray.200', 'gray.900')}
        px={4}
        py={2}
      >
        <Stack direction="row" spacing={2} mr={4}>
          <Box rounded="full" boxSize={3} bg="#fd605c" />
          <Box rounded="full" boxSize={3} bg="#febc41" />
          <Box rounded="full" boxSize={3} bg="#31c749" />
        </Stack>
        <Box
          mx="auto"
          py={0.5}
          h="1.5em"
          w={['100%', '50%']}
          px={2}
          textAlign="center"
          bg={useColorModeValue('gray.100', 'gray.1000')}
          rounded="sm"
          fontSize="xs"
          color={useColorModeValue('gray.500', 'gray.700')}
          userSelect="none"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
          {...urlProps}
        >
          {url}
        </Box>
        <Flex w={16} justifyContent="flex-end" alignItems="center">
          <IconButton
            size="xs"
            variant="ghost"
            aria-label={colorMode === 'dark' ? 'Dark Mode' : 'Light Mode'}
            icon={colorMode === 'dark' ? <FiMoon /> : <FiSun />}
            isRound
            onMouseDown={toggleColorMode}
          />
        </Flex>
      </Flex>
      {children}
    </Box>
  )
}
