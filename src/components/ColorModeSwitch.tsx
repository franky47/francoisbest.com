import React from 'react'
import { IconButton, IconButtonProps, useColorMode } from '@chakra-ui/react'
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
      icon={colorMode === 'dark' ? <FiMoon /> : <FiSun />}
      isRound
      onMouseDown={toggleColorMode}
      {...props}
    />
  )
}
