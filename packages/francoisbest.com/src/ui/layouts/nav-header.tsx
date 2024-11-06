import Link from 'next/link'
import React from 'react'
import { BsMastodon } from 'react-icons/bs'
import { FiTwitter } from 'react-icons/fi'
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
      <nav aria-label="Social" className="ml-auto flex gap-1">
        <a href="https://mamot.fr/@Franky47" rel="me" tabIndex={-1}>
          <IconButton
            icon={<BsMastodon />}
            aria-label="Mastodon"
            variant="ghost"
            className="rounded-full"
          />
        </a>
        <a href="https://bsky.app/profile/francoisbest.com">
          <IconButton
            icon={
              <svg
                role="presentation"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="size-4"
              >
                <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" />
              </svg>
            }
            aria-label="BlueSky"
            variant="ghost"
            className="rounded-full"
          />
        </a>
        {/* <a href="https://twitter.com/fortysevenfx" rel="me" tabIndex={-1}>
          <IconButton
            icon={<FiTwitter />}
            aria-label="Twitter/X"
            variant="ghost"
            className="rounded-full"
          />
        </a> */}
      </nav>
      <ThemeControls />
    </header>
  )
}
