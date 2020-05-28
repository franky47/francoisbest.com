import { useColorMode } from '@chakra-ui/core/dist/ColorModeProvider'

export function useColor(light: string, dark: string) {
  const { colorMode } = useColorMode()
  switch (colorMode) {
    case 'dark':
      return dark
    case 'light':
      return light
  }
}

export const linkColors = {
  light: 'accent.500',
  dark: 'accent.300'
}

export function useLinkColor() {
  const { colorMode } = useColorMode()
  return linkColors[colorMode]
}
