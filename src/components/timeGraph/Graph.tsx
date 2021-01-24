import React from 'react'
import { Svg, SvgProps } from '@47ng/chakra-next'

// --

export interface GraphProps extends SvgProps {
  w: number
  h?: number
}

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
      {children}
    </Svg>
  )
}
