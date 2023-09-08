'use client'

import type { Encoding } from '@47ng/codec'
import React from 'react'
import { FiCheck, FiCopy } from 'react-icons/fi'
import { IconButton } from 'ui/components/buttons/icon-button'
import { NumberInput, Textarea } from 'ui/components/forms/inputs'
import { Radio, RadioGroup } from 'ui/components/forms/radio'
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from 'ui/components/forms/structure'
import { useClipboard } from 'ui/hooks/useClipboard'
import { useHydration } from 'ui/hooks/useHydration'
import { WideContainer } from 'ui/layouts/wide-container'
import { splitSecret } from './tss'

type HorcruxSplitProps = {
  gitHubSourceUrl: string
}

export const HorcruxSplit: React.FC<HorcruxSplitProps> = ({
  gitHubSourceUrl,
}) => {
  const hydrated = useHydration()
  const [secret, setSecret] = React.useState('')
  const [numShards, setNumShards] = React.useState(2)
  const [threshold, setThreshold] = React.useState(2)
  const [encoding, setEncoding] = React.useState<Encoding>('base64')

  const shards = React.useMemo(
    () => splitSecret(secret, numShards, threshold, encoding),
    [secret, numShards, threshold, encoding]
  )

  return (
    <section>
      <h2 id="split" className="text-3xl font-bold my-4">
        Split
        <a href="#split" aria-hidden tabIndex={-1}>
          <span className="icon icon-link font-medium" />
        </a>
      </h2>
      <FormControl name="secret">
        <FormLabel>Enter your secret:</FormLabel>
        <Textarea
          value={secret}
          className="min-h-[6rem]"
          onChange={e => setSecret(e.target.value)}
        />
        <FormHelperText>
          It will not be stored or sent anywhere:{' '}
          <a href={gitHubSourceUrl} className="underline">
            check the source code
          </a>
          .
        </FormHelperText>
      </FormControl>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 md:gap-y-8 mt-8">
        <FormControl name="number-of-shards">
          <FormLabel>Number of shards</FormLabel>
          <NumberInput
            min={2}
            max={8}
            value={numShards}
            onChange={e => {
              const num = e.target.valueAsNumber
              if (!Number.isNaN(num)) {
                setNumShards(num)
                setThreshold(Math.min(threshold, num))
              }
            }}
          />
          <FormHelperText>to split the secret into</FormHelperText>
        </FormControl>
        <FormControl name="number-needed">
          <FormLabel>Number needed</FormLabel>
          <NumberInput
            min={2}
            max={numShards}
            value={threshold}
            onChange={e => {
              const num = e.target.valueAsNumber
              if (!Number.isNaN(num)) {
                setThreshold(Math.max(2, Math.min(numShards, num)))
              }
            }}
          />
          <FormHelperText>to recompose the secret</FormHelperText>
        </FormControl>
        <FormControl name="output-encoding">
          <FormLabel>Output encoding</FormLabel>
          <RadioGroup
            value={encoding}
            onChange={e => setEncoding(e as Encoding)}
          >
            <div className="flex space-x-8">
              <Radio value="base64" checked={encoding === 'base64'}>
                Base 64
              </Radio>
              <Radio value="hex" checked={encoding === 'hex'}>
                Hexadecimal
              </Radio>
            </div>
          </RadioGroup>
        </FormControl>
      </div>
      <hr className="mt-8" />
      <h2 className="mt-8 mb-2 text-2xl font-bold">Horcrux Shards</h2>
      <p>
        <strong className="font-medium">Individually</strong>, these can be
        shared safely. Only <strong className="font-medium">united</strong> can
        they reveal their secret.
      </p>
      {hydrated && (
        <WideContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-8">
            {shards.map((shard, i) => (
              <ReadOnlyCodeBlock key={shard} text={shard} index={i + 1} />
            ))}
          </div>
        </WideContainer>
      )}
    </section>
  )
}

// --

type ReadOnlyCodeBlock = {
  index: number
  text: string
}

const ReadOnlyCodeBlock: React.FC<ReadOnlyCodeBlock> = ({ text, index }) => {
  const { onCopy, hasCopied } = useClipboard(text, 2000)
  return (
    <code
      className="text-sm break-all pt-10 px-4 pb-4 my-0 relative bg-gray-50/30 dark:bg-gray-900 border dark:border-gray-800 rounded dark:shadow-inner"
      style={{ overflowWrap: 'anywhere' }}
    >
      <span className="absolute top-2 left-4 font-sans font-medium text-gray-500 select-none">
        Shard {index}
      </span>
      <IconButton
        aria-label="Copy"
        title={hasCopied ? 'Copied' : 'Copy'}
        icon={hasCopied ? <FiCheck className="text-green-500" /> : <FiCopy />}
        className="absolute top-2 right-2"
        size="xs"
        variant="ghost"
        onClick={onCopy}
      />
      {text}
    </code>
  )
}
