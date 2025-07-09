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
      <main className="prose dark:prose-invert md:prose-lg prose-h1:font-bold prose-img:rounded-sm prose-li:my-1 mx-auto px-2">
        {children}
      </main>
      <Footer />
    </>
  )
}
