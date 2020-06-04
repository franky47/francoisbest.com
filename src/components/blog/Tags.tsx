import React from 'react'
import Flex, { FlexProps } from '@chakra-ui/core/dist/Flex'
import Badge, { BadgeProps } from '@chakra-ui/core/dist/Badge'
import { RouteLink } from '@47ng/chakra-next'

export interface TagProps extends BadgeProps {
  name: string
  interactive?: boolean
}

export const Tag: React.FC<TagProps> = ({
  name,
  interactive = true,
  ...props
}) => {
  const p = {
    variant: 'subtle',
    variantColor: 'accent',
    textTransform: 'none',
    fontWeight: 'medium',
    ...props
  } as const
  if (!interactive) {
    return <Badge {...p}>{name}</Badge>
  }
  return (
    <RouteLink to={`/posts?tag=${name}`}>
      <Badge {...p}>{name}</Badge>
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
