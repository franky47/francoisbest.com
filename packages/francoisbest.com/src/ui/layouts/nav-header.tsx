import Link from 'next/link'
import React from 'react'
import { BsMastodon } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'
import { IconButton } from 'ui/components/buttons/icon-button'
import { Logo } from 'ui/components/logo'
import { ThemeControls } from 'ui/components/theme-controls'
import { NavLink } from './nav-link'

export const NavHeader: React.FC<React.ComponentProps<'header'>> = ({
  className,
  ...props
}) => {
  return (
    <header
      className={twMerge(
        'mx-auto flex max-w-3xl flex-wrap items-center gap-1 px-2 pb-8 pt-2 md:pt-12',
        className
      )}
      {...props}
    >
      <nav className="flex items-center gap-6" aria-label="Navigation">
        <Link href="/" className="rounded-full">
          <Logo aria-label="François Best" />
        </Link>
        <NavLink href="/">About</NavLink>
        <NavLink href="/open-source">Open Source</NavLink>
        <NavLink href="/posts" exactMatch={false}>
          Blog
        </NavLink>
      </nav>
      <nav aria-label="Settings" className="ml-auto flex space-x-2">
        <a href="https://mamot.fr/@Franky47" rel="me" tabIndex={-1}>
          <IconButton
            icon={<BsMastodon />}
            aria-label="Mastodon"
            variant="ghost"
            className="rounded-full"
          />
        </a>
        <ThemeControls />
      </nav>
    </header>
  )
}
