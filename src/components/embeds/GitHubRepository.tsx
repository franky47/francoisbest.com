import React from 'react'
import {
  Stack,
  StackProps,
  List,
  ListItem,
  ListIcon,
  Tooltip
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
    <Stack spacing={4} {...props} mb={noMargin ? -8 : undefined}>
      <H3 d="flex" alignItems="center" mt={noMargin ? 0 : undefined}>
        {linkTitle ? (
          <OutgoingLink href={repoUrl}>
            {useFullSlug ? slug : title}
          </OutgoingLink>
        ) : (
          <>{useFullSlug ? slug : title}</>
        )}
      </H3>
      <Paragraph as="div">{description}</Paragraph>
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
        {/* {!!npm && (
          <OutgoingLink href={`https://npmjs.com/package/${npm}`}>
            <MetaListItem
              icon={FiPackage}
              text={npm}
              iconAlt="NPM package"
              tooltip="NPM package"
            />
          </OutgoingLink>
        )} */}
        {!!version && (
          <MetaListItem
            icon={FiTag}
            text={`v${version}`}
            iconAlt="Last release"
            tooltip="Last release"
          />
        )}
        {!!license && (
          <MetaListItem
            icon={FiFileText}
            text={license}
            iconAlt="License"
            tooltip="License"
          />
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
  tooltip?: string
}

const MetaListItem: React.FC<MetaListItemProps> = ({
  icon,
  iconAlt,
  text = '--',
  tooltip = '',
  ...props
}) => {
  return (
    <Tooltip
      label={tooltip}
      aria-label={tooltip}
      isOpen={tooltip === '' ? false : undefined}
      showDelay={750}
      placement="top"
      hasArrow
    >
      <ListItem
        {...props}
        display={['flex', 'block']}
        flexDir="column"
        alignItems="center"
        aria-label={tooltip}
      >
        <ListIcon
          role="img"
          aria-label={iconAlt}
          icon={icon}
          display={['block', 'inline-block']}
          mr={[0, 2]}
          mt={-1}
          mb={[1, 0]}
        />
        {text}
      </ListItem>
    </Tooltip>
  )
}
