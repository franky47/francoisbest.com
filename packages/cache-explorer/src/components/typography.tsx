import React from 'react'
import { font, spacing } from '../theme'

export const H2: React.FC<React.ComponentProps<'h2'>> = ({
  style,
  ...props
}) => (
  <h2
    style={{
      marginBlock: spacing[4],
      fontSize: font.xl,
      fontWeight: font.bold,
      ...style,
    }}
    {...props}
  />
)
