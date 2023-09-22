import { fetchRepository } from 'lib/services/github'
import { fetchNpmPackage } from 'lib/services/npm'
import React from 'react'
import {
  FiDownload,
  FiFileText,
  FiPackage,
  FiStar,
  FiTag,
} from 'react-icons/fi'

import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { SvgCurveGraph } from 'ui/components/graphs/svg-curve-graph'
import { Logo } from 'ui/components/logo'
import { formatStatNumber } from 'ui/format'
import { EmbedFrame, EmbedFrameProps } from './embed-frame'

export type NpmPackageProps = Omit<EmbedFrameProps, 'Icon' | 'children'> & {
  pkg: string
  repo: string
  accent?: string
  children?: React.ReactNode
}

export const NpmPackage: React.FC<NpmPackageProps> = async ({
  pkg,
  repo,
  accent = 'text-blue-500',
  className = 'my-8',
  children,
  ...props
}) => {
  try {
    const [npm, github] = await Promise.all([
      fetchNpmPackage(pkg),
      fetchRepository(repo),
    ])
    return (
      <EmbedFrame
        Icon={FiPackage}
        className={twMerge('relative px-0', className)}
        {...props}
      >
        <span aria-hidden className="hidden">
          Updated at: {npm.updatedAt.toISOString()}
        </span>
        <figure className="not-prose !my-0">
          <div className="px-4">
            <header
              className="flex justify-between flex-wrap gap-2 mb-2"
              style={{ alignItems: 'last baseline' }}
            >
              <a href={github.url}>
                <h3 className="flex items-center text-xl font-semibold text-gray-900 dark:text-gray-100 mt-0">
                  <Image
                    width={24}
                    height={24}
                    src={github.avatarUrl}
                    alt={`Avatar for GitHub account ${repo.split('/')[0]}`}
                    className="rounded-full mr-2"
                  />
                  {repo}
                </h3>
              </a>
              <div className="flex gap-6 text-sm text-gray-500">
                <dl className="flex items-center gap-1" title="Stars">
                  <FiStar />
                  <dd>{formatStatNumber(github.stars)}</dd>
                </dl>
                <dl
                  className="flex items-center gap-1"
                  title="NPM downloads (all time)"
                >
                  <FiDownload />
                  <dd>{formatStatNumber(npm.allTime)}</dd>
                </dl>
                {github.version && (
                  <dl
                    className="flex items-center gap-1"
                    title="Latest version"
                  >
                    <FiTag />
                    <span>{github.version}</span>
                  </dl>
                )}
                {github.license && (
                  <dl className="flex items-center gap-1" title="License">
                    <FiFileText />
                    <dd>{github.license.split(' ')[0]}</dd>
                  </dl>
                )}
              </div>
            </header>
            <p className="my-4">{github.description}</p>
            {children}
            <pre className="text-sm bg-gray-50/50 dark:bg-gray-950 border dark:border-gray-800 dark:shadow-inner rounded !p-2 my-4">
              <details className="text-gray-500">
                <summary>
                  <span className="text-red-500/75 select-none">$ </span>pnpm
                  add{' '}
                  <a href={npm.url} className={accent}>
                    {npm.packageName}
                  </a>
                </summary>
                <div>
                  <span className="text-red-500/75 select-none ml-1"> $ </span>
                  yarn add {npm.packageName}
                </div>
                <div>
                  <span className="text-red-500/75 select-none ml-1"> $ </span>
                  npm install {npm.packageName}
                </div>
              </details>
            </pre>
          </div>
          <SvgCurveGraph
            data={npm.last30Days ?? []}
            className={accent}
            height={120}
            lastDate={npm.lastDate}
          />
          <footer
            role="presentation"
            className="absolute flex items-center gap-2 left-3 bottom-3 h-6 text-sm"
          >
            <Logo size={6} background={false} />
            <span className="font-semibold text-md">47ng</span>
            <span className="text-gray-500/80">•</span>
            <a href="https://francoisbest.com/open-source" className={accent}>
              francoisbest.com
              <span className="text-gray-500/80">/open-source</span>
            </a>
          </footer>
        </figure>
      </EmbedFrame>
    )
  } catch (error) {
    return (
      <EmbedFrame Icon={FiPackage} className={className} isError {...props}>
        <div className="not-prose">
          <p className="font-medium">Error displaying package</p>
          <code className="text-sm text-red-500">{String(error)}</code>
        </div>
      </EmbedFrame>
    )
  }
}
