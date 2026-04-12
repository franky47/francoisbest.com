import { Metadata } from 'next'
import { Suspense } from 'react'
import { Runner } from './runner'

export const metadata: Metadata = {
  title: 'Safari rate limit detector',
  description: 'Testing the boundaries of the Web History API'
}

export default function SafariSpeedrunPage() {
  return (
    <>
      <h1>Safari Rate Limit Detector</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Runner />
      </Suspense>
    </>
  )
}
