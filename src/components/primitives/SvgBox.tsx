import React, { SVGAttributes } from 'react'
import { PseudoBox, PseudoBoxProps } from '@chakra-ui/core'

export type SvgBoxProps = PseudoBoxProps &
  Pick<SVGAttributes<HTMLOrSVGElement>, 'xmlns' | 'viewBox'>

const SvgBox: React.FC<SvgBoxProps> = ({ children, ...props }) => (
  <PseudoBox as="svg" xmlns="http://www.w3.org/2000/svg" {...props}>
    {children}
  </PseudoBox>
)

export default SvgBox
