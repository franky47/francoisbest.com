import { gitHubUrl, resolve } from 'lib/paths'
import { Suspense } from 'react'
import { PiHandTap } from 'react-icons/pi'
import { Greetings } from './greetings'
import { QuerySpy } from './query-spy'

export const Demo: React.FC = async () => {
  const sourcePath = resolve(import.meta.url, './greetings.tsx')
  const sourceCodeUrl = gitHubUrl(sourcePath)
  return (
    <figure className="relative mx-auto mb-12 max-w-xl rounded-lg border border-dashed border-gray-300 px-4 py-2 dark:border-gray-700">
      <figcaption className="bg-bgLight dark:bg-bgDark absolute -top-6 right-3 px-1 !text-sm italic text-gray-500 md:-top-6">
        <PiHandTap className="-mt-1 mr-0.5 inline-block" /> Interactive demo
      </figcaption>
      <Suspense
        fallback={
          <div
            className="flex h-56 items-center justify-center text-sm text-gray-500 sm:h-60"
            aria-hidden
          >
            Loading...
          </div>
        }
      >
        <Greetings />
        <QuerySpy />
      </Suspense>
      <a href={sourceCodeUrl} className="text-sm">
        Source code
      </a>
    </figure>
  )
}
