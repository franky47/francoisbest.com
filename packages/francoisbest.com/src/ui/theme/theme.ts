// Source:
// https://tailwindcss.com/docs/dark-mode#supporting-system-preference-and-manual-selection

import mitt from 'mitt'

export type Theme = 'light' | 'dark' | 'system'

export const themeEmitter = mitt<{ theme: Theme }>()

export function applyTheme(theme: Theme) {
  themeEmitter.emit('theme', theme)
  if (theme === 'system') {
    localStorage.removeItem('theme')
    if (matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  } else {
    localStorage.setItem('theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}
