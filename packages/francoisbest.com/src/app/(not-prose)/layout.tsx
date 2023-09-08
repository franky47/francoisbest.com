import { Footer } from 'ui/layouts/footer'
import { NavHeader } from 'ui/layouts/nav-header'

export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavHeader />
      <main className="max-w-2xl mx-auto px-2">{children}</main>
      <Footer />
    </>
  )
}
