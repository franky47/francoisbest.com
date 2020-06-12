import React from 'react'
import Flex, { FlexProps } from '@chakra-ui/core/dist/Flex'
import { RouteLink } from '@47ng/chakra-next'
import { Badge, BadgeProps } from '../Badge'

export interface TagProps extends BadgeProps {
  name: string
  interactive?: boolean
}

export const Tag: React.FC<TagProps> = ({
  name,
  interactive = true,
  ...props
}) => {
  if (!interactive) {
    return <Badge {...props}>{name}</Badge>
  }
  return (
    <RouteLink to={`/posts?tag=${name}`}>
      <Badge {...props}>{name}</Badge>
    </RouteLink>
  )
}

export interface TagsProps extends FlexProps {
  interactive?: boolean
  tags?: string[]
  tagProps?: BadgeProps
}

export const Tags: React.FC<TagsProps> = ({
  tags,
  interactive = true,
  tagProps = {},
  ...props
}) => {
  if (!tags || tags.length === 0) {
    return null
  }
  return (
    <Flex alignItems="center" flexWrap="wrap" m="-2px" {...props}>
      {tags.map(tag => (
        <Tag
          key={tag}
          name={tag}
          interactive={interactive}
          m="2px"
          {...tagProps}
        />
      ))}
    </Flex>
  )
}
