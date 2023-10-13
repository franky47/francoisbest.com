'use client'

import React from 'react'
import { Input } from 'ui/components/forms/inputs'
import { useHash } from 'ui/components/hashvatar.client'
import { SHA256Avatar, Variants } from 'ui/components/hashvatar.server'

export default function HashvatarDemoPage() {
  const [text, setText] = React.useState('Hello, world!')
  const hash = useHash(
    text,
    '315f5bdb76d078c43b8ac0064e4a0164612b1fce77c869345bfc94c75894edd3'
  )
  const hashText = React.useMemo(() => {
    return [hash.slice(0, hash.length / 2), hash.slice(hash.length / 2)].join(
      '<wbr>'
    )
  }, [hash])
  const [variant, setVariant] = React.useState<Variants>('stagger')

  return (
    <>
      <SHA256Avatar
        hash={hash}
        width="16rem"
        height="16rem"
        variant={variant}
        className="mx-auto my-8 block"
      />
      <p
        className="text-center font-mono text-sm text-gray-500"
        dangerouslySetInnerHTML={{ __html: hashText }}
      />
      <Input
        value={text}
        onChange={e => setText(e.target.value)}
        className="mx-auto mt-4 max-w-xs"
      />
      <nav className="mx-auto my-12 flex max-w-xl flex-wrap justify-between">
        <VariantButton variant="normal" hash={hash} onClick={setVariant} />
        <VariantButton variant="stagger" hash={hash} onClick={setVariant} />
        <VariantButton variant="spider" hash={hash} onClick={setVariant} />
        <VariantButton variant="flower" hash={hash} onClick={setVariant} />
        <VariantButton variant="gem" hash={hash} onClick={setVariant} />
      </nav>
    </>
  )
}

// --

type VariantButtonProps = {
  variant: Variants
  onClick: (variant: Variants) => void
  hash: string
}

const VariantButton: React.FC<VariantButtonProps> = ({
  variant,
  onClick,
  hash
}) => {
  return (
    <button
      onClick={() => onClick(variant)}
      className="rounded p-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      <SHA256Avatar width="4rem" height="4rem" hash={hash} variant={variant} />
      <span className="mt-1 block">
        {variant[0].toUpperCase() + variant.slice(1)}
      </span>
    </button>
  )
}
