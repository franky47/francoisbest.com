import React from 'react'
import {
  Alert,
  AlertProps,
  AlertDescription,
  AlertTitle,
  Flex,
  Box,
  BoxProps,
  useColorMode
} from '@chakra-ui/react'
import {
  FiInfo,
  FiAlertCircle,
  FiAlertTriangle,
  FiCheckCircle
} from 'react-icons/fi'
import type { IconType } from 'react-icons/lib/cjs'

export interface NoteProps extends Omit<AlertProps, 'status'> {
  status: AlertProps['status'] | 'note'
  icon?: IconType
  titleProps?: BoxProps
}

const styles = {
  note: {
    defaultIcon: null,
    accent: {
      light: 'gray.500',
      dark: 'gray.300'
    },
    color: {
      light: 'gray.800',
      dark: 'gray.100'
    },
    bg: {
      light: 'gray.50',
      dark: 'gray.800'
    }
  },
  info: {
    defaultIcon: FiInfo,
    accent: {
      light: 'blue.500',
      dark: 'blue.300'
    },
    color: {
      light: 'blue.800',
      dark: 'blue.100'
    },
    bg: {
      light: 'blue.50',
      dark: '#243751'
    }
  },
  success: {
    defaultIcon: FiCheckCircle,
    accent: {
      light: 'green.500',
      dark: 'green.300'
    },
    bg: {
      light: 'green.50',
      dark: '#224636'
    },
    color: {
      light: 'green.800',
      dark: 'green.100'
    }
  },
  warning: {
    defaultIcon: FiAlertTriangle,
    accent: {
      light: 'orange.500',
      dark: 'orange.300'
    },
    bg: {
      light: 'orange.50',
      dark: '#534325'
    },
    color: {
      light: 'orange.800',
      dark: 'orange.100'
    }
  },
  error: {
    defaultIcon: FiAlertCircle,
    accent: {
      light: 'red.500',
      dark: 'red.300'
    },
    bg: {
      light: 'red.50',
      dark: '#442929'
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
      rounded="sm"
      variant="left-accent"
      p={4}
      bg={bg[colorMode]}
      color={color[colorMode]}
      borderLeftColor={accent[colorMode]}
      flexWrap="wrap"
      flexDirection={!!title ? 'column' : 'row'}
      alignItems={!!title ? 'flex-start' : 'center'}
      {...props}
    >
      {(Icon || !!title) && (
        <HeaderWrapper wrap={!!title} mb={2} alignItems="center">
          {Icon && (
            <Box
              as={Icon}
              size={5}
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
