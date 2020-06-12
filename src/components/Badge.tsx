import React from 'react'
import PseudoBox, { PseudoBoxProps } from '@chakra-ui/core/dist/PseudoBox'
import { useTheme } from '@chakra-ui/core/dist/ThemeProvider'
import { useColor } from 'src/ui/colors'
import { ColorKeys, CustomTheme } from 'src/ui/theme'

export interface BadgeProps extends PseudoBoxProps {
  variantColor?: ColorKeys
}

export const Badge: React.FC<BadgeProps> = ({
  variantColor = 'accent',
  ...props
}) => {
  const theme = useTheme() as CustomTheme
  const colorProps = {
    bg:
      variantColor === 'accent'
        ? useColor('accent.100', 'var(--colors-badge-bg-dark)')
        : useColor(`${variantColor}.100`, theme.badgeBgDark[variantColor]),
    color: useColor(`${variantColor}.800`, `${variantColor}.200`)
  } as const
  return (
    <PseudoBox
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
