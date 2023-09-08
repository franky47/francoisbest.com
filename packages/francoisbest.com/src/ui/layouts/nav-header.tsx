import Link from 'next/link'
import React from 'react'
import { BsMastodon } from 'react-icons/bs'
import { IconButton } from 'ui/components/buttons/icon-button'
import { Logo } from 'ui/components/logo'
import { ThemeControls } from 'ui/components/theme-controls'
import { NavLink } from './nav-link'

export const NavHeader: React.FC = () => {
  return (
    <header className="flex items-center gap-1 flew-wrap max-w-3xl px-2 mx-auto pt-2 md:pt-12 pb-8">
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
      <nav aria-label="Settings" className="flex ml-auto space-x-2">
        <a href="https://mamot.fr/@Franky47" rel="me">
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
