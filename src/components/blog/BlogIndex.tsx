import React from 'react'
import { useQueryState } from 'next-usequerystate'
import Stack from '@chakra-ui/core/dist/Stack'
import Flex from '@chakra-ui/core/dist/Flex'
import Text from '@chakra-ui/core/dist/Text'
import Input from '@chakra-ui/core/dist/Input'
import InputGroup from '@chakra-ui/core/dist/InputGroup'
import {
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/core/dist/InputElement'
import Box from '@chakra-ui/core/dist/Box'
import CloseButton from '@chakra-ui/core/dist/CloseButton'
import { OutgoingLink } from '@47ng/chakra-next'
import { PostPreview } from './PostPreview'
import { Tag } from './Tags'
import { FiRss, FiTag, FiSearch } from 'react-icons/fi'
import { useColor } from 'src/ui/colors'
import { ExtendedPostFrontMatter } from 'src/types'
import { H1, Paragraph } from 'src/components/primitives/Typography'

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
  const [search, setSearch] = React.useState('')
  const filteredPosts = React.useMemo(() => {
    let p = posts
    if (tag) {
      p = p.filter(post => post.tags?.includes(tag))
    }
    if (search.length > 0) {
      p = p.filter(
        post =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.description.toLowerCase().includes(search.toLowerCase())
      )
    }
    return p.sort(byDateMostRecentFirst)
  }, [posts, tag, search])
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
      <InputGroup mb={2}>
        <InputLeftElement
          children={<Box as={FiSearch} />}
          color={
            search.length > 0
              ? useColor('gray.600', 'gray.400')
              : useColor('gray.400', 'gray.600')
          }
        />
        <Input
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          placeholder="Search articles"
        />
        {search.length > 1 && (
          <InputRightElement
            children={
              <CloseButton
                rounded="full"
                size="sm"
                onClick={() => setSearch('')}
              />
            }
          />
        )}
      </InputGroup>
      {tag && (
        <Stack
          isInline
          alignItems="center"
          bg={useColor('blue.50', 'gray.800')}
          p={2}
          pl={3}
          spacing={3}
          rounded="md"
          borderWidth="1px"
          borderColor={useColor('blue.200', 'blue.800')}
          color={useColor('blue.900', 'blue.300')}
          fontSize="sm"
        >
          <Box
            as={FiTag}
            role="img"
            aria-label="Info"
            color={useColor('blue.600', 'blue.400')}
            size={4}
          />
          <Text>Showing posts tagged</Text>
          <Tag name={tag} mt="1px" interactive={false} />
          <CloseButton
            ml="auto"
            rounded="full"
            aria-label="Clear"
            size="sm"
            onClick={() => setTag(null)}
          />
        </Stack>
      )}
      {filteredPosts.map(post => (
        <PostPreview key={post.url} {...post} mb={8} />
      ))}
      {filteredPosts.length === 0 && (
        <Paragraph
          textAlign="center"
          my={12}
          fontSize="sm"
          color={useColor('gray.600', 'gray.500')}
        >
          No posts found.
        </Paragraph>
      )}
    </>
  )
}
