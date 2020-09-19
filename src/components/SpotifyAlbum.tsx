import React from 'react'
import PseudoBox, { PseudoBoxProps } from '@chakra-ui/core/dist/PseudoBox'
import Image from '@chakra-ui/core/dist/Image'
import { OutgoingLink } from '@47ng/chakra-next'
import { useColor } from 'src/ui/colors'
import Head from 'next/head'

export interface SpotifyAlbumData {
  name: string
  url: string
  artist: {
    name: string
    url: string
  }
  cover: {
    src: string
    srcset: string
    sizes: Array<{
      src: string
      size: number
    }>
  }
}

export interface SpotifyAlbumProps extends PseudoBoxProps, SpotifyAlbumData {}

export const SpotifyAlbum: React.FC<SpotifyAlbumProps> = ({
  url,
  cover,
  artist,
  name,
  ...props
}) => {
  return (
    <>
      <Head>
        <link
          key="spotify-preconnect"
          rel="preconnect"
          href="https://i.scdn.co"
        />
        <link
          key="spotify-prefetch"
          rel="dns-prefetch"
          href="https://i.scdn.co"
        />
      </Head>
      <PseudoBox as="figure" {...props}>
        <OutgoingLink href={url}>
          <PseudoBox
            rounded="md"
            shadow="md"
            maxW="250px"
            maxH="250px"
            mx="auto"
            overflow="hidden"
            transition="transform 0.1s ease-out"
            _hover={{
              transform: 'scale(1.05)'
            }}
          >
            <Image src={cover.src} alt={`${name} - ${artist.name}`} />
          </PseudoBox>
        </OutgoingLink>
        <PseudoBox
          as="figcaption"
          textAlign="center"
          color={useColor('gray.600', 'gray.500')}
          fontSize="sm"
          mt={2}
        >
          <OutgoingLink href={url}>{name}</OutgoingLink>
          {' - '}
          <OutgoingLink href={artist.url}>{artist.name}</OutgoingLink>
        </PseudoBox>
      </PseudoBox>
    </>
  )
}
