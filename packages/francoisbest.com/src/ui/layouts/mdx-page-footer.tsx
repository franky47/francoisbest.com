import { gitHubUrl, hnDiscussionUrl, isBlogPost } from 'lib/paths'
import Link from 'next/link'
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
          <div className="flex not-prose items-center">
            <Logo size={16} />
            <div className="ml-4">
              <Link href="/" className="text-xl font-bold">
                François Best
              </Link>
              <p>Freelance developer & founder</p>
              <nav className="text-sm font-medium mt-1">
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
      <nav
        role="list"
        className="text-center text-sm !mt-12 flex flex-col gap-4 sm:block items-center"
      >
        <a role="listitem" href={editUrl} className="!text-gray-500">
          Edit this page on GitHub
        </a>
        {isBlogPost(filePath) && (
          <>
            <span className="hidden sm:inline text-gray-500">{separator}</span>
            <a role="listitem" href={hnUrl} className="!text-gray-500">
              Discuss on Hacker News
            </a>
          </>
        )}
      </nav>
    </>
  )
}
