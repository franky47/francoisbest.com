import React from 'react'
import { Container, ContainerProps } from '@47ng/chakra-next'

export interface WideContainerProps extends ContainerProps {}

export const WideContainer: React.FC<WideContainerProps> = ({ ...props }) => {
  return (
    <Container
      mx={[0, null, -16]}
      p={0}
      maxW={['100%', null, '100vw']}
      {...props}
    />
  )
}
