import React from 'react'
import { ArticleMeta } from './types'
import { H1 } from '../primitives/Typography'
import {
  Badge,
  Box,
  BoxProps,
  Divider,
  Flex,
  Stack,
  Text
} from '@chakra-ui/core'
import { RouteLink } from '../primitives/Links'

export interface ArticleHeaderProps extends BoxProps {
  meta: ArticleMeta
  readingTime?: string
}

const ArticleHeader: React.SFC<ArticleHeaderProps> = ({
  meta,
  readingTime,
  ...props
}) => {
  return (
    <Box as="header" {...props}>
      <H1>{meta.title}</H1>
      <Flex fontSize="sm" fontWeight="medium" color="gray.600" flexWrap="wrap">
        {meta.publicationDate ? (
          <Text>
            Published on {meta.publicationDate} by{' '}
            <RouteLink to="/">François Best</RouteLink>
          </Text>
        ) : (
          <Stack isInline alignItems="center">
            <Badge variantColor="orange">unpublished draft</Badge>
          </Stack>
        )}
        {readingTime && (
          <>
            <Divider orientation="vertical" />
            <Text>{readingTime}</Text>
          </>
        )}
        {meta.tags?.length > 0 && (
          <>
            <Divider orientation="vertical" />
            <Stack isInline alignItems="center">
              {meta.tags.map(tag => (
                <Badge key={tag} variantColor="blue" textTransform="none">
                  {tag}
                </Badge>
              ))}
            </Stack>
          </>
        )}
      </Flex>
    </Box>
  )
}

export default ArticleHeader
