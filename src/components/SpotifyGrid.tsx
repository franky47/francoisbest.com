import React from 'react'
import Flex, { FlexProps } from '@chakra-ui/core/dist/Flex'
import Image from '@chakra-ui/core/dist/Image'
import albums from 'src/data/albums.json'

function shuffle<T>(a: T[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export interface SpotifyGridProps extends FlexProps {}

export const SpotifyGrid: React.FC<SpotifyGridProps> = ({ ...props }) => {
  const keys = shuffle(Object.keys(albums)) as (keyof typeof albums)[]
  return (
    <Flex flexWrap="wrap" {...props}>
      {keys
        .map(key => albums[key])
        .map(album => (
          <Image
            src={album.cover.src}
            alt={album.name}
            key={album.url}
            w="105px"
            h="105px"
          />
        ))}
    </Flex>
  )
}
