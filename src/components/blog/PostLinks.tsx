import React from 'react'
import { OutgoingLink } from '@47ng/chakra-next'
import { Paragraph } from '../primitives/Typography'
import { PostMetadata } from 'src/types'
import { BoxProps } from '@chakra-ui/core/dist/Box'

export interface PostLinksProps extends Omit<BoxProps, 'title'>, PostMetadata {}

export const PostLinks: React.SFC<PostLinksProps> = ({
  path,
  url,
  ...props
}) => {
  const editUrl = `
  https://github.com/franky47/francoisbest.com/edit/develop/src/pages${path}.mdx`
  const twitterUrl = `https://twitter.com/search?q=${encodeURIComponent(url)}`

  return (
    <Paragraph fontSize="sm" color="gray.600" {...props}>
      <OutgoingLink href={editUrl}>Edit this page on GitHub</OutgoingLink>
      {' • '}
      <OutgoingLink href={twitterUrl}>Discuss on Twitter</OutgoingLink>
    </Paragraph>
  )
}
