import Link from 'next/link'
import HashvatarDemoPage from './demo'

export const metadata = {
  title: 'Hashvatar',
  description: 'Generate your own SHA-256 based avatar',
}

export default async function HashvatarPage() {
  return (
    <>
      <HashvatarDemoPage />
      <p className="text-center">
        <Link href="/posts/2021/hashvatars" className="underline">
          Learn more
        </Link>
      </p>
    </>
  )
}
