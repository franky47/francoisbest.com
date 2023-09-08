import { fetchRepository } from 'lib/services/github'
import { fetchNpmPackage } from 'lib/services/npm'
import React from 'react'
import {
  FiDownload,
  FiFileText,
  FiGithub,
  FiPackage,
  FiStar,
  FiTag,
} from 'react-icons/fi'

import { twMerge } from 'tailwind-merge'
import { SvgCurveGraph } from 'ui/components/graphs/svg-curve-graph'
import { Logo } from 'ui/components/logo'
import { formatStatNumber } from 'ui/format'
import { EmbedFrame, EmbedFrameProps } from './embed-frame'

export type NpmPackageProps = Omit<EmbedFrameProps, 'Icon' | 'children'> & {
  pkg: string
  repo: string
  accent?: string
}

export const NpmPackage: React.FC<NpmPackageProps> = async ({
  pkg,
  repo,
  accent = 'text-blue-500',
  className = 'my-8',
  ...props
}) => {
  try {
    const npm = await fetchNpmPackage(pkg)
    const github = await fetchRepository(repo)
    return (
      <EmbedFrame
        Icon={FiPackage}
        className={twMerge('relative px-0', className)}
        {...props}
      >
        <figure className="not-prose !my-0">
          <div className="px-4">
            <header className="flex justify-between items-baseline flex-wrap gap-2 mb-2">
              <a href={github.url}>
                <h3 className="flex items-center text-xl font-semibold text-gray-900 dark:text-gray-100 mt-0">
                  <FiGithub className="inline-block mr-2 text-gray-500 flex-shrink-0" />
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
            <pre className="text-sm bg-gray-50/50 dark:bg-gray-950 border dark:border-gray-800 dark:shadow-inner rounded !p-2 my-4">
              <span className="text-red-500/75">$</span>
              <span className="text-gray-500"> pnpm add </span>
              <a href={npm.url} className={accent}>
                {npm.packageName}
              </a>
            </pre>
          </div>
          <SvgCurveGraph
            data={npm.last30Days ?? []}
            className={accent}
            height={100}
          />
          <footer
            role="presentation"
            className="absolute flex items-center gap-2 left-3 right-3 bottom-2 h-8 text-sm"
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
          {/* <p className="text-sm mt-2 underline">
            <a href={url}>Open on Mastodon</a>
          </p> */}
        </div>
      </EmbedFrame>
    )
  }
}
