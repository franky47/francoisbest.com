import { fetchRepository } from 'lib/services/github'
import {
  FiAlertCircle,
  FiFileText,
  FiGitPullRequest,
  FiGithub,
  FiStar,
  FiTag,
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
  const { url, description, stars, issues, prs, version, license } =
    await fetchRepository(slug)
  return (
    <EmbedFrame
      Icon={FiGithub}
      className={twMerge('not-prose space-y-4', className)}
      {...props}
    >
      <h3 className="mt-0 text-xl font-semibold text-gray-900 dark:text-gray-100">
        <a href={url}>{slug}</a>
      </h3>
      <p>{description}</p>
      {children}
      <ul className="flex space-x-6 text-sm text-gray-500">
        {stars > 0 && (
          <MetaListItem Icon={FiStar} text={stars} iconAlt="Stars" />
        )}
        <MetaListItem
          Icon={FiAlertCircle}
          text={issues}
          iconAlt="Open Issues"
        />
        <MetaListItem
          Icon={FiGitPullRequest}
          text={prs}
          iconAlt="Open Pull Requests"
        />
        {Boolean(version) && (
          <MetaListItem
            Icon={FiTag}
            text={`v${version}`}
            iconAlt="Last release"
          />
        )}
        {Boolean(license) && (
          <MetaListItem Icon={FiFileText} text={license} iconAlt="License" />
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
  text = '--',
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
