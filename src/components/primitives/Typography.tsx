import React from 'react'
import Text from '@chakra-ui/core/dist/Text'
import ChakraHeading, {
  HeadingProps as ChakraHeadingProps
} from '@chakra-ui/core/dist/Heading'
import { useColorMode } from '@chakra-ui/core/dist/ColorModeProvider'
import { BoxProps } from '@chakra-ui/core/dist/Box'
import { RouteLink } from '@47ng/chakra-next'
import { useLinkColor } from 'src/ui/colors'

const headingColors = {
  light: 'gray.900',
  dark: 'gray.200'
}

export interface HeadingProps extends ChakraHeadingProps {
  linkable?: boolean
}

const Heading: React.FC<HeadingProps> = ({
  linkable = false,
  children,
  ...props
}) => {
  const { colorMode } = useColorMode()
  return (
    <ChakraHeading
      mt={8}
      mb={6}
      color={headingColors[colorMode]}
      css={
        linkable
          ? {
              scrollMarginTop: '100px',
              scrollSnapMargin: '100px', // Safari
              '&[id]:hover a': { opacity: 0.25 },
              '&[id]:hover a:hover': { opacity: 1 }
            }
          : {}
      }
      {...props}
    >
      {children}
      {linkable && (
        <RouteLink
          to={`#${props.id}`}
          aria-label="anchor"
          fontWeight="normal"
          opacity={0}
          ml={2}
          _hover={{
            opacity: 1,
            color: useLinkColor(),
            textDecoration: 'underline'
          }}
          _focus={{
            opacity: 1,
            color: useLinkColor(),
            textDecoration: 'underline'
          }}
        >
          #
        </RouteLink>
      )}
    </ChakraHeading>
  )
}

type P = HeadingProps

export const H1: React.FC<P> = p => <Heading as="h1" size="2xl" {...p} />
export const H2: React.FC<P> = p => <Heading as="h2" size="xl" {...p} />
export const H3: React.FC<P> = p => <Heading as="h3" size="lg" {...p} />
export const H4: React.FC<P> = p => <Heading as="h4" size="md" {...p} />
export const H5: React.FC<P> = p => <Heading as="h5" size="sm" {...p} />
export const H6: React.FC<P> = p => <Heading as="h6" size="xs" {...p} />

export const Paragraph = (p: BoxProps) => <Text as="p" mb={8} {...p} />
