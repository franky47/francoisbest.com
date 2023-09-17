'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type NavLinkProps = LinkProps & {
  children: React.ReactNode
  exactMatch?: boolean
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  exactMatch = true,
  ...props
}) => {
  const pathname = usePathname()
  const isActive = exactMatch
    ? pathname === String(href)
    : pathname.startsWith(String(href))
  return (
    <Link
      href={href}
      className={isActive ? 'flex-shrink-0 underline' : 'flex-shrink-0'}
      {...props}
    />
  )
}
