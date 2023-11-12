'use client'

import { parseAsInteger, useQueryState } from 'next-usequerystate'
import React from 'react'

import { Button } from 'ui/components/buttons/button'

export const Runner: React.FC = () => {
  const [maxCount] = useQueryState('maxCount', parseAsInteger.withDefault(150))
  const [delay] = useQueryState('delay', parseAsInteger.withDefault(320))
  const [counter, setCounter] = useQueryState(
    'counter',
    parseAsInteger.withDefault(0)
  )
  const [running, setRunning] = React.useState(false)
  const [results, setResults] = React.useState<Set<string>>(() => new Set())
  const intervalRef = React.useRef<number | undefined>(undefined)

  const run = React.useCallback(() => {
    setCounter(x => {
      if (x >= maxCount) {
        setRunning(false)
        return 0
      }
      return x + 1
    }).catch(() => {
      setResults(r => {
        r.add(location.search)
        return r
      })
    })
  }, [setCounter, setRunning, maxCount])

  React.useEffect(() => {
    clearInterval(intervalRef.current)
    if (!running) {
      intervalRef.current = undefined
      return
    }
    intervalRef.current = self.setInterval(run, delay)
  }, [running, delay, run])

  return (
    <>
      <section className="space-x-2">
        <Button disabled={running} onClick={() => setRunning(true)}>
          Start
        </Button>
        <Button disabled={!running} onClick={() => setRunning(false)}>
          Cancel
        </Button>
      </section>
      <dl>
        <dd>Delay: {delay}</dd>
        <dd className="flex items-center gap-2">
          <progress value={counter} max={maxCount} />
          {Math.round((100 * counter) / maxCount)}%
        </dd>
      </dl>
      {Array.from(results).map(search => (
        <p key={search}>{search}</p>
      ))}
    </>
  )
}
