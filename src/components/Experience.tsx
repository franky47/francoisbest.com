import React from 'react'
import {
  Badge,
  Box,
  Stack,
  StackProps,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { OutgoingLink } from '@47ng/chakra-next'
import { H3, H4, Paragraph } from './primitives/Typography'
import { Tags } from './blog/Tags'

export interface ExperienceProps extends StackProps {
  title: string
  url: string
  description: React.ElementType
  icon: React.ElementType
  badge?: string
  years?: string
  tags?: string[]
}

export const Experience: React.FC<ExperienceProps> = ({
  title,
  url,
  description,
  icon,
  years,
  badge,
  tags = [],
  ...props
}) => {
  return (
    <Stack spacing={4} mb={12} {...props} as="section">
      <Stack isInline alignItems="center">
        <Box as={icon} w={8} h={8} role="img" aria-label={title} />
        <OutgoingLink href={url} mr="auto">
          <H3 my={0} linkable={false}>
            {title}
          </H3>
        </OutgoingLink>
        {badge && (
          <Badge
            colorScheme="accent"
            bg={useColorModeValue(
              'accent.200',
              'var(--colors-accent-tag-bg-dark)'
            )}
          >
            {badge}
          </Badge>
        )}
        {years && (
          <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.500')}>
            {years}
          </Text>
        )}
      </Stack>
      <Paragraph as="div" my={0}>
        {description}
      </Paragraph>
      <Tags
        tags={tags}
        interactive={false}
        tagProps={{ colorScheme: 'gray' }}
      />
    </Stack>
  )
}

export const Client: React.FC<ExperienceProps> = ({
  title,
  url,
  description,
  icon,
  tags = [],
  ...props
}) => {
  return (
    <Stack ml={4} {...props} spacing={2} mb={8}>
      <Stack isInline alignItems="center">
        {icon && <Box as={icon} w={6} h={6} role="img" aria-label={title} />}
        <OutgoingLink href={url}>
          <H4 my={0} linkable={false}>
            {title}
          </H4>
        </OutgoingLink>
      </Stack>
      <Paragraph as="div" my={0}>
        {description}
      </Paragraph>
      <Tags
        tags={tags}
        interactive={false}
        tagProps={{ colorScheme: 'gray' }}
      />
    </Stack>
  )
}
