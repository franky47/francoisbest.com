'use client'

import prettyBytes from 'pretty-bytes'
import React from 'react'

export function StorageInfo() {
  const [quota, setQuota] = React.useState(-1)
  const [usage, setUsage] = React.useState(-1)

  React.useEffect(() => {
    navigator.storage.estimate().then(({ quota, usage }) => {
      if (quota !== undefined) {
        setQuota(quota)
      }
      if (usage !== undefined) {
        setUsage(usage)
      }
    })
  }, [])

  if (quota === -1 || usage === -1) {
    return null
  }

  return (
    <p className="text-xs text-gray-500">
      Storage: {prettyBytes(usage)} ({((usage / quota) * 100).toFixed()}%) used
      / {prettyBytes(quota)} available
    </p>
  )
}
