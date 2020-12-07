import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as e2ee from '@47ng/simple-e2ee'
import { ButtonRouteLink, StackContainer } from '@47ng/chakra-next'
import {
  Button,
  Input,
  Stack,
  Text,
  Textarea,
  useClipboard
} from '@chakra-ui/react'

export interface E2EEProps {}

const E2EE: NextPage<E2EEProps> = ({}) => {
  const router = useRouter()
  const [text, setText] = React.useState('')
  const url = typeof window === 'undefined' ? '' : window.location.toString()
  const { onCopy, hasCopied } = useClipboard(url)
  React.useEffect(() => {
    const key = e2ee.getKeyFromURL()
    const { payload } = router.query as { [key: string]: string }
    if (!payload) {
      // First hydration
      return
    }
    setText(e2ee.decrypt<string>(payload, key))
  }, [router])

  return (
    <StackContainer mt={8}>
      <Text>Share the URL anywhere you want </Text>
      <Stack isInline>
        <Input isReadOnly value={url} size="sm" />
        <Button onClick={onCopy} ml={2} size="sm">
          {hasCopied ? 'Copied' : 'Copy'}
        </Button>
      </Stack>

      <Text mt={8}>Decrypted data:</Text>
      <Textarea isReadOnly value={text} minH="200px" />
      <ButtonRouteLink to="/e2ee/encrypt" mt={4}>
        Encrypt new message
      </ButtonRouteLink>
    </StackContainer>
  )
}

export default E2EE
