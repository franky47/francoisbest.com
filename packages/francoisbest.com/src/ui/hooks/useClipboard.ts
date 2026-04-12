import { useCallback, useEffect, useState } from 'react'

export function useClipboard(value: string, timeout = 1500) {
  const [hasCopied, setHasCopied] = useState(false)

  const onCopy = useCallback(() => {
    try {
      navigator.clipboard.writeText(value).then(
        () => setHasCopied(true),
        () => {} // Clipboard write failed; hasCopied stays false
      )
    } catch {
      // Clipboard API unavailable (non-secure context, etc.)
    }
  }, [value])

  useEffect(() => {
    if (!hasCopied) return
    const id = window.setTimeout(() => setHasCopied(false), timeout)
    return () => window.clearTimeout(id)
  }, [timeout, hasCopied])

  return { onCopy, hasCopied }
}
