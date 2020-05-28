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
    ExtendedPostFrontMatter {}

export const PostPreview: React.FC<PostPreviewProps> = ({
  title,
  publicationDate,
  description,
  path,
  tags = [],
  ...props
}) => {
  return (
    <Stack as="article" spacing={4} {...props}>
      <Box as="header">
        <H3 mb={1}>
          <RouteLink to={path}>{title}</RouteLink>
        </H3>
        <Flex alignItems="center">
          <Text
            fontSize="sm"
            color={publicationDate ? 'gray.600' : 'orange.500'}
          >
            {formatDate(publicationDate, 'DRAFT')}
          </Text>
          <Tags tags={tags} mt="-3px" ml={2} />
        </Flex>
      </Box>
      <Paragraph>{description}</Paragraph>
    </Stack>
  )
}
