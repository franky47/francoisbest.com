import React from 'react'
import { Container, ContainerProps } from '@chakra-ui/react'
import { NavHeader } from './components/NavHeader'
import { Footer } from './components/Footer'
import { PageFrontMatter } from 'src/types'
import { NextSeo } from 'next-seo'

export interface PageLayoutProps extends ContainerProps {
  showNavHeader?: boolean
  showFooter?: boolean
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  showNavHeader = true,
  showFooter = true,
  children,
  ...props
}) => {
  return (
    <>
      {showNavHeader && (
        <NavHeader mx="auto" maxW="3xl" w="100%" pt={[2, 12]} px={2} />
      )}
      <Container as="main" w="100%" maxW="2xl" px={4} py={8} {...props}>
        {children}
      </Container>
      {showFooter && <Footer />}
    </>
  )
}

export default function PageLayoutWithSEO({
  children,
  frontMatter: {
    title,
    description,
    titleAppendSiteName = true,
    url,
    containerProps = {},
    ...frontMatter
  }
}: React.PropsWithChildren<{ frontMatter: Partial<PageFrontMatter> }>) {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        titleTemplate={titleAppendSiteName ? undefined : '%s'}
        openGraph={{
          title,
          description,
          url,
          images: frontMatter.ogImage ? [frontMatter.ogImage] : undefined
        }}
        canonical={url}
      />
      <PageLayout {...containerProps}>{children}</PageLayout>
    </>
  )
}
