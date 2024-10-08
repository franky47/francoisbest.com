import { chiffreConfig } from 'lib/services/chiffre'
import Link from 'next/link'
import React from 'react'
import { BsDiscord, BsMastodon } from 'react-icons/bs'
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from 'react-icons/fi'
import { IconButton, IconButtonProps } from 'ui/components/buttons/icon-button'

export const Footer: React.FC = () => {
  const gitSha1 = process.env.VERCEL_GIT_COMMIT_SHA ?? 'local'
  const iconButtonProps: Omit<IconButtonProps, 'icon' | 'aria-label'> = {
    variant: 'ghost',
    className: 'rounded-full'
  }

  return (
    <footer className="my-8">
      <nav className="flex flex-row justify-center gap-2 p-2">
        <a href="https://mamot.fr/@Franky47" rel="me">
          <IconButton
            icon={<BsMastodon />}
            aria-label="Mastodon"
            {...iconButtonProps}
          />
        </a>
        {/* <a href="https://keybase.io/franky47">
          <IconButton
          icon={<FaKeybase />}
          aria-label="Keybase"
            {...iconButtonProps}
          />
        </a> */}
        <a href="https://discord.com/users/francois.best#7881">
          <IconButton
            icon={<BsDiscord />}
            aria-label="Discord"
            {...iconButtonProps}
          />
        </a>
        <a href="https://twitter.com/fortysevenfx" rel="me">
          <IconButton
            icon={<FiTwitter />}
            aria-label="Twitter/X"
            {...iconButtonProps}
          />
        </a>
        <a href="https://github.com/franky47">
          <IconButton
            icon={<FiGithub />}
            aria-label="GitHub"
            {...iconButtonProps}
          />
        </a>
        <a href="https://www.linkedin.com/in/francoisbest">
          <IconButton
            icon={<FiLinkedin />}
            aria-label="LinkedIn"
            {...iconButtonProps}
          />
        </a>
        <a href="mailto:hi@francoisbest.com">
          <IconButton
            icon={<FiMail />}
            aria-label="Email"
            {...iconButtonProps}
          />
        </a>
      </nav>
      <p className="text-center text-xs leading-5 text-gray-500">
        © 2019, François Best •{' '}
        <a
          href={`https://github.com/franky47/francoisbest.com/tree/${gitSha1}`}
          className="font-mono"
        >
          {gitSha1.slice(0, 8)}
        </a>{' '}
        • <Link href="/sitemap">Site map</Link>
        {chiffreConfig.enabled && (
          <>
            <br />
            End-to-end encrypted analytics by{' '}
            <a href="https://chiffre.io" className="font-semibold">
              Chiffre.io
            </a>
          </>
        )}
      </p>
    </footer>
  )
}
