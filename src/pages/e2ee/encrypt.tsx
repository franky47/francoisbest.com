import { OutgoingLink, RouteLink } from '@47ng/chakra-next'
import * as e2ee from '@47ng/simple-e2ee'
import {
  Box,
  BoxProps,
  Button,
  Center,
  chakra,
  Checkbox,
  CircularProgress,
  CircularProgressLabel,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Stack,
  Textarea,
  useClipboard,
  useColorModeValue
} from '@chakra-ui/react'
import { NextPage } from 'next'
import React from 'react'
import { FiAlertTriangle, FiCheck, FiCopy } from 'react-icons/fi'
// @ts-ignore
import HowItWorks from 'src/../public/images/e2ee/encrypt/how-it-works.svg'
import { mdxComponents } from 'src/components/blog/Mdx'
import { RepoReference } from 'src/components/blog/RepoReference'
import { H1, H3, H5, Paragraph } from 'src/components/primitives/Typography'
import { useURL } from 'src/hooks/useURL'
import PageLayoutWithSEO from 'src/layouts/PageLayout'
import { useLinkColor } from 'src/ui/theme'

export interface E2EEProps {}

const MAX_INPUT_LENGTH = 1024

const E2EE: NextPage<E2EEProps> = ({}) => {
  const [text, setText] = React.useState('')
  const [secure, setSecure] = React.useState(false)
  const { payload, key } = React.useMemo(() => e2ee.encrypt(text), [text])

  const url = React.useMemo(() => {
    const baseURL = useURL('/e2ee/decrypt') + `?payload=${payload}`
    if (secure) {
      return e2ee.applyKeyToURL(key, baseURL)
    } else {
      return baseURL
    }
  }, [payload, key, secure])

  return (
    <PageLayoutWithSEO
      frontMatter={{
        title: 'Share Encrypted Secret',
        description: 'Encrypt and share a secret without using a server',
        path: '/e2ee/encrypt',
        url: useURL('/e2ee/encrypt'),
        ogImage: {
          url: useURL('/images/e2ee/encrypt/og.jpg'),
          width: 1280,
          height: 720
        }
      }}
    >
      <H1>Share Encrypted Secret</H1>
      <Paragraph>
        Encrypt and share a secret. Everything is stored in the URL, nothing is
        stored or sent anywhere.
      </Paragraph>
      <Stack mt={8}>
        <Box pos="relative">
          <Textarea
            value={text}
            onChange={(e: any) => setText(e.target.value)}
            placeholder={`Message to encrypt (max ${MAX_INPUT_LENGTH} characters)`}
            maxLength={MAX_INPUT_LENGTH}
            minH="200px"
          />
          <CharacterCountProgress
            count={text.length}
            maxCount={MAX_INPUT_LENGTH}
            pos="absolute"
            right={3}
            bottom={3}
          />
        </Box>
        <FormControl mb={8}>
          <Checkbox
            isChecked={secure}
            onChange={e => setSecure(e.target.checked)}
          >
            Share over secure channel
          </Checkbox>
          <FormHelperText fontSize="xs">
            Signal, Keybase, WhatsApp,{' '}
            <OutgoingLink href="https://ephemere.app">Ephemere</OutgoingLink>,
            anything end-to-end encrypted.
          </FormHelperText>
        </FormControl>
      </Stack>
      <Stack spacing={4} mt={4}>
        <FormControl>
          <FormLabel>Share this URL</FormLabel>
          <ReadOnlyInputWithCopy value={url} fontSize="sm" />
          {secure && (
            <FormHelperText fontSize="xs">
              <Icon
                as={FiAlertTriangle}
                verticalAlign="top"
                mr={1}
                mt="1px"
                strokeWidth={2.5}
              />
              <chakra.b fontWeight="medium">Warning</chakra.b>: it contains the
              key. Read more below.
            </FormHelperText>
          )}
        </FormControl>
        {!secure && (
          <FormControl>
            <FormLabel>Share the key on a separate channel</FormLabel>
            <ReadOnlyInputWithCopy
              value={key}
              fontFamily="mono"
              fontSize="sm"
            />
          </FormControl>
        )}
      </Stack>
      <H3 linkable id="how-does-it-work" mt={12}>
        How does it work ?
      </H3>
      <Paragraph>
        Your secret is encrypted using{' '}
        <OutgoingLink
          href="https://tweetnacl.js.org/#/secretbox"
          color={useLinkColor()}
        >
          TweetNaCl
        </OutgoingLink>
        , with a{' '}
        <OutgoingLink href="https://tweetnacl.js.org/#/secretbox">
          <mdxComponents.inlineCode
            color={useLinkColor()}
            _hover={{ textDecoration: 'underline' }}
          >
            secret_box
          </mdxComponents.inlineCode>
        </OutgoingLink>{' '}
        cipher. The ciphertext (and nonce) is stored in the URL as a query
        string (which is public).
      </Paragraph>
      <Paragraph>
        How the key is handled depends on how secure your channel of
        communication is. If using a secure channel, the key can be stored in
        the URL hash, which never reaches my server. It makes it more convenient
        as there is only one thing to share:
      </Paragraph>
      <Paragraph as={Center}>
        <HowItWorks
          className="darkModeInvertLuminosity"
          style={{ maxWidth: '500px' }}
        />
      </Paragraph>
      <Paragraph>
        However, for unsecure channels (unencrypted chats like Messenger, Slack,
        email, etc), the key should travel separately. It's best to use a
        completely different method of communication to send it, eg: URL over
        Slack, key over Messenger.
      </Paragraph>
      <H3>What if...</H3>
      <H5>We used a password to encrypt the key ?</H5>
      <Paragraph>
        Instead of sharing the key separately, we could encrypt it with a
        password, and ask for the password instead. But since humans are
        terrible at generating passwords, we might as well use the key directly
        as it's guaranteed to have more entropy.
      </Paragraph>
      <H5>We want an expiring link ?</H5>
      <Paragraph>
        This unfortunately requires some statefulness. If storing the ciphertext
        is not desired (larger size), the key could be split using{' '}
        <RouteLink to="/horcrux" color={useLinkColor()}>
          Shamir Secret Sharing
        </RouteLink>
        . One fragment would be shared in the URL hash, and the other sent to a
        Redis instance (or any auto-expiring KV store).
      </Paragraph>
      <H3>Details &amp; Notes</H3>
      <Paragraph>
        This is abstracted in a little TypeScript package I made:
      </Paragraph>
      <RepoReference {...require('github:47ng/simple-e2ee')} />
      <Paragraph>
        Because a URL can only store so much data, your secret must be short
        (max {MAX_INPUT_LENGTH} characters, as the ciphertext + key will be
        quite longer).
      </Paragraph>
      <Paragraph>
        If you liked this little encryption toy, check out{' '}
        <b>
          <RouteLink to="/horcrux" color={useLinkColor()}>
            Horcrux
          </RouteLink>
        </b>
        , a playground for splitting secrets with{' '}
        <OutgoingLink
          href="https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing"
          color={useLinkColor()}
        >
          Shamir Secret Sharing
        </OutgoingLink>
        .
      </Paragraph>
    </PageLayoutWithSEO>
  )
}

export default E2EE

// --

export interface CharacterCountProgressProps extends BoxProps {
  count: number
  maxCount: number
}

export const CharacterCountProgress: React.FC<CharacterCountProgressProps> = ({
  count,
  maxCount,
  ...props
}) => {
  if (count === 0) {
    return null
  }
  const progress = Math.round((count / maxCount) * 100)
  const remaining = maxCount - count
  const isLow = remaining <= 20
  const color = isLow ? 'orange.500' : 'green.500'
  return (
    <Box {...props}>
      <CircularProgress
        value={progress}
        size={6}
        thickness={12}
        transform={isLow ? 'scale(1.2)' : 'none'}
        color={color}
        trackColor={useColorModeValue('gray.300', 'gray.800')}
      >
        <CircularProgressLabel
          fontSize="xx-small"
          color={color}
          visibility={isLow ? 'visible' : 'hidden'}
        >
          {remaining}
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  )
}

// --

export interface ReadOnlyInputWithCopyProps extends InputProps {
  value: string
}

export const ReadOnlyInputWithCopy: React.FC<ReadOnlyInputWithCopyProps> = ({
  value,
  ...props
}) => {
  const { onCopy, hasCopied } = useClipboard(value)
  return (
    <InputGroup>
      <Input isReadOnly value={value} pr="5.5rem" {...props} />
      <InputRightElement w="5.5rem">
        <Button
          size="sm"
          variant="ghost"
          colorScheme="accent"
          onClick={onCopy}
          leftIcon={hasCopied ? <FiCheck /> : <FiCopy />}
        >
          Copy
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}
