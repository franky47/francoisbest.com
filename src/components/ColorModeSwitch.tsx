import React from 'react'
import IconButton, { IconButtonProps } from '@chakra-ui/core/dist/IconButton'
import { useColorMode } from '@chakra-ui/core/dist/ColorModeProvider'
import { FiSun, FiMoon } from 'react-icons/fi'

export interface ColorModeSwitchProps
  extends Omit<IconButtonProps, 'aria-label'> {}

export const ColorModeSwitch: React.FC<ColorModeSwitchProps> = ({
  ...props
}) => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      aria-label={colorMode === 'dark' ? 'Dark Mode' : 'Light Mode'}
      icon={colorMode === 'dark' ? FiMoon : FiSun}
      isRound
      onMouseDown={toggleColorMode}
      {...props}
    />
  )
}
