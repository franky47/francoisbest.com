import React from 'react'
import { RouteLink } from '@47ng/chakra-next'
import Box, { BoxProps } from '@chakra-ui/core/dist/Box'
import Badge from '@chakra-ui/core/dist/Badge'
import Flex from '@chakra-ui/core/dist/Flex'
import Text from '@chakra-ui/core/dist/Text'
import Stack from '@chakra-ui/core/dist/Stack'
import { H1 } from 'src/components/primitives/Typography'
import { PostMetadata } from 'src/types'
import { Tags } from './Tags'
import { formatDate, formatPageViews } from 'src/ui/format'

export interface PostHeaderProps extends Omit<BoxProps, 'title'>, PostMetadata {
  views?: number
}

export const PostHeader: React.FC<PostHeaderProps> = ({
  title,
  publicationDate,
  readingTime,
  views = 0,
  tags = [],
  ...props
}) => {
  return (
    <Box as="header" {...props}>
      <H1 mb={4}>{title}</H1>
      <Flex
        fontSize="sm"
        color="gray.600"
        flexWrap="wrap"
        flexDirection={['column', 'row']}
      >
        {publicationDate ? (
          <Text flexShrink={0}>
            <RouteLink to="/">François Best</RouteLink>
            &nbsp;•&nbsp;
            {formatDate(publicationDate)}
            &nbsp;•&nbsp;
            {readingTime.text}
            {views > 0 && (
              <>
                &nbsp;•&nbsp;
                {formatPageViews(views)} views
              </>
            )}
          </Text>
        ) : (
          <Stack isInline alignItems="center">
            <Badge variantColor="orange">unpublished draft</Badge>
          </Stack>
        )}
        <Tags tags={tags} ml={[0, 'auto']} />
      </Flex>
    </Box>
  )
}
