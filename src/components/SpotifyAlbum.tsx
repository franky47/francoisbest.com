import React from 'react'
import PseudoBox, { PseudoBoxProps } from '@chakra-ui/core/dist/PseudoBox'
import Image from '@chakra-ui/core/dist/Image'
import { OutgoingLink } from '@47ng/chakra-next'
import { useColor } from 'src/ui/colors'
import Head from 'next/head'
import { Box } from '@chakra-ui/core'
import { FiPlay } from 'react-icons/fi'
import styled from '@emotion/styled'

export interface SpotifyAlbumData {
  name: string
  url: string
  artist: {
    name: string
    url: string
  }
  cover: {
    src: string
    // srcset: string
    // sizes: Array<{
    //   src: string
    //   size: number
    // }>
  }
}

export interface SpotifyAlbumProps extends PseudoBoxProps, SpotifyAlbumData {
  uri: string
  by?: string
}

const Overlay = styled(PseudoBox)`
  opacity: 0;
  transition: opacity 0.1s ease-out;
  .album-cover:hover &,
  a:focus > .album-cover & {
    opacity: 1;
  }
  & .svg {
    stroke-width: 0;
    fill: white;
  }

  @media (prefers-reduced-motion) {
    .album-cover:hover &,
    a:focus > .album-cover & {
      opacity: 0;
    }
  }
`

const AlbumCover = styled(PseudoBox)`
  &:hover img {
    filter: blur(3px);
  }
  transition: all 0.1s ease-out;
  & img {
    transition: filter 0.1s ease-out;
  }
  @media (prefers-reduced-motion) {
    &:hover img {
      filter: none;
    }
    transition: none;
    & img {
      transition: none;
    }
  }
`

export const SpotifyAlbum: React.FC<SpotifyAlbumProps> = ({
  uri,
  name,
  artist,
  cover,
  url,
  by = artist.name,
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
        <OutgoingLink href={url} bg="red.100">
          <AlbumCover
            className="album-cover"
            rounded="md"
            shadow="md"
            h="250px"
            w="250px"
            mx="auto"
            overflow="hidden"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="black"
            fontSize="xs"
            _hover={{
              shadow: 'lg'
            }}
            position="relative"
          >
            <Image
              src={cover.src}
              fallbackSrc="/images/album-cover-placeholder.jpg"
              alt={`${name}, an album by ${by}`}
            />
            <Overlay
              bg="rgba(0,0,0,0.3)"
              position="absolute"
              left={0}
              right={0}
              top={0}
              bottom={0}
              zIndex={1}
              d="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box as={FiPlay} color="white" size="20%" className="svg" />
            </Overlay>
          </AlbumCover>
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
          <OutgoingLink href={artist.url}>{by}</OutgoingLink>
        </PseudoBox>
      </PseudoBox>
    </>
  )
}
