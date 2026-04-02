import { fetchAllNpmPackages, type NpmPackageStatsData } from 'lib/services/npm'
import { Metadata } from 'next'
import { HireMe } from 'ui/components/hire-me'
import { BlogPostEmbed } from 'ui/embeds/blog-post-embed'
import { GitHubRepo } from 'ui/embeds/github-repo'
import { NpmPackage } from 'ui/embeds/npm-package'

export const metadata: Metadata = {
  title: 'Open-Source',
  description:
    'Some of the OSS packages and projects I published and contribute to.',
}

export const revalidate = 86400

const npmPackages = [
  'nuqs',
  'fastify-micro',
  'fastify-cron',
  'session-keystore',
  '@47ng/cloak',
  'redact-env',
  'env-alias',
  '@47ng/check-env',
  '@47ng/codec',
] as const

export default async function OpenSourcePage() {
  const npmData = await fetchAllNpmPackages([...npmPackages]).catch((error) => {
    console.error('Failed to batch-fetch NPM data:', error)
    return {} as Record<string, NpmPackageStatsData>
  })
  return (
    <>
      <h1>Open Source</h1>
      <p>
        This page lists some of the open source packages and repositories I have
        published or contribute to.
      </p>
      <p>
        Most of them are published under my company{' '}
        <a href="https://github.com/47ng">47ng</a>.
      </p>

      <h2>Frontend</h2>
      <p>
        My tech stack of choice for server-rendered React apps is{' '}
        <a href="https://nextjs.org/">Next.js</a> and{' '}
        <a href="https://tailwindcss.com/">TailwindCSS</a>.
      </p>
      <p>
        For client-heavy apps, I like to use{' '}
        <a href="https://chakra-ui.com/">Chakra-UI</a> to quickly build
        beautiful and accessible interfaces.
      </p>
      <p>
        Because of its CSS-in-JS approach, it's a bit awkward to use with the
        new Next.js app router and server components, so I'm now letting
        Tailwind deal with styling. ChatGPT makes a perfect companion for
        refactoring one into the other anyway.
      </p>

      <NpmPackage
        pkg="nuqs"
        repo="47ng/nuqs"
        accent="text-indigo-500 dark:text-indigo-400"
        versionRollout={6}
        npmData={npmData['nuqs'] ?? null}
      />

      <h2>Backend</h2>
      <p>
        I like to use <a href="https://fastify.io">Fastify</a> to build backend
        services in Node.js.
      </p>
      <p>What I like about it:</p>
      <ul>
        <li>More opinionated and structured than Express.js</li>
        <li>Damn fast</li>
        <li>Easy to write plugins</li>
        <li>Good defaults out of the box</li>
      </ul>

      <NpmPackage
        pkg="fastify-micro"
        repo="47ng/fastify-micro"
        accent="text-amber-500"
        npmData={npmData['fastify-micro'] ?? null}
      />

      <NpmPackage
        pkg="fastify-cron"
        repo="47ng/fastify-cron"
        accent="text-green-500"
        npmData={npmData['fastify-cron'] ?? null}
      />

      <GitHubRepo slug="47ng/actions-clever-cloud" />

      <h2>Security & Encryption</h2>

      <NpmPackage
        pkg="session-keystore"
        repo="47ng/session-keystore"
        npmData={npmData['session-keystore'] ?? null}
      />

      <p>
        I wrote an article about how I came to build{' '}
        <code>session-keystore</code>:
      </p>

      <BlogPostEmbed slug={['2019', 'how-to-store-e2ee-keys-in-the-browser']} />

      <NpmPackage
        pkg="@47ng/cloak"
        repo="47ng/cloak"
        npmData={npmData['@47ng/cloak'] ?? null}
      />

      <GitHubRepo slug="SocialGouv/e2esdk" />

      <h2>Environment Variables</h2>
      <p>
        The <a href="https://12factor.net/config">Twelve Factor App</a> model
        uses environment variables extensively for configuration and passing
        runtime data to a web app.
      </p>
      <p>
        However, there are things to look out for when working with environment
        variables, so I built a few packages to make their management easier and
        more secure:
      </p>

      <NpmPackage
        pkg="redact-env"
        repo="47ng/redact-env"
        npmData={npmData['redact-env'] ?? null}
      />

      <NpmPackage
        pkg="env-alias"
        repo="47ng/env-alias"
        npmData={npmData['env-alias'] ?? null}
      />

      <NpmPackage
        pkg="@47ng/check-env"
        repo="47ng/check-env"
        npmData={npmData['@47ng/check-env'] ?? null}
      />

      <h2>Miscellaneous</h2>

      <NpmPackage
        pkg="@47ng/codec"
        repo="47ng/codec"
        npmData={npmData['@47ng/codec'] ?? null}
      />

      <p>
        My longest-running open-source project is the Arduino MIDI Library. I
        learned programming in C++ in 2008 with this project and discovered my
        passion for open-source software.
      </p>

      <GitHubRepo slug="FortySevenEffects/arduino_midi_library" />

      <p>
        The source code for this website! Made with{' '}
        <a href="https://nextjs.org" className="underline">
          Next.js
        </a>
        ,{' '}
        <a href="https://tailwindcss.com" className="underline">
          TailwindCSS
        </a>{' '}
        and{' '}
        <a href="https://mdxjs.com/" className="underline">
          MDX
        </a>
        .
      </p>

      <GitHubRepo slug="franky47/francoisbest.com" />

      <HireMe outerClass="mt-12" />

      <nav role="list" className="!mt-12 flex flex-col items-center text-center text-sm">
        <a role="listitem" href="https://github.com/franky47/francoisbest.com/blob/next/packages/francoisbest.com/src/app/(pages)/open-source/page.tsx" className="!text-gray-500">
          Edit this page on GitHub
        </a>
      </nav>
    </>
  )
}
