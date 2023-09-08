'use client'

import React from 'react'

export function useHydration() {
  const [hydrated, setHydrated] = React.useState(false)
  React.useEffect(() => {
    setHydrated(true)
  }, [])
  return hydrated
}
