import { RouteLink, RouteLinkProps } from '@47ng/chakra-next'
import * as e2ee from '@47ng/simple-e2ee'
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Stack,
  Text,
  Textarea,
  useClipboard
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { useQueryState } from 'next-usequerystate'
import React from 'react'
import { FiCheck, FiCopy } from 'react-icons/fi'
import { IoKeyOutline } from 'react-icons/io5'
import { H1, Paragraph } from 'src/components/primitives/Typography'
import { useURL } from 'src/hooks/useURL'
import PageLayoutWithSEO from 'src/layouts/PageLayout'
import { useLinkColor } from 'src/ui/theme'

function useHashState() {
  const [value, _setValue] = React.useState(() => {
    if (typeof window === 'undefined') {
      return '' // No access to hash on SSR/SSG
    } else {
      return window.location.hash.replace(/^#/, '')
    }
  })
  const setValue = React.useCallback((v: string) => {
    window.location.hash = v
  }, [])
  React.useEffect(() => {
    const onHashChange = () => {
      _setValue(window.location.hash.replace(/^#/, ''))
    }
    window.addEventListener('hashchange', onHashChange)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])
  return [value, setValue] as const
}

// --

function useDecryption(
  payload: string | null,
  key?: string
): { secret?: string; error?: string } {
  if (!payload) {
    return {
      secret: undefined,
      error: 'Missing payload'
    }
  }
  if (!key) {
    return {
      secret: undefined,
      error: 'Missing key'
    }
  }
  try {
    const secret = e2ee.decrypt<string>(payload, key)
    return { secret }
  } catch (error) {
    return {
      error: (error.message as string)
        .split('')
        .map((c, i) => (i === 0 ? c.toUpperCase() : c))
        .join('')
    }
  }
}

// --

const NewSecretLink: React.FC<Omit<RouteLinkProps, 'to'>> = ({ ...props }) => (
  <RouteLink
    to="/e2ee/encrypt"
    mt={4}
    color={useLinkColor()}
    fontWeight="medium"
    {...props}
  >
    Encrypt new secret
  </RouteLink>
)

// --

const E2EE: NextPage = ({}) => {
  const [hydrated, setHydrated] = React.useState(false)
  const [payload] = useQueryState('payload')
  const [key, setKey] = useHashState()
  const [askForKey, setAskForKey] = React.useState(false)
  const { secret, error } = useDecryption(payload, key)
  const { onCopy, hasCopied } = useClipboard(secret ?? '')

  React.useEffect(() => {
    if (secret !== undefined) {
      setAskForKey(false)
    }
  }, [secret])

  React.useLayoutEffect(() => {
    setAskForKey(!!payload && !key)
    setHydrated(true)
  }, [])

  const focusRef = React.useRef<any>()

  return (
    <PageLayoutWithSEO
      frontMatter={{
        title: 'Decrypt Shared Secret',
        description: 'Decrypt a shared secret stored in the URL',
        path: '/e2ee/decrypt',
        url: useURL('/e2ee/decrypt'),
        ogImage: {
          url: useURL('/images/e2ee/decrypt/og.jpg'),
          width: 1280,
          height: 720
        }
      }}
    >
      <H1>Decrypt Shared Secret</H1>
      {error === 'Missing payload' ? (
        <Stack mt={12} spacing={8}>
          <Skeleton isLoaded={hydrated}>
            <Text>
              This page requires an encrypted payload in the URL to decrypt.
            </Text>
          </Skeleton>
          <NewSecretLink />
        </Stack>
      ) : (
        <Text color="red.600" display={askForKey || !error ? 'none' : 'block'}>
          Error: {error}
        </Text>
      )}
      {secret !== undefined && (
        <Stack>
          <FormControl>
            <FormLabel
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginInlineEnd={0}
            >
              <Text>Decrypted secret</Text>
              <Button
                size="xs"
                onClick={onCopy}
                variant="ghost"
                colorScheme="accent"
                leftIcon={hasCopied ? <FiCheck /> : <FiCopy />}
                mr={0}
              >
                Copy
              </Button>
            </FormLabel>
            <Textarea
              value={secret}
              onChange={() => {}}
              minH="200px"
              placeholder="Hello darkness my old friend (your secret is an empty string)."
            />
          </FormControl>
          <NewSecretLink />
        </Stack>
      )}
      <Modal
        isOpen={askForKey}
        onClose={() => setAskForKey(false)}
        closeOnEsc={false}
        closeOnOverlayClick={false}
        isCentered
        initialFocusRef={focusRef}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Icon as={IoKeyOutline} mt={-1} mr={1} /> Enter key
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Paragraph>
              This encrypted secret URL requires a key to be decrypted. Whoever
              sent it to you should have sent you the key using a separate
              channel.
            </Paragraph>
            <FormControl>
              <FormLabel>Paste the key here:</FormLabel>
              <Input
                ref={focusRef}
                value={key}
                onChange={e => setKey(e.target.value)}
              />
              <FormHelperText color="red.600">
                {error && error !== 'Missing key' ? (
                  <>Error: {error}</>
                ) : (
                  <>&nbsp;</>
                )}
              </FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </PageLayoutWithSEO>
  )
}

export default E2EE
