import React from 'react'
import PseudoBox, { PseudoBoxProps } from '@chakra-ui/core/dist/PseudoBox'
import { useStaticData } from 'src/hooks/useStaticData'
import { Image } from '@chakra-ui/core'

export interface UnsplashImageData {
  w: number
  h: number
  alt: string
  src: string
  // srcset: string
  color: string
  blurhash: string
  author: {
    username: string
  }
}

export interface UnsplashImageProps extends PseudoBoxProps {
  id: string
}

export const UnsplashImage: React.FC<UnsplashImageProps> = ({
  id,
  ...props
}) => {
  const { src, alt, w, h, color } = useStaticData<UnsplashImageData>(
    'unsplash',
    id
  )
  return (
    <PseudoBox overflow="hidden" rounded="md" shadow="md" {...props}>
      <Image
        src={src}
        alt={alt}
        htmlWidth={w}
        htmlHeight={h}
        backgroundColor={color}
      />
    </PseudoBox>
  )
}
