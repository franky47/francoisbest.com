import React from 'react'
import PostLayout from './PostLayout'
import PageLayout from './PageLayout'
import RawLayout from './RawLayout'
import { ExtendedMDXFrontMatter } from 'src/types'

const layouts = {
  PostLayout,
  PageLayout,
  RawLayout
}

function useLayoutComponent({ layout, path }: ExtendedMDXFrontMatter) {
  if (layout && layout in layouts) {
    return layouts[layout as keyof typeof layouts]
  }
  if (path.startsWith('/posts/')) {
    return PostLayout
  }
  return PageLayout
}

export function AutomaticLayout({
  children,
  frontMatter,
  ...props
}: React.PropsWithChildren<{ frontMatter: any }>) {
  const Layout = useLayoutComponent(frontMatter)
  return (
    <Layout frontMatter={frontMatter} {...props}>
      {children}
    </Layout>
  )
}

export default AutomaticLayout
