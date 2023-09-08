import Link from 'next/link'
import React from 'react'
import { BsMastodon } from 'react-icons/bs'
import { FaKeybase } from 'react-icons/fa'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { IconButton, IconButtonProps } from 'ui/components/buttons/icon-button'

export const Footer: React.FC = () => {
  const gitSha1 = process.env.VERCEL_GIT_COMMIT_SHA ?? 'local'
  const iconButtonProps: Omit<IconButtonProps, 'icon' | 'aria-label'> = {
    variant: 'ghost',
    className: 'rounded-full',
  }

  return (
    <footer className="my-8">
      <nav className="flex flex-row gap-2 p-2 justify-center">
        <a href="https://mamot.fr/@Franky47" rel="me">
          <IconButton
            icon={<BsMastodon />}
            aria-label="Mastodon"
            {...iconButtonProps}
          />
        </a>
        <a href="https://keybase.io/franky47">
          <IconButton
            icon={<FaKeybase />}
            aria-label="Keybase"
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
      <p className="text-xs text-center text-gray-500 leading-5">
        © 2019, François Best •{' '}
        <a
          href={`https://github.com/franky47/francoisbest.com/tree/${gitSha1}`}
          className="font-mono"
        >
          {gitSha1.slice(0, 8)}
        </a>{' '}
        • <Link href="/sitemap">Site map</Link>
        <br />
        End-to-end encrypted analytics by{' '}
        <a href="https://chiffre.io" className="font-semibold">
          Chiffre.io
        </a>
      </p>
    </footer>
  )
}
