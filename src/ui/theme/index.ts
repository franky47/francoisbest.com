import { extendTheme } from '@chakra-ui/react'
import { defaultTheme } from '@47ng/chakra-next'
import { styles } from './styles'
import { colors } from './foundations/colors'
import { textStyles } from './foundations/textStyles'

// Re-exports
export { useLinkColor, accentKeys } from './foundations/colors'
export type { ColorKeys } from './foundations/colors'

export const theme = extendTheme({
  colors,
  styles,
  textStyles,
  fonts: defaultTheme.fonts,
  shadows: defaultTheme.shadows,
  config: {
    useSystemColorMode: true
    // initialColorMode: 'light'
  }
})
