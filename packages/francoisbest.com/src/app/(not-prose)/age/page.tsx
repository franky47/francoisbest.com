import { Suspense } from 'react'
import { AgeClient } from './age.client'

export const metadata = {
  title: 'Age',
  description: "What's my age again?"
}

export default function AgePage() {
  return (
    <Suspense>
      <AgeClient />
    </Suspense>
  )
}
