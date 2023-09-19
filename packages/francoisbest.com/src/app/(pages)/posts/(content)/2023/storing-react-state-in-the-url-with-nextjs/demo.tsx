import { gitHubUrl, resolve } from 'lib/paths'
import { Suspense } from 'react'
import { PiHandTap } from 'react-icons/pi'
import { Greetings } from './greetings'
import { QuerySpy } from './query-spy'

export const Demo: React.FC = async () => {
  const sourcePath = resolve(import.meta.url, './greetings.tsx')
  const sourceCodeUrl = gitHubUrl(sourcePath)
  return (
    <figure className="max-w-xl mx-auto border border-dashed border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 relative mb-12">
      <figcaption className="absolute -top-6 md:-top-6 right-3 bg-bgLight dark:bg-bgDark px-1 italic !text-sm text-gray-500">
        <PiHandTap className="inline-block mr-0.5 -mt-1" /> Interactive demo
      </figcaption>
      <Suspense
        fallback={
          <div
            className="text-sm text-gray-500 flex justify-center items-center h-56 sm:h-60"
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
