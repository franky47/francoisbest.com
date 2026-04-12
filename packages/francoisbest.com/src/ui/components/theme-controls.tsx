'use client'

import { useTheme } from 'next-themes'
import React from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { TbSunMoon } from 'react-icons/tb'
import { twMerge } from 'tailwind-merge'
import { IconButton, IconButtonProps } from 'ui/components/buttons/icon-button'
import { useHydration } from 'ui/hooks/useHydration'

type ThemeControlsProps = Omit<IconButtonProps, 'aria-label' | 'icon'>

export const ThemeControls: React.FC<ThemeControlsProps> = ({
  className,
  ...props
}) => {
  const { theme, setTheme } = useTheme()
  const hydrated = useHydration()

  const onClick = React.useCallback(() => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }, [theme, setTheme])

  const icon =
    !hydrated || theme === 'system' ? (
      <TbSunMoon />
    ) : theme === 'dark' ? (
      <FiMoon />
    ) : (
      <FiSun />
    )

  return (
    <IconButton
      icon={icon}
      variant="ghost"
      className={twMerge('rounded-full', className)}
      onClick={onClick}
      aria-label={hydrated ? `Theme: ${theme}` : ''}
      title={hydrated ? `Theme: ${theme}` : ''}
      {...props}
    />
  )
}
