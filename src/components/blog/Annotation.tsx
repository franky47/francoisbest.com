import React from 'react'
import PseudoBox, { PseudoBoxProps } from '@chakra-ui/core/dist/PseudoBox'
import { useColorMode } from '@chakra-ui/core/dist/ColorModeProvider'
import { useTheme } from '@chakra-ui/core/dist/ThemeProvider'
import { CustomTheme } from 'src/ui/theme'
import { ColorHues } from '@chakra-ui/core/dist/theme'
import { RoughNotation, RoughNotationProps } from 'react-rough-notation'

export interface AnnotationProps extends PseudoBoxProps {
  type: RoughNotationProps['type']
  color: keyof typeof colors
  children: React.ReactNode // Required
}

const colors = {
  accent: {
    light: 'accent.500',
    dark: 'accent.400'
  },
  red: {
    light: 'red.600',
    dark: 'red.400'
  }
} as const

function resolveColor(color: string, theme: CustomTheme) {
  const [hue, level] = color.split('.')
  return theme.colors[(hue as unknown) as keyof CustomTheme['colors']][
    (level as unknown) as keyof ColorHues
  ]
}

export const Annotation: React.FC<AnnotationProps> = ({
  type = 'underline',
  // color = 'accent',
  children,
  ...props
}) => {
  const [hydrated, setHydrated] = React.useState(false)
  const [color, setColor] = React.useState<keyof typeof colors>('accent')

  const theme = useTheme() as CustomTheme
  const { colorMode } = useColorMode()

  React.useEffect(() => {
    setHydrated(true)
  }, [])

  React.useEffect(() => {
    setTimeout(() => setColor('red'), 3000)
  }, [])

  const colorValue = resolveColor(colors[color][colorMode], theme)

  if (!hydrated) {
    return children as any
  }
  return (
    // <Box as="span" color={colorValue}>
    <PseudoBox
      as={({ type: _type, ...p }) => (
        <As type={type} color={colorValue} {...p} />
      )}
      {...props}
    >
      {children}
    </PseudoBox>
    // </Box>
  )
}

const As: React.FC<RoughNotationProps> = ({
  getAnnotationObject,
  ...props
}) => {
  const showOnChange = React.useCallback((annotation: any) => {
    annotation.show()
    if (getAnnotationObject) {
      getAnnotationObject(annotation)
    }
  }, [])
  return (
    <RoughNotation
      show
      customElement="mark"
      getAnnotationObject={showOnChange}
      {...props}
    />
  )
}
