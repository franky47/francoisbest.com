import { fetchRepository } from 'lib/services/github'
import {
  FiAlertCircle,
  FiFileText,
  FiGitPullRequest,
  FiGithub,
  FiStar,
  FiTag
} from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'
import { EmbedFrame } from './embed-frame'

type GitHubRepoProps = React.ComponentProps<'section'> & {
  slug: string
}

export const GitHubRepo: React.FC<GitHubRepoProps> = async ({
  slug,
  className = 'my-8',
  children,
  ...props
}) => {
  const github = await fetchRepository(slug).catch(error => {
    console.group('Failed to fetch GitHub repository data')
    console.error(`repo: ${slug}`)
    console.dir(error)
    console.groupEnd()
    return null
  })
  if (!github) {
    return (
      <EmbedFrame
        Icon={FiGithub}
        className={twMerge('not-prose space-y-4', className)}
        {...props}
      >
        <h3 className="mt-0 text-xl font-semibold text-gray-900 dark:text-gray-100">
          <a href={`https://github.com/${slug}`}>{slug}</a>
        </h3>
        <p className="text-sm text-red-700 dark:text-red-400">
          GitHub data is currently unavailable.
        </p>
      </EmbedFrame>
    )
  }
  return (
    <EmbedFrame
      Icon={FiGithub}
      className={twMerge('not-prose space-y-4', className)}
      {...props}
    >
      <h3 className="mt-0 text-xl font-semibold text-gray-900 dark:text-gray-100">
        <a href={github.url}>{slug}</a>
      </h3>
      <p>{github.description}</p>
      {children}
      <ul className="flex space-x-6 text-sm text-gray-500">
        {github.stars > 0 && (
          <MetaListItem Icon={FiStar} text={github.stars} iconAlt="Stars" />
        )}
        <MetaListItem
          Icon={FiAlertCircle}
          text={github.issues}
          iconAlt="Open Issues"
        />
        <MetaListItem
          Icon={FiGitPullRequest}
          text={github.prs}
          iconAlt="Open Pull Requests"
        />
        {Boolean(github.version) && (
          <MetaListItem
            Icon={FiTag}
            text={`v${github.version}`}
            iconAlt="Last release"
          />
        )}
        {Boolean(github.license) && (
          <MetaListItem Icon={FiFileText} text={github.license} iconAlt="License" />
        )}
      </ul>
    </EmbedFrame>
  )
}

// --

type MetaListItemProps = {
  Icon: React.ComponentType
  iconAlt: string
  text?: string | number
}

const MetaListItem: React.FC<MetaListItemProps> = ({
  Icon,
  iconAlt,
  text = '--'
}) => {
  return (
    <li className="flex items-center gap-x-2" title={iconAlt}>
      <Icon
        // @ts-ignore
        role="img"
        aria-hidden
      />
      {text}
    </li>
  )
}
