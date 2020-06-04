import React from 'react'
import NextHead from 'next/head'
import PseudoBox, { PseudoBoxProps } from '@chakra-ui/core/dist/PseudoBox'
import { useColorMode } from '@chakra-ui/core'
import Image from '@chakra-ui/core/dist/Image'
import { OutgoingLink } from '@47ng/chakra-next'

export interface ExcalidrawProps extends PseudoBoxProps {
  url: string
  name: string
  alt?: string
}

export const Excalidraw: React.FC<ExcalidrawProps> = ({
  url,
  name,
  alt,
  ...props
}) => {
  const { colorMode } = useColorMode()
  const imgUrl = `/img/excalidraw/${name}-${colorMode}.svg`
  return (
    <PseudoBox {...props}>
      <NextHead>
        <link
          key="excalidraw-preconnect"
          rel="preconnect"
          href="https://excalidraw.com"
          crossOrigin=""
        />
      </NextHead>
      <OutgoingLink href={url}>
        <Image src={imgUrl} alt={alt} />
      </OutgoingLink>
    </PseudoBox>
  )
}
