import { RouteLink } from '@47ng/chakra-next'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { FiBookmark } from 'react-icons/fi'
import { PostPreview, PostPreviewProps } from './PostPreview'

export interface PostReferenceProps extends PostPreviewProps {}

export const PostReference: React.FC<PostReferenceProps> = ({ ...props }) => {
  const pathWithHash = props.hash
    ? `${props.frontMatter.path}#${props.hash}`
    : props.frontMatter.path
  return (
    <PostPreview
      as={p => (
        <RouteLink
          to={pathWithHash}
          _hover={{
            textDecoration: 'none',
            shadow: 'lg'
          }}
          {...p}
        />
      )}
      linkable={false}
      p={4}
      css={{
        '& h3': {
          marginTop: 0
        }
      }}
      bg={useColorModeValue('white', 'gray.900')}
      borderWidth="1px"
      borderColor={useColorModeValue('gray.400', 'gray.700')}
      rounded="md"
      shadow="md"
      mb={8}
      position="relative"
      {...props}
    >
      <Box
        as={FiBookmark}
        w={6}
        h={6}
        role="img"
        position="absolute"
        color={useColorModeValue('gray.400', 'gray.500')}
        fill={useColorModeValue('white', 'gray.900')}
        right={2}
        top={-6}
      />
    </PostPreview>
  )
}
