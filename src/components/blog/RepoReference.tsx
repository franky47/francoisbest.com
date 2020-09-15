import {
  GitHubRepository,
  GitHubRepositoryProps
} from 'src/components/oss/GitHubRepository'
import { FiGithub } from 'react-icons/fi'
import { ReferenceCardProps, ReferenceCard } from './ReferenceCard'

export interface RepoReferenceProps
  extends GitHubRepositoryProps,
    Omit<ReferenceCardProps, 'title'> {}

export const RepoReference: React.FC<RepoReferenceProps> = ({ ...props }) => {
  const url = `https://github.com/${props.slug}`
  return (
    <ReferenceCard href={url} icon={FiGithub} iconProps={{ top: -10 }}>
      <GitHubRepository {...props} />
    </ReferenceCard>
  )
}
