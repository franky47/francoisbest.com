import React from 'react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Heading, Stack, Text, Link } from '@chakra-ui/core'
import Logo from '../components/Logo'
import JsonBlock from '../components/JsonBlock'
import NextLink from 'next/link'

const HomePage: NextPage = () => {
  return (
    <>
      <NextSeo
        title="François Best | Freelance Developer"
        description="Freelance Developer"
        canonical="https://francoisbest.com"
        additionalMetaTags={[{ property: 'author', content: 'François Best' }]}
        twitter={{
          cardType: 'summary',
          handle: 'fortysevenfx',
          site: 'fortysevenfx'
        }}
        openGraph={{
          type: 'website',
          profile: {
            firstName: 'François',
            lastName: 'Best'
          }
          // todo: Add images
        }}
      />
      <Stack as="main" spacing={20} py={20} px={2}>
        <Stack as="section" id="hero" textAlign="center" spacing={4}>
          <Logo aria-label="Logo" mx="auto" />
          <>
            <Heading
              as="h1"
              fontSize="3xl"
              fontWeight="semibold"
              color="#2F2F2F"
            >
              François Best
            </Heading>
            <Text color="gray.600" fontSize="xl">
              Freelance Developer
            </Text>
          </>
        </Stack>
        <Stack as="section" id="about" maxW="xl" w="100%" mx="auto" spacing={6}>
          <Heading as="h2" fontSize="xl" fontWeight="medium">
            Hi !
          </Heading>
          <Text>
            I’m passionate about security and privacy in web technologies.
          </Text>
          <Text>
            In this day and age of{' '}
            <Link
              href="https://en.wikipedia.org/wiki/Surveillance_capitalism"
              isExternal
              fontWeight="medium"
              color="gray.800"
            >
              surveillance capitalism
            </Link>
            , I strongly believe we need more privacy-conscious decisions in the
            way we design, develop and market our digital products.
          </Text>
          <Text>
            I'm currently working on end-to-end encrypted alternatives to
            various services. If you're interested, drop me a line on{' '}
            <Link
              href="https://twitter.com/fortysevenfx"
              isExternal
              fontWeight="medium"
              color="gray.800"
            >
              Twitter
            </Link>{' '}
            !
          </Text>
          {/* <Text>
            My current endeavour on this subject is{' '}
            <Link
              isExternal
              href="https://chiffre.io"
              fontWeight="medium"
              color="gray.800"
            >
              Chiffre.io
            </Link>
            , an end-to-end encrypted analytics platform. It has a nice free
            tier, so check it out !
          </Text> */}
          <Text>
            I also love open-source, and have published a number of{' '}
            <NextLink href="/open-source" prefetch passHref>
              <Link fontWeight="medium" color="gray.800">
                TypeScript packages
              </Link>
            </NextLink>{' '}
            for Node.js and the browser, on GitHub &amp; NPM, at{' '}
            <Link
              isExternal
              href="https://github.com/47ng"
              fontWeight="medium"
              color="gray.800"
            >
              @47ng
            </Link>
            .
          </Text>
        </Stack>
        <Stack as="section" id="code" maxW="xl" w="100%" mx="auto">
          <Heading as="h2" fontSize="xl" fontWeight="medium">
            About me
          </Heading>
          <Text fontSize="xs" color="gray.500">
            <Text as="span" fontWeight="medium">
              Source:
            </Text>{' '}
            <Link
              href="https://francoisbest.com/.well-known/aboutme.json"
              isExternal
            >
              <code>https://francoisbest.com/.well-known/aboutme.json</code>
            </Link>
          </Text>

          <JsonBlock />
        </Stack>
      </Stack>
    </>
  )
}

export default HomePage
