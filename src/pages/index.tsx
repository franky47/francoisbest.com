import React from 'react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Box, Heading, Stack, Text, Link, Button } from '@chakra-ui/core'
import Logo from '../components/Logo'
import JsonBlock from '../components/JsonBlock'
import NextLink from 'next/link'
import { useColor } from '../ui/colors'
import Nav from '../components/Nav'
import ProtonMailIcon from '../components/icons/ProtonMail'

const HomePage: NextPage = () => {
  const linkColor = useColor('gray.800', 'gray.100')

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
      <Nav />
      <Stack as="main" spacing={20} py={20} px={2}>
        <Stack
          as="section"
          id="hero"
          textAlign="center"
          alignItems="center"
          spacing={4}
        >
          <Logo mx="auto" circledWhenDark />
          <Box>
            <Heading
              as="h1"
              fontSize="3xl"
              fontWeight="semibold"
              color={useColor('47ng-light', '47ng-dark')}
            >
              François Best
            </Heading>
            <Text color={useColor('gray.600', 'gray.500')} fontSize="xl">
              Freelance Developer
            </Text>
          </Box>
          <Link href="mailto:contact+web@francoisbest.com">
            <Button
              variant="outline"
              variantColor="indigo"
              leftIcon={ProtonMailIcon}
            >
              Contact
            </Button>
          </Link>
        </Stack>
        <Stack as="section" id="about" maxW="xl" w="100%" mx="auto" spacing={6}>
          <Heading as="h2" fontSize="xl" fontWeight="medium">
            Hi !
          </Heading>
          <Text>
            I’m a web developer interested in security and privacy in web
            technologies.
          </Text>
          <Text>
            In this day and age of{' '}
            <Link
              href="https://en.wikipedia.org/wiki/Surveillance_capitalism"
              isExternal
              fontWeight="medium"
              color={linkColor}
            >
              surveillance capitalism
            </Link>
            , I strongly believe we need more privacy-conscious decisions in the
            way we design, develop and market our digital products.
          </Text>
          <Text>
            I'm currently working on end-to-end encrypted alternatives to
            various services. If you'd like to know more, drop me a line on{' '}
            <Link
              href="https://twitter.com/fortysevenfx"
              isExternal
              fontWeight="medium"
              color={linkColor}
            >
              Twitter
            </Link>{' '}
            !
          </Text>
          <Text>
            I also love open-source, and have published a number of{' '}
            <NextLink href="/open-source" passHref>
              <Link fontWeight="medium" color={linkColor}>
                TypeScript packages
              </Link>
            </NextLink>{' '}
            for Node.js and the browser, on GitHub &amp; NPM, at{' '}
            <Link
              isExternal
              href="https://github.com/47ng"
              fontWeight="medium"
              color={linkColor}
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
          <Stack fontSize="xs" color="gray.500" isInline flexWrap="wrap">
            <Text as="span" fontWeight="medium">
              Source:
            </Text>
            <Link
              href="https://francoisbest.com/.well-known/aboutme.json"
              isExternal
            >
              <code>https://francoisbest.com/.well-known/aboutme.json</code>
            </Link>
          </Stack>

          <JsonBlock />
        </Stack>
      </Stack>
    </>
  )
}

export default HomePage
