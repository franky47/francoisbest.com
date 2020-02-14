import React from 'react'
import { Heading, useColorMode, Text } from '@chakra-ui/core'

const UnderlinedHeading = (p: any) => {
  const { colorMode } = useColorMode()
  return (
    <Heading
      pb={1}
      borderBottomWidth="1px"
      borderBottomColor={colorMode === 'light' ? 'gray.100' : 'gray.700'}
      {...p}
    />
  )
}

// --

export const H1 = (p: any) => (
  <UnderlinedHeading as="h1" size="xl" mb={4} {...p} />
)

export const H2 = (p: any) => <Heading as="h2" mt={6} mb={4} size="lg" {...p} />
export const H3 = (p: any) => <Heading as="h3" mt={6} mb={4} size="lg" {...p} />
export const H4 = (p: any) => <Heading as="h4" mt={6} mb={4} size="md" {...p} />
export const H5 = (p: any) => <Heading as="h5" mt={6} mb={4} size="sm" {...p} />
export const H6 = (p: any) => <Heading as="h6" mt={6} mb={4} size="xs" {...p} />

export const Paragraph = (p: any) => <Text lineHeight="1.6" mb={8} {...p} />
