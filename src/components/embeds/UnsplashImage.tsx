import React from 'react'
import { Box, BoxProps, Image, Text, useColorModeValue } from '@chakra-ui/react'
import { OutgoingLink } from '@47ng/chakra-next'
import { useURL } from 'src/hooks/useURL'

export interface UnsplashImageData {
  id: string
  w: number
  h: number
  alt: string
  src: string
  // srcset: string
  color: string
  blurhash: string
  author: {
    name: string
    username: string
  }
}

export interface UnsplashImageProps
  extends UnsplashImageData,
    Omit<BoxProps, keyof UnsplashImageData> {}

export const UnsplashImage: React.FC<UnsplashImageProps> = ({
  id,
  src,
  alt,
  w,
  h,
  color,
  author,
  ...props
}) => {
  const linkHoverProps = {
    color: useColorModeValue('gray.800', 'gray.300')
  }
  const utm = useUTM()

  return (
    <Box as="figure" {...props}>
      <Image
        src={src}
        alt={alt}
        htmlWidth={w}
        htmlHeight={h}
        rounded="md"
        shadow="md"
        backgroundColor={color}
      />
      <Text
        as="figcaption"
        textAlign="center"
        fontSize="sm"
        mt={2}
        color="gray.600"
      >
        Image by{' '}
        <OutgoingLink
          href={`https://unsplash.com/@${author.username}${utm}`}
          textDecoration="underline"
          _hover={linkHoverProps}
        >
          {author.name}
        </OutgoingLink>{' '}
        on{' '}
        <OutgoingLink
          href={`https://unsplash.com/photos/${id}${utm}`}
          textDecoration="underline"
          _hover={linkHoverProps}
        >
          Unsplash
        </OutgoingLink>
        .
      </Text>
    </Box>
  )
}

// Only add UTM on client-side, after first hydration and if DNT is off
function useUTM() {
  const deploymentDomain = useURL()
    .replace('https://', '')
    .replace('http://', '')

  const [utm, setUTM] = React.useState('')

  React.useEffect(() => {
    if (navigator.doNotTrack === '1') {
      return
    }
    setUTM(`?utm_source=${deploymentDomain}&utm_medium=referral`)
  }, [deploymentDomain])

  return utm
}
