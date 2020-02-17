import React from 'react'
import { Badge, FlexProps, Flex } from '@chakra-ui/core'
import { RouteLink } from '../primitives/Links'

export const Tag = ({ name, ...props }) => {
  return (
    <RouteLink to={`/posts?tag=${name}`}>
      <Badge variantColor="blue" textTransform="none" {...props}>
        {name}
      </Badge>
    </RouteLink>
  )
}

export interface TagsProps extends FlexProps {
  tags: string[]
}

const Tags: React.FC<TagsProps> = ({ tags, ...props }) => {
  if (tags.length === 0) {
    return null
  }
  return (
    <Flex alignItems="center" flexWrap="wrap" gridGap={1} {...props}>
      {tags.map(tag => (
        <Tag key={tag} name={tag} />
      ))}
    </Flex>
  )
}

export default Tags
