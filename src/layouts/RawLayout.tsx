import React from 'react'
import { ContainerProps } from '@chakra-ui/react'
import { PageFrontMatter } from 'src/types'
import { NextSeo } from 'next-seo'

export interface RawLayoutProps extends ContainerProps {}

export const RawLayout: React.FC<RawLayoutProps> = ({ children }) => {
  return children as any
}

export default function RawLayoutWithSEO({
  children,
  frontMatter: { title, description, url }
}: React.PropsWithChildren<{ frontMatter: PageFrontMatter }>) {
  return (
    <>
      <NextSeo title={title} description={description} canonical={url} />
      <RawLayout>{children}</RawLayout>
    </>
  )
}
