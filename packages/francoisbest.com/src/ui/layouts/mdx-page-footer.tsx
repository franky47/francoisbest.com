import { gitHubUrl, hnDiscussionUrl, isBlogPost } from 'lib/paths'
import Link from 'next/link'
import { HireMe } from 'ui/components/hire-me'
import { Logo } from 'ui/components/logo'
import { fileURLToPath } from 'url'

type MdxPageFooterProps = {
  file: string
}

const separator = <>&nbsp;•&nbsp;</>

export const MdxPageFooter: React.FC<MdxPageFooterProps> = ({ file }) => {
  if (file.endsWith('/page.mdx') === false) {
    // Don't inject at the end of fragments
    return null
  }
  const filePath = fileURLToPath(file)
  const editUrl = gitHubUrl(filePath)
  const hnUrl = hnDiscussionUrl(filePath)
  return (
    <>
      {isBlogPost(filePath) && (
        <>
          <hr />
          <div className="not-prose flex items-center">
            <Logo size={16} />
            <div className="ml-4">
              <Link href="/" className="text-xl font-bold">
                François Best
              </Link>
              <p>Freelance developer & founder</p>
              <nav className="mt-1 text-sm font-medium">
                <a href="https://github.com/47ng" className="underline">
                  47ng
                </a>
                {separator}
                <a href="https://chiffre.io" className="underline">
                  {' '}
                  Chiffre.io
                </a>
              </nav>
            </div>
          </div>
        </>
      )}

      {
        // Don't add it to the bottom of the main page, as it's already at the top
        // and in the carreer section.
        !file.endsWith('src/app/(pages)/page.mdx') && (
          <HireMe outerClass="mt-12" />
        )
      }
      <nav
        role="list"
        className="!mt-12 flex flex-col items-center gap-4 text-center text-sm sm:block"
      >
        <a role="listitem" href={editUrl} className="!text-gray-500">
          Edit this page on GitHub
        </a>
        {isBlogPost(filePath) && (
          <>
            <span className="hidden text-gray-500 sm:inline">{separator}</span>
            <a role="listitem" href={hnUrl} className="!text-gray-500">
              Discuss on Hacker News
            </a>
          </>
        )}
      </nav>
    </>
  )
}
