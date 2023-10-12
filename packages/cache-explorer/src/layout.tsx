import Link from 'next/link'
import fs from 'node:fs/promises'
import React from 'react'
import { packageJsonPath } from './paths'
import { colors, font, spacing } from './theme'

type LayoutProps = {
  mountPath: string
  children: React.ReactNode
}

export async function Layout({ children, mountPath }: LayoutProps) {
  const pkgJson = await fs.readFile(packageJsonPath, 'utf-8')
  const pkg = JSON.parse(pkgJson)
  return (
    <main
      style={{
        padding: spacing[4],
        backgroundColor: colors.bg,
        color: colors.text,
      }}
    >
      <h1
        style={{
          marginBottom: spacing[4],
          fontSize: font['2xl'],
          fontWeight: font.bold,
        }}
      >
        <Link href={mountPath}>Next.js Cache Explorer</Link>{' '}
        <span
          style={{
            fontFamily: font.mono,
            fontSize: font.xs,
            fontWeight: font.normal,
            color: colors.gray[500],
          }}
        >
          v{pkg.version}
        </span>
      </h1>
      {children}
    </main>
  )
}
