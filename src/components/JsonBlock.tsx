import React from 'react'
import { BoxProps, Box, useTheme, useColorMode } from '@chakra-ui/core'
import SyntaxHighlighter from 'react-syntax-highlighter'
import createElement from 'react-syntax-highlighter/dist/cjs/create-element'
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

import data from '../../public/.well-known/aboutme.json'

export interface JsonBlockProps extends BoxProps {}

interface Node {
  type: string
  tagName: string
  children?: Node[]
  value?: string
  properties: {
    className: string[]
    [key: string]: any
  }
}

const injectLinks = (node: Node) => {
  if (!node.children) {
    return
  }
  node.children.forEach(injectLinks)
  const linkableChildren = node.children.filter(
    child =>
      child.type === 'text' &&
      (child.value.includes('https://') || child.value.includes('mailto:'))
  )
  for (const linkableChild of linkableChildren) {
    const i = node.children.indexOf(linkableChild)
    const quote: Node = {
      ...linkableChild,
      value: '"'
    }
    const url = linkableChild.value.replace(/"/g, '')
    const a: Node = {
      type: 'element',
      tagName: 'a',
      properties: {
        className: [],
        href: url,
        style: {
          textDecoration: 'underline solid 1px',
          textDecorationSkipInk: 'none'
        }
      },
      children: [
        {
          ...linkableChild,
          value: url
        }
      ]
    }
    const pre = node.children.slice(0, i)
    const post = node.children.slice(i + 1)
    node.children = [...pre, quote, a, quote, ...post]
  }
}

function renderer({ rows, stylesheet, useInlineStyles }) {
  return rows.map((node, i) => {
    injectLinks(node)
    return createElement({
      node,
      stylesheet,
      useInlineStyles,
      key: `code-segment${i}`
    })
  })
}

const JsonBlock: React.FC<JsonBlockProps> = ({ ...props }) => {
  const theme = useTheme()
  const { colorMode } = useColorMode()

  return (
    <Box fontSize="xs" borderRadius={4} {...props} overflow="hidden">
      <SyntaxHighlighter
        language="json"
        style={{
          ...docco,
          hljs: {
            ...docco.hljs,
            padding: '0.75em',
            color: theme.colors.gray[colorMode === 'light' ? 700 : 500],
            background: theme.colors.gray[colorMode === 'light' ? 100 : 900]
          },
          'hljs-number': {
            color: theme.colors.green[colorMode === 'light' ? 600 : 400],
            fontWeight: 500
          },
          'hljs-string': {
            color: theme.colors.blue[colorMode === 'light' ? 600 : 500]
          }
        }}
        renderer={renderer}
      >
        {JSON.stringify(data, null, 2)}
      </SyntaxHighlighter>
    </Box>
  )
}

export default JsonBlock
