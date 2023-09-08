'use client'

import React from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { TbSunMoon } from 'react-icons/tb'
import { twMerge } from 'tailwind-merge'
import { IconButton, IconButtonProps } from 'ui/components/buttons/icon-button'
import { useHydration } from 'ui/hooks/useHydration'
import { Theme, applyTheme, themeEmitter } from 'ui/theme/theme'

type ThemeControlsProps = Omit<IconButtonProps, 'aria-label' | 'icon'>

function loadThemeFromStorage() {
  if (typeof window === 'undefined') {
    return 'system'
  }
  const storageTheme = localStorage.getItem('theme')
  if (!storageTheme) {
    return 'system'
  }
  if (storageTheme === 'dark') {
    return 'dark'
  }
  return 'light'
}

export const ThemeControls: React.FC<ThemeControlsProps> = ({
  className,
  ...props
}) => {
  const [theme, setTheme] = React.useState<Theme>(loadThemeFromStorage)
  const hydrated = useHydration()

  const onClick = React.useCallback(() => {
    if (theme === 'light') {
      setTheme('dark')
      applyTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
      applyTheme('system')
    } else if (theme === 'system') {
      setTheme('light')
      applyTheme('light')
    }
  }, [theme])

  React.useEffect(() => {
    // Since the 'storage' event is not triggered on the page that called it,
    // we're using an event emitter to sync up all the hook states.
    themeEmitter.on('theme', setTheme)
    function onStorage(event: StorageEvent) {
      if (event.key !== 'theme') {
        return
      }
      setTheme(loadThemeFromStorage())
    }
    addEventListener('storage', onStorage)
    return () => {
      themeEmitter.off('theme', setTheme)
      removeEventListener('storage', onStorage)
    }
  }, [])

  const icon =
    theme === 'system' || !hydrated ? (
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
