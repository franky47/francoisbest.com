import { HireMe } from 'ui/components/hire-me'

export default function Page() {
  return (
    <>
      <h1>Links</h1>
      <ul>
        <li>
          <a href="https://bsky.app/profile/francoisbest.com">Bluesky</a>
        </li>
        <li>
          <a href="https://x.com/nuqs47ng">Twitter</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/francoisbest/">LinkedIn</a>
        </li>
        <li>
          <a href="https://www.youtube.com/@47ng-dev">YouTube</a>
        </li>
        <li>
          <a href="https://www.twitch.tv/francoisbest">Twitch</a>
        </li>
      </ul>

      <HireMe outerClass="mt-12" />

      <nav role="list" className="!mt-12 flex flex-col items-center text-center text-sm">
        <a role="listitem" href="https://github.com/franky47/francoisbest.com/blob/next/packages/francoisbest.com/src/app/(pages)/links/page.tsx" className="!text-gray-500">
          Edit this page on GitHub
        </a>
      </nav>
    </>
  )
}
