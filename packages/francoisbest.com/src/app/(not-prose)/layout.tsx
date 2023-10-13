import { Footer } from 'ui/layouts/footer'
import { NavHeader } from 'ui/layouts/nav-header'

export default function PageLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavHeader />
      <main className="mx-auto max-w-2xl px-2">{children}</main>
      <Footer />
    </>
  )
}
