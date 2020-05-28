import { defaultTheme, Theme } from '@47ng/chakra-next'
import { ColorHues } from '@chakra-ui/core/dist/theme'

export interface CustomTheme extends Theme {
  colors: Theme['colors'] & {
    accent: ColorHues
    '47ng-light': string
    '47ng-dark': string
  }
}

export const theme: CustomTheme = {
  ...defaultTheme,
  colors: {
    '47ng-light': '#2f2f2f',
    '47ng-dark': '#d3d3df',
    ...defaultTheme.colors,
    accent: {
      50: '#dbf4ff',
      100: '#addbff',
      200: '#7cc1ff',
      300: '#4aa8ff',
      400: '#1a8fff',
      500: '#0076e6',
      600: '#005cb4',
      700: '#004182',
      800: '#002751',
      900: '#000e21'
    }
  }
}
