import { Suspense } from 'react'

import dynamic from 'next/dynamic'

const SQLocalClient = dynamic(() => import('./client'), { ssr: false })

export default function SQLocalPage() {
  return (
    <main className="mx-auto max-w-sm py-8">
      <h1 className="text-2xl font-bold">Shopping List</h1>
      <p className="mb-8 text-sm text-gray-500">
        Running locally using SQLite over OPFS 🤘
      </p>
      <Suspense fallback={<>Loading...</>}>
        <SQLocalClient />
      </Suspense>
    </main>
  )
}
