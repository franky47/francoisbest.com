import Link from 'next/link'
import PageLayout from './(not-prose)/layout'

export default function NotFound() {
  return (
    <PageLayout>
      <section className="my-24 md:my-32 text-center">
        <p
          role="presentation"
          aria-hidden
          className="text-8xl text-gray-200 dark:text-gray-800 font-bold select-none"
        >
          404
        </p>
        <h2 className="my-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Page not found
        </h2>
        <p className="text-sm text-gray-500">Sorry, there's nothing here.</p>
        <Link
          href="/"
          className="inline-block mt-8 underline font-medium text-sm"
        >
          Return Home
        </Link>
      </section>
    </PageLayout>
  )
}
