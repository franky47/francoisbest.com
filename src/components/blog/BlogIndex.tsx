import React from 'react'
import { useQueryState } from 'next-usequerystate'
import Stack from '@chakra-ui/core/dist/Stack'
import Flex from '@chakra-ui/core/dist/Flex'
import Text from '@chakra-ui/core/dist/Text'
import Box from '@chakra-ui/core/dist/Box'
import CloseButton from '@chakra-ui/core/dist/CloseButton'
import { OutgoingLink } from '@47ng/chakra-next'
import { ExtendedPostFrontMatter } from 'src/types'
import { H1, Paragraph } from 'src/components/primitives/Typography'
import { PostPreview } from './PostPreview'
import { Tag } from './Tags'
import { FiRss, FiInfo } from 'react-icons/fi'
import { useColor } from 'src/ui/colors'

// --

type Posts = ExtendedPostFrontMatter[]

export interface BlogIndexProps {
  posts: Posts
}

// --

const byDateMostRecentFirst = (
  a: ExtendedPostFrontMatter,
  b: ExtendedPostFrontMatter
) => ((a.publicationDate || '9999') < (b.publicationDate || '9999') ? 1 : -1)

// --

export const BlogIndex: React.FC<BlogIndexProps> = ({ posts }) => {
  const [tag, setTag] = useQueryState('tag')
  const filteredPosts = React.useMemo(() => {
    if (!tag) {
      return posts.sort(byDateMostRecentFirst)
    }
    return posts
      .filter(post => post.tags?.includes(tag))
      .sort(byDateMostRecentFirst)
  }, [posts, tag])
  return (
    <>
      <Flex alignItems="baseline">
        <H1>Articles</H1>
        <Stack
          isInline
          alignItems="center"
          fontSize="xs"
          ml="auto"
          color="gray.600"
        >
          <Box
            as={FiRss}
            size={4}
            color="orange.500"
            role="img"
            aria-label="RSS/Atom feeds"
          />
          <OutgoingLink href="/posts/feed/rss.xml">RSS</OutgoingLink>
          <OutgoingLink href="/posts/feed/atom.xml">Atom</OutgoingLink>
          <OutgoingLink href="/posts/feed/articles.json">JSON</OutgoingLink>
        </Stack>
      </Flex>
      <Paragraph>
        I write about TypeScript, Node.js, React, security and privacy.
      </Paragraph>
      {tag && (
        <Stack
          isInline
          alignItems="center"
          bg={useColor('blue.50', 'gray.800')}
          py={3}
          px={4}
          borderRadius={4}
          borderWidth="1px"
          borderColor={useColor('blue.200', 'blue.800')}
          color={useColor('blue.900', 'blue.300')}
          fontSize="sm"
        >
          <Box
            as={FiInfo}
            role="img"
            aria-label="Info"
            color={useColor('blue.600', 'blue.400')}
            size={5}
          />
          <Text>Showing posts tagged</Text>
          <Tag name={tag} mt="1px" interactive={false} />
          <CloseButton
            ml="auto"
            rounded={100}
            aria-label="Clear"
            size="sm"
            onClick={() => setTag(null)}
          />
        </Stack>
      )}
      {filteredPosts.map(post => (
        <PostPreview key={post.url} {...post} mb={8} />
      ))}
    </>
  )
}
