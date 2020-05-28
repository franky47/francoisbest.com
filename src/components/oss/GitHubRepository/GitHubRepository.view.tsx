import React from 'react'
import Stack, { StackProps } from '@chakra-ui/core/dist/Stack'
import { H3, Paragraph } from 'src/components/primitives/Typography'
import Box from '@chakra-ui/core/dist/Box'
import {
  FiPackage,
  FiFileText,
  FiStar,
  FiActivity,
  FiGithub,
  // FiBox,
  // FiFeather,
  // FiCode,
  // FiDownload,
  FiInfo
} from 'react-icons/fi'
import List, { ListItem, ListIcon } from '@chakra-ui/core/dist/List'
import Tooltip from '@chakra-ui/core/dist/Tooltip'
import Skeleton from '@chakra-ui/core/dist/Skeleton'
import { OutgoingLink } from '@47ng/chakra-next'
import { GitHubMeta } from './types'

export interface GitHubRepositoryProps extends StackProps {
  name: string
  showSize?: boolean
}

export interface GitHubRepositoryViewProps extends GitHubRepositoryProps {
  meta?: GitHubMeta
}

export const GitHubRepositoryView: React.FC<GitHubRepositoryViewProps> = ({
  name,
  meta,
  showSize = false,
  ...props
}) => {
  const repoUrl = `https://github.com/${name}`
  return (
    <Stack spacing={4} mb={8} {...props}>
      <H3 d="flex" alignItems="center">
        <Box
          as={FiGithub}
          mr={[2, null, 4]}
          size={[5, null, 6]}
          display="inline-block"
          ml={[0, null, -10]}
          color="gray.500"
        />
        <OutgoingLink href={repoUrl}>{name}</OutgoingLink>
      </H3>
      <Skeleton isLoaded h={!!meta ? undefined : '4em'}>
        <Paragraph>{meta?.description}</Paragraph>
        <List
          as={p => <Stack isInline spacing={6} as="ul" {...p} />}
          fontSize="sm"
        >
          <MetaListItem icon={FiStar} text={meta?.stars} iconAlt="Stars" />
          <MetaListItem
            icon={FiPackage}
            text="@47ng/cloak"
            iconAlt="NPM package"
            tooltip="NPM package"
          />
          <MetaListItem
            icon={FiInfo}
            text={meta?.version}
            iconAlt="Last release"
            tooltip="Last release"
          />
          <MetaListItem
            icon={FiFileText}
            text={meta?.license}
            iconAlt="License"
            tooltip="License"
          />
          <MetaListItem
            icon={FiActivity}
            text={meta?.lastCommit}
            iconAlt="Last commit"
            tooltip="Last commit"
          />
        </List>
      </Skeleton>
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
