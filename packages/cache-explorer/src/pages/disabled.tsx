import React from 'react'
import { colors, font, spacing } from '../theme'

export default function DisabledPage() {
  return (
    <main
      style={{
        display: 'flex',
        height: '80vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.bg,
        color: colors.text,
      }}
    >
      <h1
        style={{
          lineHeight: '1.2',
          fontWeight: font.bold,
          fontSize: font['3xl'],
        }}
      >
        Cache Explorer is disabled
      </h1>
      <p
        style={{
          marginTop: spacing[4],
          textAlign: 'center',
          fontSize: font.sm,
          color: colors.gray[500],
        }}
      >
        Run with `CACHE_EXPLORER=true` to enable it.
      </p>
    </main>
  )
}
