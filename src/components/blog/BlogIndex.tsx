import { OutgoingLink } from '@47ng/chakra-next'
import {
  Box,
  CloseButton,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { useQueryState } from 'next-usequerystate'
import React from 'react'
import { FiRss, FiSearch, FiTag } from 'react-icons/fi'
import { H1, Paragraph } from 'src/components/primitives/Typography'
import { ExtendedPostFrontMatter } from 'src/types'
import { useAccentStyles } from '../Accent'
import { PostPreview } from './PostPreview'
import { Tag } from './Tags'

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
    let p = posts.filter(post => !!post.publicationDate)
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
            w={4}
            h={4}
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
          pointerEvents="none"
          fontSize="1.2em"
          px={0}
          children={<FiSearch />}
          color={
            search.length > 0
              ? useColorModeValue('gray.600', 'gray.400')
              : useColorModeValue('gray.400', 'gray.600')
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
          bg={useColorModeValue('blue.50', 'gray.800')}
          p={2}
          pl={3}
          spacing={3}
          rounded="md"
          borderWidth="1px"
          borderColor={useColorModeValue('blue.200', 'blue.800')}
          color={useColorModeValue('blue.900', 'blue.300')}
          fontSize="sm"
          css={useAccentStyles('blue')}
        >
          <Box
            as={FiTag}
            role="img"
            aria-label="Info"
            color={useColorModeValue('blue.600', 'blue.400')}
            w={4}
            h={4}
          />
          <Text>Showing posts tagged</Text>
          <Tag name={tag} mt="1px" interactive={false} mr="auto" />
          <CloseButton
            rounded="full"
            aria-label="Clear"
            size="sm"
            onClick={() => setTag(null)}
          />
        </Stack>
      )}
      {filteredPosts.map(post => (
        <PostPreview key={post.url} frontMatter={post} mb={8} />
      ))}
      {filteredPosts.length === 0 && (
        <Paragraph
          textAlign="center"
          my={12}
          fontSize="sm"
          color={useColorModeValue('gray.600', 'gray.500')}
        >
          No posts found.
        </Paragraph>
      )}
    </>
  )
}
