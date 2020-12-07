import React from 'react'
import { Box, BoxProps, useTheme, useColorModeValue } from '@chakra-ui/react'
import { ColorKeys, CustomTheme } from 'src/ui/theme'

export interface BadgeProps extends BoxProps {
  colorScheme?: ColorKeys
}

export const Badge: React.FC<BadgeProps> = ({
  colorScheme = 'accent',
  ...props
}) => {
  const theme = useTheme() as CustomTheme
  const colorProps = {
    bg:
      colorScheme === 'accent'
        ? useColorModeValue('accent.100', 'var(--colors-badge-bg-dark)')
        : useColorModeValue(
            `${colorScheme}.100`,
            theme.badgeBgDark[colorScheme]
          ),
    color: useColorModeValue(`${colorScheme}.800`, `${colorScheme}.200`)
  } as const
  return (
    <Box
      display="inline-block"
      px={1}
      fontSize="xs"
      fontWeight="medium"
      rounded="md"
      borderRadius="sm"
      whiteSpace="nowrap"
      {...colorProps}
      {...props}
    />
  )
}
