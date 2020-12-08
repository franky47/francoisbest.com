import React from 'react'
import { IconButton, IconButtonProps } from '@chakra-ui/react'
import { Svg, SvgProps } from '@47ng/chakra-next'
import { theme, ColorKeys } from 'src/ui/theme'
import { useLinkColor, accentKeys } from 'src/ui/colors'
import { useLocalSetting } from 'src/hooks/useLocalSetting'
import { css, Global } from '@emotion/react'

export const AccentPickerIcon: React.FC<SvgProps> = ({ ...props }) => {
  const color = useLinkColor()
  return (
    <Svg viewBox="0 0 24 24" width={4} height={4} fill={color} {...props}>
      <circle cx="12" cy="12" r="10" />
    </Svg>
  )
}

export const AccentPicker: React.FC<IconButtonProps> = ({ ...props }) => {
  const [key, setAccentKey] = useLocalSetting<ColorKeys>(
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
      icon={<AccentPickerIcon />}
      isRound
      onMouseDown={update}
      {...props}
    />
  )
}

export const AccentGlobal: React.FC = () => {
  const [accentKey] = useLocalSetting<ColorKeys>('accent', 'defaultAccent')
  const accent = theme.colors[accentKey]
  const styles = React.useMemo(
    () => css`
      :root {
        --colors-accent-50: ${accent[50]};
        --colors-accent-100: ${accent[100]};
        --colors-accent-200: ${accent[200]};
        --colors-accent-300: ${accent[300]};
        --colors-accent-400: ${accent[400]};
        --colors-accent-500: ${accent[500]};
        --colors-accent-600: ${accent[600]};
        --colors-accent-700: ${accent[700]};
        --colors-accent-800: ${accent[800]};
        --colors-accent-900: ${accent[900]};
        --colors-badge-bg-dark: ${theme.badgeBgDark[accentKey]};
      }
    `,
    [accentKey]
  )
  return <Global styles={styles} />
}
