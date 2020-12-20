import { extendTheme, ThemeOverride } from '@chakra-ui/react'
import { defaultTheme } from '@47ng/chakra-next'
import { styles } from './styles'
import { colors } from './foundations/colors'
import { textStyles } from './foundations/textStyles'
import { mergeWith } from '@chakra-ui/utils'

// Re-exports
export { useLinkColor, accentKeys } from './foundations/colors'
export type { ColorKeys } from './foundations/colors'

export function makeTheme(overrides: ThemeOverride = {}) {
  const theme = extendTheme({
    colors,
    styles,
    textStyles,
    fonts: defaultTheme.fonts,
    shadows: defaultTheme.shadows,
    config: {
      useSystemColorMode: false,
      initialColorMode: 'light'
    }
  })
  return mergeWith(theme, overrides)
}

export const theme = makeTheme()
