import React from 'react'
import {
  Stack,
  StackProps,
  List,
  ListItem,
  ListIcon,
  Tooltip,
  forwardRef
} from '@chakra-ui/react'
import { H3, Paragraph } from 'src/components/primitives/Typography'
import {
  FiFileText,
  FiTag,
  FiStar,
  FiAlertCircle,
  FiGitPullRequest
} from 'react-icons/fi'
import { OutgoingLink } from '@47ng/chakra-next'

export interface GitHubRepositoryData {
  slug: string
  title?: string
  description?: string
  version?: string
  license?: string
  stars: number
  issues: number
  prs: number
}

export interface GitHubRepositoryProps
  extends StackProps,
    GitHubRepositoryData {
  noMargin?: boolean
  useFullSlug?: boolean
  linkTitle?: boolean
}

export const GitHubRepository: React.FC<GitHubRepositoryProps> = ({
  slug,
  title = slug,
  description,
  version,
  stars = 0,
  issues = 0,
  prs = 0,
  license,
  noMargin = false,
  useFullSlug = false,
  linkTitle = true,
  ...props
}) => {
  const repoUrl = `https://github.com/${slug}`
  return (
    <Stack spacing={4} {...props}>
      <H3 d="flex" alignItems="center" mb={0}>
        {linkTitle ? (
          <OutgoingLink href={repoUrl}>
            {useFullSlug ? slug : title}
          </OutgoingLink>
        ) : (
          <>{useFullSlug ? slug : title}</>
        )}
      </H3>
      <Paragraph as="div" my={0}>
        {description}
      </Paragraph>
      <List
        as={p => <Stack isInline spacing={6} as="ul" {...p} />}
        fontSize="sm"
        mb={noMargin ? 0 : undefined}
      >
        {stars > 0 && (
          <MetaListItem icon={FiStar} text={stars} iconAlt="Stars" />
        )}
        <MetaListItem
          icon={FiAlertCircle}
          text={issues}
          iconAlt="Open Issues"
        />
        <MetaListItem
          icon={FiGitPullRequest}
          text={prs}
          iconAlt="Open Pull Requests"
        />
        {!!version && (
          <MetaListItem
            icon={FiTag}
            text={`v${version}`}
            iconAlt="Last release"
          />
        )}
        {!!license && (
          <MetaListItem icon={FiFileText} text={license} iconAlt="License" />
        )}
      </List>
    </Stack>
  )
}

// --

interface MetaListItemProps {
  icon: React.ComponentType
  iconAlt: string
  text?: string | number
}

const MetaListItem: React.FC<MetaListItemProps> = forwardRef(
  ({ icon, iconAlt, text = '--', ...props }, ref) => {
    return (
      <Tooltip
        label={iconAlt}
        aria-label={iconAlt}
        isOpen={iconAlt === '' ? false : undefined}
        showDelay={750}
        placement="top"
        hasArrow
        ref={ref}
      >
        <ListItem
          {...props}
          display={['flex', 'block']}
          flexDir="column"
          alignItems="center"
          aria-label={iconAlt}
        >
          <ListIcon
            role="img"
            aria-label={iconAlt}
            as={icon}
            display={['block', 'inline-block']}
            verticalAlign="none"
            mr={[0, 2]}
            mt={-1}
            mb={[1, 0]}
          />
          {text}
        </ListItem>
      </Tooltip>
    )
  }
)
