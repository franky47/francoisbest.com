import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { H3 } from 'src/components/primitives/Typography'
import { PRCategory } from '../components/PRGroup'

export interface PRViewProps extends BoxProps {}

export const PRView: React.FC<PRViewProps> = ({ ...props }) => {
  return (
    <Box {...props}>
      <H3>Security Fixes</H3>
      <PRCategory category="security" />
      <H3>Dependency Updates</H3>
      <PRCategory category="dependency" />
      <H3>Other Bots</H3>
      <PRCategory category="bot" />
      <H3>User PRs</H3>
      <PRCategory category="user" />
    </Box>
  )
}
