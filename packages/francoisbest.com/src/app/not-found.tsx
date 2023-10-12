import Link from 'next/link'
import PageLayout from './(not-prose)/layout'

export default function NotFound() {
  return (
    <PageLayout>
      <section className="my-24 text-center md:my-32">
        <p
          role="presentation"
          aria-hidden
          className="select-none text-8xl font-bold text-gray-200 dark:text-gray-800"
        >
          404
        </p>
        <h2 className="my-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Page not found
        </h2>
        <p className="text-sm text-gray-500">Sorry, there's nothing here.</p>
        <Link
          href="/"
          className="mt-8 inline-block text-sm font-medium underline"
        >
          Return Home
        </Link>
      </section>
    </PageLayout>
  )
}
