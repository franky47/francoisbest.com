import { gitHubUrl, resolve } from 'lib/paths'
import { Note } from 'ui/components/note'
import { HorcruxRecompose } from './recompose'
import { HorcruxSplit } from './split'

export const metadata = {
  title: 'Horcrux',
  description: 'Split and recompose secrets with Shamir Secret Sharing',
}

export default function HorcruxPage() {
  return (
    <>
      <hgroup className="prose dark:prose-invert md:prose-lg">
        <h1 className="font-bold !mb-1">Horcrux</h1>
        <figcaption>📓 💍 📿 👑 🏆 🐍 ⚡</figcaption>
      </hgroup>
      <Note status="info" title="About">
        Split and recompose secrets with{' '}
        <a
          href="https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing"
          className="underline"
        >
          Shamir Secret Sharing
        </a>
        .
      </Note>
      <HorcruxSplit
        gitHubSourceUrl={gitHubUrl(resolve(import.meta.url, './split.tsx'))}
      />
      <HorcruxRecompose />
    </>
  )
}
