'use client'

import React from 'react'
import { SHA256Avatar, SHA256AvatarProps, sha256 } from './hashvatar.server'

export function useHash(
  text: string,
  defaultValue = Array(64).fill('0').join('')
) {
  const [hash, setHash] = React.useState(defaultValue)
  React.useEffect(() => {
    sha256(text).then(setHash)
  }, [text])
  return hash
}

// --

export const AdjustableRadiusFactorSHA256Avatar: React.FC<
  SHA256AvatarProps
> = ({ ...props }) => {
  const [radiusFactor, setRadiusFactor] = React.useState(1)
  return (
    <>
      <SHA256Avatar {...props} radiusFactor={radiusFactor} transition={false} />
      <div className="flex justify-between text-sm">
        <p>Equal Radii</p>
        <p>Equal Areas</p>
      </div>
      <input
        type="range"
        aria-label="slider-ex-1"
        value={radiusFactor}
        onChange={e => setRadiusFactor(e.target.valueAsNumber)}
        className="w-full"
        min={0}
        max={1}
        step={0.01}
      />
      <p className="text-center text-xs tabular-nums">
        Blend factor: {radiusFactor.toFixed(2)}
      </p>
    </>
  )
}

export const InteractiveAvatar: React.FC<
  React.ComponentProps<typeof SHA256Avatar>
> = ({ ...props }) => {
  const [text, setText] = React.useState('Hello, world!')
  const hash = useHash(
    text,
    '315f5bdb76d078c43b8ac0064e4a0164612b1fce77c869345bfc94c75894edd3'
  )
  React.useEffect(() => {
    try {
      const query = new URLSearchParams(location.search)
      const demo = query.get('demo')
      if (demo) {
        setText(demo)
      }
    } catch {}
  }, [])

  const hashText = React.useMemo(() => {
    return [hash.slice(0, hash.length / 2), hash.slice(hash.length / 2)].join(
      '<wbr>'
    )
  }, [hash])

  return (
    <section className="space-y-8">
      <SHA256Avatar {...props} hash={hash} />
      <p
        className="font-mono text-sm text-gray-500 text-center"
        dangerouslySetInnerHTML={{ __html: hashText }}
      />
      <input
        type="text"
        dir="auto"
        value={text}
        onChange={e => setText(e.target.value)}
        className="block mx-auto px-3 py-1 border rounded mt-4 dark:bg-gray-900"
      />
    </section>
  )
}
