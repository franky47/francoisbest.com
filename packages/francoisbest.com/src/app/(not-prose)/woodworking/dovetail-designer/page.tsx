import type { Metadata } from 'next'
import { Suspense } from 'react'
import DovetailDesigner from './page.client'

export const metadata: Metadata = {
  title: 'Dovetail Designer',
  description: 'Design perfect-looking dovetail joints',
  alternates: {
    canonical: '/woodworking/dovetail-designer'
  }
}

export default function DovtailDesignerPage() {
  return (
    <>
      <h1 className="text-4xl font-bold md:text-5xl">Dovetail Designer</h1>
      <p className="text-sm text-gray-500">
        Design perfect-looking dovetail joints
      </p>
      <Suspense>
        <DovetailDesigner />
      </Suspense>
    </>
  )
}
