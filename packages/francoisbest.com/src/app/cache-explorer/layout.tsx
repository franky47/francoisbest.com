import { NavHeader } from 'ui/layouts/nav-header'

export default function CacheExplorerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavHeader className="max-w-none py-2 md:py-2" />
      {children}
    </>
  )
}
