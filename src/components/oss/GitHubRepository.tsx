import React from 'react'
import Stack, { StackProps } from '@chakra-ui/core/dist/Stack'
import { H3, Paragraph } from 'src/components/primitives/Typography'
import Box from '@chakra-ui/core/dist/Box'
import { FiPackage, FiFileText, FiGithub, FiTag, FiStar } from 'react-icons/fi'
import List, { ListItem, ListIcon } from '@chakra-ui/core/dist/List'
import Tooltip from '@chakra-ui/core/dist/Tooltip'
import { OutgoingLink } from '@47ng/chakra-next'

export interface GitHubRepositoryProps extends StackProps {
  slug: string
  title?: string
  description: string
  version?: string
  license?: string
  stars?: number
  npm?: string
}

export const GitHubRepository: React.FC<GitHubRepositoryProps> = ({
  slug,
  title = slug,
  description,
  version,
  stars,
  license = 'MIT',
  npm,
  ...props
}) => {
  const repoUrl = `https://github.com/${slug}`
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
        <OutgoingLink href={repoUrl}>{title}</OutgoingLink>
      </H3>
      <Paragraph as="div">{description}</Paragraph>
      <List
        as={p => <Stack isInline spacing={6} as="ul" {...p} />}
        fontSize="sm"
      >
        {!!stars && <MetaListItem icon={FiStar} text={stars} iconAlt="Stars" />}
        {!!npm && (
          <OutgoingLink href={`https://npmjs.com/package/${npm}`}>
            <MetaListItem
              icon={FiPackage}
              text={npm}
              iconAlt="NPM package"
              tooltip="NPM package"
            />
          </OutgoingLink>
        )}
        {!!version && (
          <MetaListItem
            icon={FiTag}
            text={version}
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
