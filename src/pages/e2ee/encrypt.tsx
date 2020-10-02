import React from 'react'
import { NextPage } from 'next'
import * as e2ee from '@47ng/simple-e2ee'
import { StackContainer } from '@47ng/chakra-next'
import { Button, Textarea } from '@chakra-ui/core'
import { useRouter } from 'next/router'

export interface E2EEProps {}

const E2EE: NextPage<E2EEProps> = ({}) => {
  const [text, setText] = React.useState('')
  const router = useRouter()
  const encrypt = React.useCallback(() => {
    const { key, payload } = e2ee.encrypt(text)
    const url = new URL(
      e2ee.applyKeyToURL(
        key,
        window.location
          .toString()
          .replace(/\/encrypt$/, `/decrypt?payload=${payload}`)
      )
    )
    router.push(url)
  }, [text])

  return (
    <StackContainer mt={8}>
      <Textarea
        value={text}
        onChange={(e: any) => setText(e.target.value)}
        placeholder="Message to encrypt (max 256 characters)"
        maxLength={256}
        minH="200px"
      />
      <Button variantColor="green" onClick={encrypt}>
        Encrypt
      </Button>
    </StackContainer>
  )
}

export default E2EE
