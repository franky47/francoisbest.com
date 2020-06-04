import React from 'react'
import Stack, { StackProps } from '@chakra-ui/core/dist/Stack'
import Box from '@chakra-ui/core/dist/Box'
import Text from '@chakra-ui/core/dist/Text'
import Flex from '@chakra-ui/core/dist/Flex'
import { RouteLink } from '@47ng/chakra-next'
import { H3, Paragraph } from 'src/components/primitives/Typography'
import { ExtendedPostFrontMatter } from 'src/types'
import { Tags } from './Tags'
import { formatDate } from 'src/ui/format'

export interface PostPreviewProps
  extends Omit<StackProps, 'title'>,
    ExtendedPostFrontMatter {
  hash?: string
  linkable?: boolean
}

export const PostPreview: React.FC<PostPreviewProps> = ({
  title,
  publicationDate,
  description,
  path,
  hash,
  tags = [],
  linkable = true,
  children,
  ...props
}) => {
  const pathWithHash = hash ? `${path}#${hash}` : path
  return (
    <Stack as="article" spacing={4} {...props}>
      {children}
      <Box as="header">
        <H3 mb={1}>
          {linkable ? (
            <RouteLink to={pathWithHash}>{title}</RouteLink>
          ) : (
            <>{title}</>
          )}
        </H3>
        <Flex
          alignItems="flex-start"
          flexWrap="wrap"
          flexDirection={['column', 'row']}
        >
          <Text
            fontSize="sm"
            color={publicationDate ? 'gray.600' : 'orange.500'}
          >
            {formatDate(publicationDate, 'DRAFT')}
          </Text>
          <Tags
            tags={tags}
            mt={linkable ? [1, '-3px'] : [1, 0]}
            ml={['0', 2]}
            interactive={linkable}
          />
        </Flex>
      </Box>
      <Paragraph as="div" mb={0}>
        {description}
      </Paragraph>
    </Stack>
  )
}
