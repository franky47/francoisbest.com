import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import * as Typography from '../primitives/Typography'
import { Box, Text, Code, List, ListItem, Divider } from '@chakra-ui/core'
import styled from '@emotion/styled'
import theme from './theme'
import { OutgoingLink } from '../primitives/Links'

const StyledLink = styled(OutgoingLink)`
  & code {
    color: ${theme.colors.blue['600']};
  }
`

const Blockquote = styled(Box)`
  & p:last-child {
    margin-bottom: 0;
  }
`

const components = {
  h1: Typography.H1,
  h2: Typography.H2,
  h3: Typography.H3,
  h4: Typography.H4,
  h5: Typography.H5,
  h6: Typography.H6,
  p: Typography.Paragraph,
  small: (p: any) => <Text as="small" {...p} />,
  b: (p: any) => <Text as="b" {...p} />,
  i: (p: any) => <Text as="i" {...p} />,

  blockquote: (p: any) => (
    <Blockquote
      borderLeftWidth={4}
      borderLeftColor="gray.400"
      pl={4}
      py={4}
      my={8}
      {...p}
    />
  ),
  a: (p: any) => <StyledLink color="blue.600" {...p} />,
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
      fontStyle="italic"
      textAlign="center"
      color="gray.600"
      {...p}
    />
  ),
  inlineCode: (p: any) => (
    <Code
      fontSize="0.9em"
      fontWeight="medium"
      color="gray.700"
      px={1}
      borderRadius={4}
      {...p}
    />
  ),
  pre: (p: any) => (
    <Box
      as="pre"
      fontSize="sm"
      bg="gray.100"
      p={4}
      my={8}
      borderRadius={4}
      {...p}
    />
  ),
  hr: (p: any) => <Divider my={8} {...p} />
}

const Mdx = ({ children }) => {
  return <MDXProvider components={components}>{children}</MDXProvider>
}

export default Mdx
