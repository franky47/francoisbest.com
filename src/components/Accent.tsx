import React from 'react'
import IconButton, { IconButtonProps } from '@chakra-ui/core/dist/IconButton'
import ThemeProvider, { useTheme } from '@chakra-ui/core/dist/ThemeProvider'
import type { ColorHues } from '@chakra-ui/core'
import { SvgBox, SvgBoxProps } from '@47ng/chakra-next'
import { CustomTheme } from 'src/ui/theme'
import { useLinkColor } from 'src/ui/colors'
import { useLocalSetting } from 'src/hooks/useLocalSetting'

export const AccentPickerIcon: React.FC<SvgBoxProps> = ({ ...props }) => {
  const color = useLinkColor()
  return (
    <SvgBox viewBox="0 0 24 24" width={4} height={4} fill={color} {...props}>
      <circle cx="12" cy="12" r="10" />
    </SvgBox>
  )
}

const accentKeys: (keyof CustomTheme['colors'])[] = [
  'defaultAccent',
  'green',
  'indigo',
  'orange',
  'blue',
  'pink',
  'teal',
  'purple',
  'cyan',
  'red'
]

export const AccentPicker: React.FC<IconButtonProps> = ({ ...props }) => {
  const [key, setAccentKey] = useLocalSetting<keyof CustomTheme['colors']>(
    'accent',
    'defaultAccent'
  )

  const update = React.useCallback(() => {
    let index = accentKeys.indexOf(key)
    index = (index + 1) % accentKeys.length
    setAccentKey(accentKeys[index])
  }, [key])

  return (
    <IconButton
      icon={AccentPickerIcon}
      isRound
      onMouseDown={update}
      {...props}
    />
  )
}

export const AccentThemeProvider: React.FC = ({ children }) => {
  const baseTheme = useTheme() as CustomTheme
  const [accentKey] = useLocalSetting<keyof CustomTheme['colors']>(
    'accent',
    'defaultAccent'
  )
  const theme = React.useMemo(
    () => ({
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        accent: baseTheme.colors[accentKey] as ColorHues
      }
    }),
    [accentKey]
  )
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
