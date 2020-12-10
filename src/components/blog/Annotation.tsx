import React from 'react'
import { Box, BoxProps, useColorMode, useTheme } from '@chakra-ui/react'
import type { ColorHues } from '@chakra-ui/theme/dist/types/foundations/colors'
// import { CustomTheme } from 'src/ui/theme'
import { RoughNotation, RoughNotationProps } from 'react-rough-notation'
import { ColorKeys } from 'src/ui/theme'

export interface AnnotationProps extends BoxProps {
  type: RoughNotationProps['type']
  color: keyof typeof colors
  children: React.ReactNode // Required
}

const colors = {
  black: {
    light: 'currentColor',
    dark: 'currentColor'
  },
  accent: {
    light: 'accent.500',
    dark: 'accent.400'
  },
  red: {
    light: 'red.600',
    dark: 'red.400'
  },
  blue: {
    light: 'blue.500',
    dark: 'blue.400'
  },
  yellow: {
    light: 'yellow.400',
    dark: 'yellow.900'
  },
  green: {
    light: 'green.500',
    dark: 'green.400'
  }
} as const

function resolveColor(color: string, theme: any) {
  if (color === 'currentColor') {
    return 'currentColor'
  }
  const [hue, level] = color.split('.')
  return theme.colors[(hue as unknown) as ColorKeys][
    (level as unknown) as keyof ColorHues
  ]
}

export const Annotation: React.FC<AnnotationProps> = ({
  type = 'underline',
  color = 'accent',
  children,
  ...props
}) => {
  const [hydrated, setHydrated] = React.useState(false)
  const theme = useTheme()
  const { colorMode } = useColorMode()

  React.useEffect(() => {
    setHydrated(true)
  }, [])

  const colorValue = resolveColor(colors[color][colorMode], theme)

  if (!hydrated) {
    return children as any
  }
  return (
    <Box
      {...props}
      as={({ type: _type, ...p }) => (
        <As type={type} color={colorValue} customElement={props.as} {...p} />
      )}
    >
      {children}
    </Box>
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
