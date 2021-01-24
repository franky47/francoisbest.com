import React from 'react'
import { LinearGradient } from '@visx/gradient'
import { useToken } from '@chakra-ui/react'
import { Svg, SvgProps } from '@47ng/chakra-next'

// --

export interface GraphProps extends SvgProps {
  w: number
  h?: number
}

const useColor = (token: string) => useToken('colors', token)

export const Graph: React.FC<GraphProps> = ({
  w,
  h = w * 0.4,
  children,
  ...props
}) => {
  return (
    <Svg
      // don't specify the dimensions for responsive
      viewBox={`0 0 ${w} ${h}`}
      maxW="100%"
      // role="graphics-object"
      {...props}
    >
      {/* <LinearGradient
        from={useColor('gray.900')}
        to={useColor('accent.900')}
        id="bg-gradient"
      />
      <rect width={w} height={h} fill="url(#bg-gradient)" /> */}
      {children}
    </Svg>
  )
}
