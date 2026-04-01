import { Metadata } from 'next'
import Link from 'next/link'
import { GitHubRepo } from 'ui/embeds/github-repo'
import { NpmPackage } from 'ui/embeds/npm-package'
import { BlogPostEmbed } from 'ui/embeds/blog-post-embed'

export const metadata: Metadata = {
  title: 'Open-Source',
  description:
    'Some of the OSS packages and projects I published and contribute to.'
}

export const revalidate = 86400

export default function OpenSourcePage() {
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
        new Next.js app router and server components, so I'm now letting Tailwind
        deal with styling. ChatGPT makes a perfect companion for refactoring one
        into the other anyway.
      </p>

      <NpmPackage
        pkg="next-usequerystate"
        repo="47ng/next-usequerystate"
        accent="text-indigo-500 dark:text-indigo-400"
        versionRollout={6}
      />

      <NpmPackage
        pkg="nuqs"
        repo="47ng/nuqs"
        accent="text-indigo-500 dark:text-indigo-400"
        versionRollout={6}
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
      />

      <NpmPackage
        pkg="fastify-cron"
        repo="47ng/fastify-cron"
        accent="text-green-500"
      />

      <GitHubRepo slug="47ng/actions-clever-cloud" />

      <h2>Security & Encryption</h2>

      <NpmPackage pkg="session-keystore" repo="47ng/session-keystore" />

      <p>
        I wrote an article about how I came to build{' '}
        <code>session-keystore</code>:
      </p>

      <BlogPostEmbed slug={['2019', 'how-to-store-e2ee-keys-in-the-browser']} />

      <NpmPackage pkg="@47ng/cloak" repo="47ng/cloak" />

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

      <NpmPackage pkg="redact-env" repo="47ng/redact-env" />

      <NpmPackage pkg="env-alias" repo="47ng/env-alias" />

      <NpmPackage pkg="@47ng/check-env" repo="47ng/check-env" />

      <h2>Miscellaneous</h2>

      <NpmPackage pkg="@47ng/codec" repo="47ng/codec" />

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
    </>
  )
}
