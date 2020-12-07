import React from 'react'
import { Text, useColorModeValue } from '@chakra-ui/react'
import { Card, CardProps } from '@47ng/chakra-next'
import { Footer } from 'src/layouts/components/Footer'
import { H4, HeadingProps } from 'src/components/primitives/Typography'
import { Author } from './blog/Author'

export interface BusinessCardProps extends CardProps {}

const Heading = (p: HeadingProps) => <H4 as="h1" {...p} />

export const BusinessCard: React.FC<BusinessCardProps> = ({ ...props }) => {
  return (
    <Card
      my={8}
      maxW="sm"
      {...props}
      borderColor={useColorModeValue('gray.200', 'gray.800')}
      borderWidth="1px"
      bg={useColorModeValue('white', '#151922')}
      rounded="md"
      shadow="xl"
      mx="auto"
    >
      <Author justifyContent="center" mt={4} mb={8} TitleHeading={Heading} />
      <Text
        px={4}
        mb={2}
        fontStyle="italic"
        color="gray.600"
        textAlign="center"
      >
        Build. Learn. Teach. Repeat.
      </Text>
      <Footer py={0} />
    </Card>
  )
}
