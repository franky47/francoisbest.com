'use client'

import Link from 'next/link'
import { useState } from 'react'

type HoverPrefetchLinkProps = Omit<
  React.ComponentProps<typeof Link>,
  'prefetch' | 'onMouseEnter'
>

export const HoverPrefetchLink: React.FC<HoverPrefetchLinkProps> = props => {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      prefetch={hovered ? null : false}
      onMouseEnter={() => setHovered(true)}
      {...props}
    />
  )
}
