import { PostPreview, PostPreviewProps } from './PostPreview'
import { useColor } from 'src/ui/colors'
import { Box } from '@chakra-ui/react'
import { FiBookmark } from 'react-icons/fi'
import { RouteLink } from '@47ng/chakra-next'

export interface PostReferenceProps extends PostPreviewProps {}

export const PostReference: React.FC<PostReferenceProps> = ({ ...props }) => {
  const pathWithHash = props.hash ? `${props.path}#${props.hash}` : props.path
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
      bg={useColor('white', 'gray.800')}
      borderWidth="1px"
      borderColor={useColor('gray.400', 'gray.700')}
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
        color={useColor('gray.400', 'gray.500')}
        fill={useColor('white', 'gray.900')}
        right={2}
        top={-8}
      />
    </PostPreview>
  )
}
