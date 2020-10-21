import React from 'react'
import styled from '@emotion/styled'
import Stack, { StackProps } from '@chakra-ui/core/dist/Stack'
import Avatar from '@chakra-ui/core/dist/Avatar'
import Text from '@chakra-ui/core/dist/Text'
import Image from '@chakra-ui/core/dist/Image'
import Box, { BoxProps } from '@chakra-ui/core/dist/Box'
import Flex, { FlexProps } from '@chakra-ui/core/dist/Flex'
import Grid, { GridProps } from '@chakra-ui/core/dist/Grid'
import { OutgoingLink } from '@47ng/chakra-next'
import { FiHeart, FiRepeat, FiTwitter } from 'react-icons/fi'
import { H5 } from 'src/components/primitives/Typography'
import { OutgoingIconButtonLink } from 'src/components/primitives/OutgoingIconButtonLink'
import { formatDate, formatTime } from 'src/ui/format'
import { useColor } from 'src/ui/colors'

export interface TweetPhotoData {
  type: 'photo'
  src: string
  url: string
  alt?: string
}

export interface TweetVideoData {
  type: 'video'
  src: string
  url: string
  alt?: string
  sources: { url: string; type: string }[]
}

export interface TweetData {
  author: {
    avatarURL: string
    displayName: string
    handle: string
  }
  largeText: boolean
  body: string
  quotedTweet?: TweetData
  media: (TweetPhotoData | TweetVideoData)[]
  meta: {
    url: string
    date: number
    likes: number
    retweets: number
  }
}

// --

export interface TweetProps extends StackProps {
  id: string
}

export const Tweet: React.FC<TweetProps> = ({ id, ...props }) => {
  const {
    author,
    meta,
    body,
    media,
    largeText,
    quotedTweet
  } = require(`src/data/.storage/twitter/${id}`) as TweetData

  const baseProps = {
    mx: 'auto',
    rounded: 'lg',
    borderWidth: 1,
    borderColor: useColor('gray.300', 'gray.700'),
    p: 4
  }

  return (
    <Stack mb={8} maxW="600px" {...baseProps} {...props}>
      <TweetHeader author={author} url={meta.url} />
      <TweetBody body={body} largeText={largeText} />
      {media.length > 0 && <TweetMedia media={media} />}
      {!!quotedTweet && (
        <Stack {...baseProps} maxW="100%" my={4}>
          <CompactTweetHeader
            author={quotedTweet.author}
            meta={quotedTweet.meta}
          />
          <TweetBody
            my={0}
            body={quotedTweet.body}
            largeText={false}
            wordBreak="break-word"
          />
        </Stack>
      )}
      <TweetFooter {...meta} />
    </Stack>
  )
}

// --

const AuthorName = styled(H5)`
  a:hover & {
    text-decoration: underline;
  }
`

interface TweetHeaderProps extends FlexProps {
  author: TweetData['author']
  url: string
}

const TweetHeader: React.FC<TweetHeaderProps> = ({ author, url, ...props }) => (
  <Flex as="header" justifyContent="space-between" {...props}>
    <OutgoingLink
      href={`https://twitter.com/${author.handle}`}
      _hover={{
        textDecoration: 'none'
      }}
    >
      <Stack as="header" isInline alignItems="center">
        <Avatar
          name={author.displayName}
          src={author.avatarURL}
          backgroundColor="transparent"
        />
        <Stack>
          <AuthorName my={0}>{author.displayName}</AuthorName>
          <Text fontSize="sm" color="gray.600">
            @{author.handle}
          </Text>
        </Stack>
      </Stack>
    </OutgoingLink>
    <OutgoingIconButtonLink
      href={url}
      aria-label="Open on Twitter"
      icon={FiTwitter}
      color="gray.600"
      rounded="full"
      variant="ghost"
      mr={-2}
      mt={-2}
    />
  </Flex>
)

// --

interface CompactTweetHeaderProps extends StackProps {
  author: TweetData['author']
  meta: TweetData['meta']
}

const CompactTweetHeader: React.FC<CompactTweetHeaderProps> = ({
  author,
  meta,
  ...props
}) => (
  <Stack as="header" isInline {...props}>
    <OutgoingLink
      href={`https://twitter.com/${author.handle}`}
      _hover={{
        textDecoration: 'none'
      }}
    >
      <Stack as="header" isInline alignItems="center">
        <Avatar
          size="2xs"
          name={author.displayName}
          src={author.avatarURL}
          backgroundColor="transparent"
        />
        <AuthorName as="h6" my={0}>
          {author.displayName}
        </AuthorName>
        <Text fontSize="sm" color="gray.600">
          @{author.handle}
        </Text>
      </Stack>
    </OutgoingLink>
    <Text fontSize="sm" color="gray.600">
      •
    </Text>
    <OutgoingLink href={meta.url} fontSize="sm" color="gray.600">
      {formatDate(meta.date)}
    </OutgoingLink>
    <Box ml="auto">
      <OutgoingIconButtonLink
        href={meta.url}
        aria-label="Open on Twitter"
        icon={FiTwitter}
        color="gray.600"
        rounded="full"
        variant="ghost"
        mt={-2}
        mr={-2}
      />
    </Box>
  </Stack>
)

// --

type TweetContentProps = Pick<TweetData, 'body' | 'largeText'> & BoxProps

const StyledBody = styled(Box)`
  img.emoji {
    display: inline-block;
    height: 1.1em;
    width: 1.1em;
    margin: 0 0 0 0.1em;
    vertical-align: -0.1em;
  }
`

const TweetBody: React.FC<TweetContentProps> = ({
  body,
  largeText,
  ...props
}) => (
  <StyledBody
    my={4}
    fontSize={largeText ? 'lg' : 'md'}
    fontWeight={450}
    dangerouslySetInnerHTML={{ __html: body }}
    {...props}
  />
)

// --

const TweetFooter: React.FC<TweetData['meta'] & FlexProps> = ({
  url,
  date,
  likes,
  retweets,
  ...props
}) => (
  <Flex
    as="footer"
    justifyContent="space-between"
    mt={2}
    color="gray.600"
    {...props}
  >
    <OutgoingLink href={url} fontSize="sm">
      {formatTime(date)} • {formatDate(date)}
    </OutgoingLink>
    <Stack isInline justifyContent="space-evenly" fontSize="sm">
      <Flex alignItems="center">
        <Box as={FiRepeat} mr={2} />
        <Text>{retweets}</Text>
      </Flex>
      <Flex alignItems="center">
        <Box as={FiHeart} mr={2} />
        <Text>{likes}</Text>
      </Flex>
    </Stack>
  </Flex>
)

// --

interface TweetMediaProps extends GridProps {
  media: TweetData['media']
}

const TweetMedia: React.FC<TweetMediaProps> = ({ media, ...props }) => (
  <Grid
    templateColumns={media.length === 1 ? '1fr' : '1fr 1fr'}
    templateRows={media.length > 2 ? '1fr 1fr' : '1fr'}
    rounded="md"
    overflow="hidden"
    gridGap={1}
    maxH="350px"
    my={4}
    {...props}
  >
    {media.map((img, i) =>
      img.type === 'video' ? (
        <video
          key={img.url}
          autoPlay={false}
          controls
          poster={img.src}
          style={{ margin: '0 auto' }}
        >
          {img.sources.map(src => (
            <source src={src.url} type={src.type} />
          ))}
        </video>
      ) : (
        <Image
          src={img.src}
          alt={img.alt}
          key={img.url}
          maxH="568px"
          w="100%"
          h="100%"
          objectFit="cover"
          objectPosition="center"
          gridRow={i === 0 && media.length === 3 ? '1/3' : undefined}
        />
      )
    )}
  </Grid>
)
