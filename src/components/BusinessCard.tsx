import React from 'react'
import { Text } from '@chakra-ui/core'
import { Card, CardProps } from '@47ng/chakra-next'
import { Footer } from 'src/layouts/components/Footer'
import { useColor } from 'src/ui/colors'
import { Author } from './blog/Author'

export interface BusinessCardProps extends CardProps {}

export const BusinessCard: React.FC<BusinessCardProps> = ({ ...props }) => {
  return (
    <Card
      my={8}
      maxW="sm"
      {...props}
      borderColor={useColor('gray.200', 'gray.800')}
      borderWidth="1px"
      bg={useColor('white', '#151922')}
      rounded="md"
      shadow="xl"
      mx="auto"
    >
      <Author justifyContent="center" mt={4} mb={8} />
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
