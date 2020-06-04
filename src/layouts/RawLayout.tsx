import React from 'react'
import { ContainerProps } from '@47ng/chakra-next'
import { PageFrontMatter } from 'src/types'
import { NextSeo } from 'next-seo'

export interface RawLayoutProps extends ContainerProps {}

export const RawLayout: React.FC<RawLayoutProps> = ({ children }) => {
  return children as any
}

export default function createRawLayout({
  title,
  description,
  url
}: PageFrontMatter) {
  return ({ children }: any) => {
    return (
      <>
        <NextSeo title={title} description={description} canonical={url} />
        <RawLayout>{children}</RawLayout>
      </>
    )
  }
}
