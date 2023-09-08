'use client'

import mitt from 'mitt'
import React from 'react'

type LocalCache = Map<string, string>

const localCache: LocalCache = new Map()
const emitter = mitt()

export function useLocalSetting<T>(
  name: string,
  defaultValue: T,
  defer = true
) {
  const storageKey = name
  const [value, _setValue] = React.useState<T>(() => {
    if (typeof window === 'undefined' || defer) {
      return defaultValue // SSR/SSG
    }
    const json = window.localStorage.getItem(storageKey)
    if (!json) {
      return defaultValue
    }
    try {
      return JSON.parse(json)
    } catch {
      return defaultValue
    }
  })

  React.useEffect(() => {
    if (defer === false) {
      return
    }
    function loadFromStorage() {
      const json =
        localCache.get(storageKey) || window.localStorage.getItem(storageKey)
      if (!json) {
        return
      }
      try {
        _setValue(JSON.parse(json))
      } catch {}
    }
    loadFromStorage()
    window.addEventListener('storage', loadFromStorage)
    emitter.on(storageKey, loadFromStorage)
    return () => {
      window.removeEventListener('storage', loadFromStorage)
      emitter.off(storageKey, loadFromStorage)
    }
  }, [defer, storageKey])

  const setValue = React.useCallback(
    (newValue: T) => {
      const json = JSON.stringify(newValue)
      window.localStorage.setItem(storageKey, json)
      localCache.set(storageKey, json)
      emitter.emit(storageKey)
      _setValue(newValue)
    },
    [_setValue, storageKey]
  )
  return [value, setValue] as const
}

export function readLocalSetting<T>(storageKey: string) {
  const json =
    localCache.get(storageKey) || window.localStorage.getItem(storageKey)
  if (!json) {
    return
  }
  try {
    return JSON.parse(json) as T
  } catch {
    return undefined
  }
}
