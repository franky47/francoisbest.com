import { RouteLink } from '@47ng/chakra-next'
import { Badge, Box, BoxProps, Flex, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { H1 } from 'src/components/primitives/Typography'
import { PostMetadata } from 'src/types'
import { formatDate, formatNumber } from 'src/ui/format'
import { Tags } from './Tags'

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
                {formatNumber(views)} views
              </>
            )}
          </Text>
        ) : (
          <Stack isInline alignItems="center">
            <Badge colorScheme="orange">unpublished draft</Badge>
          </Stack>
        )}
        <Tags tags={tags} ml={[0, 'auto']} />
      </Flex>
    </Box>
  )
}
