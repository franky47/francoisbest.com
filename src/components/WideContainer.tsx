import React from 'react'
import { Container, ContainerProps } from '@chakra-ui/react'

export interface WideContainerProps extends ContainerProps {}

export const WideContainer: React.FC<WideContainerProps> = ({ ...props }) => {
  return (
    <Container
      mx={[0, null, -16]}
      p={0}
      w="100vw"
      maxW={['100%', null, '3xl']}
      {...props}
    />
  )
}
