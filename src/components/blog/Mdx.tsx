import React from 'react'
import styled from '@emotion/styled'
import {
  Text,
  Code,
  Image,
  Kbd,
  List,
  ListItem,
  Divider,
  Box,
  BoxProps,
  Badge,
  BadgeProps,
  useColorModeValue
} from '@chakra-ui/react'
import { OutgoingLink, RouteLink } from '@47ng/chakra-next'
import * as Typography from 'src/components/primitives/Typography'
import { theme } from 'src/ui/theme'
import { useLinkColor } from 'src/ui/theme'
import { Note, NoteProps } from './Note'
import { Annotation } from './Annotation'
import { Tag, TagProps, useTagStyles } from './Tags'
import { PostReference } from './PostReference'
import { RepoReference } from './RepoReference'
import { WideContainer } from '../WideContainer'

const linkStyles = {
  '& code': {
    color: 'currentColor'
  },
  '&:hover code': {
    textDecoration: 'underline'
  }
}

const Blockquote = styled(Box)`
  font-family: 'Georgia';
  & p:last-child {
    margin-bottom: 0;
  }
  & p {
    font-family: 'Georgia';
  }
`

const InlineCode: React.FC<BoxProps> = p => (
  <Code
    fontSize="0.85em"
    fontWeight="medium"
    color={useColorModeValue('gray.700', 'gray.300')}
    px={1}
    rounded="md"
    {...p}
  />
)

export const mdxComponents: any = {
  h1: Typography.H1,
  h2: (p: Typography.HeadingProps) => <Typography.H2 linkable {...p} />,
  h3: (p: Typography.HeadingProps) => <Typography.H3 linkable {...p} />,
  h4: (p: Typography.HeadingProps) => <Typography.H4 linkable {...p} />,
  h5: (p: Typography.HeadingProps) => <Typography.H5 linkable {...p} />,
  h6: (p: Typography.HeadingProps) => <Typography.H6 linkable {...p} />,
  p: Typography.Paragraph,

  small: (p: any) => <Text as="small" {...p} />,
  strong: (p: any) => <Text as="strong" fontWeight="semibold" {...p} />,
  i: (p: any) => <Text as="i" {...p} />,

  blockquote: (p: BoxProps) => (
    <Blockquote
      borderLeftWidth={4}
      borderLeftColor={useColorModeValue('gray.400', 'gray.600')}
      as="blockquote"
      rounded={['none', 'sm']}
      color={useColorModeValue('gray.700', 'gray.400')}
      bg={useColorModeValue('gray.50', 'gray.800')}
      fontStyle="italic"
      mx={[-4, 0]}
      p={6}
      my={8}
      position="relative"
      fontWeight="medium"
      textAlign="center"
      fontSize="2xl"
      {...p}
      _before={{
        content: '"“"',
        position: 'absolute',
        color: useColorModeValue('gray.400', 'gray.600'),
        fontSize: '4xl',
        top: 0,
        left: 2
      }}
      _after={{
        content: '"”"',
        position: 'absolute',
        color: useColorModeValue('gray.400', 'gray.600'),
        fontSize: '4xl',
        bottom: -4,
        right: 3
      }}
    />
  ),
  author: ({ children, ...p }: any) => (
    <Text
      as="div"
      fontFamily={theme.fonts.body}
      fontSize="sm"
      fontWeight="normal"
      fontStyle="normal"
      color="gray.600"
      mt={-2}
      _before={{
        content: '"-- "'
      }}
      {...p}
    >
      -- {children}
    </Text>
  ),

  a: (p: any) => {
    const isInternal =
      p.href.startsWith('#') ||
      (p.href.startsWith('/') && !p.href.startsWith('/images'))
    const color = useLinkColor()
    if (isInternal) {
      return <RouteLink to={p.href} color={color} sx={linkStyles} {...p} />
    }
    return <OutgoingLink color={color} sx={linkStyles} {...p} />
  },

  ul: (p: any) => <List styleType="disc" spacing={1} {...p} />,
  ol: (p: any) => <List as="ol" styleType="decimal" spacing={1} {...p} />,
  li: (p: any) => <ListItem ml={4} {...p} />,

  figure: (p: BoxProps) => <Box my={12} {...p} />,
  figcaption: (p: BoxProps) => (
    <Text
      fontSize="sm"
      textAlign="center"
      color={useColorModeValue('gray.600', 'gray.400')}
      mt={2}
      {...p}
    />
  ),
  inlineCode: InlineCode,
  hr: (p: BoxProps) => (
    <Divider
      my={8}
      borderColor={useColorModeValue('gray.400', 'gray.600')}
      w="100%"
      {...p}
    />
  ),
  kbd: Kbd,
  mark: Annotation,
  del: (p: any) => (
    <Annotation
      as="del"
      type="strike-through"
      color="black"
      strokeWidth={2}
      {...p}
    />
  ),

  // Global scope:
  RouteLink,
  OutgoingLink: (p: any) => <OutgoingLink css={linkStyles} {...p} />,
  PostReference,
  RepoReference,
  WideContainer,
  img: (p: any) => <Image mb={8} rounded="md" {...p} />,
  Image: (p: any) => <Image mb={8} rounded="md" {...p} />,
  Badge: (p: BadgeProps) => <Badge {...useTagStyles()} {...p} />,
  Tag: (p: TagProps) => <Tag {...p} />,
  Note: (p: NoteProps) => (
    <Note mb={8} mx={[-4, 0]} rounded={['none', 'sm']} {...p} />
  )
}
