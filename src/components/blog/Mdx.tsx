import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import * as Typography from '../primitives/Typography'
import { Box, Text, Code, List, ListItem, Divider } from '@chakra-ui/core'
import styled from '@emotion/styled'
import theme from './theme'
import baseTheme from '../../ui/theme'
import { OutgoingLink } from '../primitives/Links'
import { useColor, useLinkColor } from '../../ui/colors'

const StyledLink = styled(OutgoingLink)`
  & code {
    color: ${p => theme.colors[p.color.split('.')[0]][p.color.split('.')[1]]};
  }
`

const Blockquote = styled(Box)`
  & p:last-child {
    margin-bottom: 0;
  }
`

export const mdxComponents = {
  h1: Typography.H1,
  h2: Typography.H2,
  h3: Typography.H3,
  h4: Typography.H4,
  h5: Typography.H5,
  h6: Typography.H6,
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
  a: (p: any) => (
    <StyledLink
      color={useLinkColor()}
      isExternal={!p.href.startsWith('#')}
      {...p}
    />
  ),
  ul: (p: any) => (
    <Typography.Paragraph>
      <List styleType="disc" {...p} />
    </Typography.Paragraph>
  ),
  ol: (p: any) => (
    <Typography.Paragraph>
      <List as="ol" styleType="decimal" {...p} />
    </Typography.Paragraph>
  ),
  li: ListItem,

  figure: (p: any) => <Box my={12} {...p} />,
  figcaption: (p: any) => (
    <Text
      fontSize="sm"
      textAlign="center"
      fontFamily={baseTheme.fonts.body}
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
  pre: (p: any) => (
    <Box
      as="pre"
      fontSize="sm"
      bg={useColor('gray.100', 'gray.900')}
      p={4}
      my={8}
      borderRadius={4}
      overflowX="auto"
      {...p}
    />
  ),
  hr: (p: any) => (
    <Divider my={8} borderColor={useColor('gray.400', 'gray.600')} {...p} />
  )
}

const Mdx = ({ children }) => {
  return <MDXProvider components={mdxComponents}>{children}</MDXProvider>
}

export default Mdx
