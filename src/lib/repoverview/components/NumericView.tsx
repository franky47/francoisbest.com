import React from 'react'
import { Text, useColorModeValue } from '@chakra-ui/react'
import { scaleThreshold } from '@visx/scale'

export interface NumericViewProps {
  value?: number
  thresholds?: number[]
}

export const NumericView: React.FC<NumericViewProps> = ({
  value,
  thresholds = [1, 5, 10],
  children
}) => {
  const colors = [
    useColorModeValue('gray.300', 'gray.800'),
    useColorModeValue('gray.700', 'gray.400'),
    useColorModeValue('orange.500', 'orange.300'),
    useColorModeValue('red.500', 'red.400')
  ]
  const { colorScale, weightScale } = React.useMemo(() => {
    return {
      colorScale: scaleThreshold({
        domain: thresholds,
        range: colors
      }),
      weightScale: scaleThreshold({
        domain: thresholds,
        range: ['normal', 'normal', 'medium', 'bold']
      })
    }
  }, [thresholds, colors])

  return (
    <Text
      as="span"
      color={value !== undefined ? colorScale(value) : 'gray.500'}
      fontWeight={value !== undefined ? weightScale(value) : 'normal'}
    >
      {value ?? '--'}
      {children}
    </Text>
  )
}
