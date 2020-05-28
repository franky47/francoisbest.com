import React from 'react'
import styled from '@emotion/styled'
import Box from '@chakra-ui/core/dist/Box'
import Text from '@chakra-ui/core/dist/Text'
import Code from '@chakra-ui/core/dist/Code'
import Kbd from '@chakra-ui/core/dist/Kbd'
import List, { ListItem } from '@chakra-ui/core/dist/List'
import Divider from '@chakra-ui/core/dist/Divider'
import { OutgoingLink, RouteLink } from '@47ng/chakra-next'
import * as Typography from 'src/components/primitives/Typography'
import { theme } from 'src/ui/theme'
import { useColor, useLinkColor } from 'src/ui/colors'

const StyledLink = styled(OutgoingLink)`
  & code {
    color: ${p =>
      // @ts-ignore
      theme.colors.accent[p.color.split('.')[1]]};
  }
  &:hover code {
    text-decoration: underline;
  }
`

const Blockquote = styled(Box)`
  & p:last-child {
    margin-bottom: 0;
  }
`

export const mdxComponents = {
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

  blockquote: (p: any) => (
    <Blockquote
      borderLeftWidth={4}
      borderLeftColor={useColor('gray.400', 'gray.600')}
      pl={4}
      py={4}
      my={8}
      {...p}
    />
  ),
  a: (p: any) => {
    const isInternal = p.href.startsWith('#') || p.href.startsWith('/')
    const color = useLinkColor()
    if (isInternal) {
      return <RouteLink to={p.href} color={color} {...p} />
    }
    return <StyledLink color={color} {...p} />
  },

  ul: (p: any) => (
    <Typography.Paragraph as="div">
      <List styleType="disc" {...p} />
    </Typography.Paragraph>
  ),
  ol: (p: any) => (
    <Typography.Paragraph as="div">
      <List as="ol" styleType="decimal" {...p} />
    </Typography.Paragraph>
  ),
  li: ListItem,

  figure: (p: any) => <Box my={12} {...p} />,
  figcaption: (p: any) => (
    <Text
      fontSize="sm"
      textAlign="center"
      color={useColor('gray.600', 'gray.400')}
      mt={2}
      {...p}
    />
  ),
  inlineCode: (p: any) => (
    <Code
      fontSize="0.85em"
      fontWeight="medium"
      color={useColor('gray.700', 'gray.300')}
      px={1}
      borderRadius={4}
      {...p}
    />
  ),
  // pre: (p: any) => (
  //   <Box
  //     as="pre"
  //     fontSize="sm"
  //     bg={useColor('gray.100', '#0f141c')}
  //     p={4}
  //     my={8}
  //     borderRadius={4}
  //     overflowX="auto"
  //     {...p}
  //   />
  // ),
  hr: (p: any) => (
    <Divider
      my={8}
      borderColor={useColor('gray.400', 'gray.600')}
      w="100%"
      {...p}
    />
  ),
  kbd: Kbd
}
