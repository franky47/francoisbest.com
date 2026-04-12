'use client'

import { useQueryState } from 'nuqs'
import { Input } from 'ui/components/forms/inputs'
import { FormControl, FormLabel } from 'ui/components/forms/structure'

const DEFAULT = 'anonymous reader'

export const Greetings = () => {
  const [hello, setHello] = useQueryState('hello')
  return (
    <>
      <FormControl name="hello">
        <FormLabel>Say hello to</FormLabel>
        <Input
          type="text"
          value={hello ?? ''}
          onChange={e => setHello(e.target.value)}
          placeholder={DEFAULT}
        />
      </FormControl>
      <blockquote className="my-6">
        <p>Hello, {hello || DEFAULT}!</p>
      </blockquote>
    </>
  )
}
