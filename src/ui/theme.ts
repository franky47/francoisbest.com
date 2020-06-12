import { defaultTheme, Theme } from '@47ng/chakra-next'
import { ColorHues } from '@chakra-ui/core/dist/theme'
// @ts-ignore
import { generateAlphaColors } from '@chakra-ui/core/dist/theme/colors-utils'
import { colors, accentKeys } from './colors'

export type ColorKeys = keyof CustomTheme['colors']

export interface CustomTheme extends Theme {
  colors: Theme['colors'] & {
    accent: ColorHues
    defaultAccent: ColorHues
  }
  badgeBgDark: {
    [key: string]: string
  }
}

export const theme: CustomTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    ...colors
  },
  badgeBgDark: {
    ...accentKeys.reduce(
      (obj, key) => ({
        ...obj,
        [key]: generateAlphaColors(colors[key][200])[300]
      }),
      {}
    ),
    accent: '--var(--colors-badge-bg-dark)',
    gray: generateAlphaColors(colors.gray[200])[300]
  }
}
