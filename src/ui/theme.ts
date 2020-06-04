import { defaultTheme, Theme } from '@47ng/chakra-next'
import { ColorHues } from '@chakra-ui/core/dist/theme'

export interface CustomTheme extends Theme {
  colors: Theme['colors'] & {
    accent: ColorHues
    defaultAccent: ColorHues
  }
}

// const defaultAccent = {
//   50: '#dbf4ff',
//   100: '#addbff',
//   200: '#7cc1ff',
//   300: '#4aa8ff',
//   400: '#1a8fff',
//   500: '#0076e6',
//   600: '#005cb4',
//   700: '#004182',
//   800: '#002751',
//   900: '#000e21'
// }

const defaultAccent = {
  50: '#e3f2fc',
  100: '#ddf2ff',
  200: '#abd2fc',
  300: '#5daafc',
  400: '#1a85ff',
  500: '#006be6',
  600: '#0053b4',
  700: '#003b82',
  800: '#002451',
  900: '#000d21'
}

export const theme: CustomTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    defaultAccent,
    accent: defaultAccent
  }
}
