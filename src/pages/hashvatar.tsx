import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import { queryTypes, useQueryState } from 'next-usequerystate'
import React from 'react'
import { PostReference } from 'src/components/blog/PostReference'
import { SHA256Avatar, useHash, Variants } from 'src/components/SHA256Avatar'
import { useURL } from 'src/hooks/useURL'
import PageLayoutWithSEO from 'src/layouts/PageLayout'
// @ts-ignore
import { frontMatter as hashvatarsPost } from './posts/2021/hashvatars.mdx'

export interface HashvatarProps {}

const Hashvatar: NextPage<HashvatarProps> = ({}) => {
  const [text, setText] = useQueryState('text', {
    defaultValue: 'Hello, world!',
    ...queryTypes.string
  })
  const [variant, setVariant] = useQueryState('variant', {
    defaultValue: 'stagger',
    ...queryTypes.string
  })
  const hash = useHash(
    text,
    '315f5bdb76d078c43b8ac0064e4a0164612b1fce77c869345bfc94c75894edd3'
  )
  const hashText = React.useMemo(() => {
    return [hash.slice(0, hash.length / 2), hash.slice(hash.length / 2)].join(
      '<wbr>'
    )
  }, [hash])

  return (
    <PageLayoutWithSEO
      frontMatter={{
        title: 'Hashvatar',
        description: 'Generate your own SHA-256 based avatar',
        url: useURL('/hashvatar'),
        ogImage: {
          url: useURL(`/images/hashvatar/og.jpg`),
          width: 1280,
          height: 720
        },
        containerProps: {
          maxW: '2xl'
        }
      }}
    >
      <SHA256Avatar
        w={64}
        h={64}
        my={8}
        mx="auto"
        hash={hash}
        variant={variant as Variants}
      />
      <Text
        fontSize="xs"
        fontFamily="mono"
        color="gray.600"
        textAlign="center"
        mb={4}
        dangerouslySetInnerHTML={{
          __html: hashText
        }}
      />
      <Input
        d="block"
        maxW={64}
        mx="auto"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <Flex d="flex" justifyContent="space-evenly" w="100%" my={16}>
        <Button
          flexDirection="column"
          variant="ghost"
          onClick={() => setVariant('normal')}
          py={14}
        >
          <SHA256Avatar w={16} h={16} hash={hash} variant="normal" />
          <Text fontSize="sm" textAlign="center" mt={2}>
            Normal
          </Text>
        </Button>
        <Button
          flexDirection="column"
          variant="ghost"
          onClick={() => setVariant('stagger')}
          py={14}
        >
          <SHA256Avatar w={16} h={16} hash={hash} variant="stagger" />
          <Text fontSize="sm" textAlign="center" mt={2}>
            Stagger
          </Text>
        </Button>
        <Button
          flexDirection="column"
          variant="ghost"
          onClick={() => setVariant('spider')}
          py={14}
        >
          <SHA256Avatar w={16} h={16} hash={hash} variant="spider" />
          <Text fontSize="sm" textAlign="center" mt={2}>
            Spider
          </Text>
        </Button>
        <Button
          flexDirection="column"
          variant="ghost"
          onClick={() => setVariant('flower')}
          py={14}
        >
          <SHA256Avatar w={16} h={16} hash={hash} variant="flower" />
          <Text fontSize="sm" textAlign="center" mt={2}>
            Flower
          </Text>
        </Button>
        <Button
          flexDirection="column"
          variant="ghost"
          onClick={() => setVariant('gem')}
          py={14}
        >
          <SHA256Avatar w={16} h={16} hash={hash} variant="gem" />
          <Text fontSize="sm" textAlign="center" mt={2}>
            Gem
          </Text>
        </Button>
      </Flex>
      <Text my={8}>Read about how they are made:</Text>
      <PostReference frontMatter={hashvatarsPost} />
    </PageLayoutWithSEO>
  )
}

export default Hashvatar
