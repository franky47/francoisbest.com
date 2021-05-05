import {
  Alert,
  AlertDescription,
  AlertProps,
  AlertTitle,
  Box,
  BoxProps,
  Flex,
  useColorMode
} from '@chakra-ui/react'
import React from 'react'
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo
} from 'react-icons/fi'
import type { IconType } from 'react-icons/lib/cjs'
import { useAccentStyles } from '../Accent'

export interface NoteProps extends Omit<AlertProps, 'status'> {
  status: AlertProps['status'] | 'note'
  icon?: IconType
  titleProps?: BoxProps
}

const styles = {
  note: {
    defaultIcon: null,
    accent: {
      key: null,
      light: 'gray.500',
      dark: 'gray.300'
    },
    color: {
      light: 'gray.800',
      dark: 'gray.100'
    },
    bg: {
      light: 'gray.50',
      dark: '#1e2533'
    }
  },
  info: {
    defaultIcon: FiInfo,
    accent: {
      key: 'blue',
      light: 'blue.500',
      dark: 'blue.300'
    },
    color: {
      light: 'blue.800',
      dark: 'blue.100'
    },
    bg: {
      light: 'blue.50',
      dark: '#162435'
    }
  },
  success: {
    defaultIcon: FiCheckCircle,
    accent: {
      key: 'green',
      light: 'green.500',
      dark: 'green.300'
    },
    bg: {
      light: 'green.50',
      dark: '#132c21'
    },
    color: {
      light: 'green.800',
      dark: 'green.100'
    }
  },
  warning: {
    defaultIcon: FiAlertTriangle,
    accent: {
      key: 'orange',
      light: 'orange.500',
      dark: 'orange.300'
    },
    bg: {
      light: 'orange.50',
      dark: '#302614'
    },
    color: {
      light: 'orange.800',
      dark: 'orange.100'
    }
  },
  error: {
    defaultIcon: FiAlertCircle,
    accent: {
      key: 'red',
      light: 'red.500',
      dark: 'red.300'
    },
    bg: {
      light: 'red.50',
      dark: '#311c1c'
    },
    color: {
      light: 'red.800',
      dark: 'red.100'
    }
  }
} as const

export const Note: React.FC<NoteProps> = ({
  title,
  status = 'note',
  icon,
  titleProps = {},
  children,
  ...props
}) => {
  const { colorMode } = useColorMode()
  const { defaultIcon, accent, bg, color } = styles[status]

  const Icon = icon || defaultIcon
  return (
    <Alert
      rounded={['none', 'sm']}
      variant="left-accent"
      p={4}
      bg={bg[colorMode]}
      color={color[colorMode]}
      borderLeftColor={accent[colorMode]}
      flexWrap="wrap"
      flexDirection={!!title ? 'column' : 'row'}
      alignItems={!!title ? 'flex-start' : 'center'}
      w="auto"
      css={{
        ...(accent.key ? useAccentStyles(accent.key) : {}),
        '& p:last-child': {
          marginBottom: 0
        }
      }}
      mx={[-4, 0]}
      {...props}
    >
      {(Icon || !!title) && (
        <HeaderWrapper wrap={!!title} mb={2} alignItems="center">
          {Icon && (
            <Box
              as={Icon}
              role="img"
              aria-hidden
              w={5}
              h={5}
              color={accent[colorMode]}
              mr={2}
              flexShrink={0}
            />
          )}
          {title && (
            <AlertTitle mr={4} {...titleProps}>
              {title}
            </AlertTitle>
          )}
        </HeaderWrapper>
      )}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}

const HeaderWrapper: React.FC<any> = ({ wrap, children, ...props }) => {
  if (wrap) {
    return <Flex {...props}>{children}</Flex>
  }
  return children
}
