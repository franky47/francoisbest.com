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
        <a href="https://discord.com/users/francois.best#7881">
          <IconButton
            icon={<BsDiscord />}
            aria-label="Discord"
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
