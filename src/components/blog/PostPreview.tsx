import { RouteLink } from '@47ng/chakra-next'
import { Box, Flex, Stack, StackProps, Text } from '@chakra-ui/react'
import React from 'react'
import { H3, Paragraph } from 'src/components/primitives/Typography'
import { usePageViews } from 'src/hooks/usePageViews'
import { ExtendedPostFrontMatter } from 'src/types'
import { formatDate, formatNumber } from 'src/ui/format'
import { Tags } from './Tags'

export interface PostPreviewProps extends Omit<StackProps, 'title'> {
  hash?: string
  linkable?: boolean
  frontMatter: ExtendedPostFrontMatter
}

export const PostPreview: React.FC<PostPreviewProps> = ({
  hash,
  linkable = true,
  frontMatter: { title, publicationDate, description, path, tags = [] },
  children,
  ...props
}) => {
  const views = usePageViews(path)
  const pathWithHash = hash ? `${path}#${hash}` : path
  return (
    <Stack as="article" spacing={4} {...props}>
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
            {views && views > 0 && (
              <>
                &nbsp;•&nbsp;
                {formatNumber(views)} views
              </>
            )}
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
      {children}
    </Stack>
  )
}
