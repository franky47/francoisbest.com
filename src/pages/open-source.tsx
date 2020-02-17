import React from 'react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Box, Link, Stack, Text, Divider } from '@chakra-ui/core'
import NpmPackage, { NpmPackageProps } from '../components/oss/NpmPackage'
import Nav from '../components/Nav'
import { H2 } from '../components/primitives/Typography'
import { OutgoingLink } from '../components/primitives/Links'

type Project = NpmPackageProps & { type: 'npm' }

const projects: Project[] = [
  {
    type: 'npm',
    name: 'fastify-micro',
    repo: '47ng/fastify-micro',
    description:
      'Opinionated Node.js microservices framework built on fastify ⚡️',
    keywords: ['fastify', 'microservice-framework']
  },
  {
    type: 'npm',
    name: 'fastify-cron',
    repo: '47ng/fastify-cron',
    description: 'Run cron jobs alongside your Fastify server 👷',
    keywords: ['fastify', 'fastify-plugin', 'cron']
  },
  {
    type: 'npm',
    name: 'session-keystore',
    repo: '47ng/session-keystore',
    description: 'Secure cryptographic key storage in the browser and Node.js',
    keywords: ['key-storage', 'session-storage']
  },
  {
    type: 'npm',
    name: 'redact-env',
    repo: '47ng/redact-env',
    description: 'Redact values of critical environment variables in a string',
    keywords: [
      'environment-variables',
      'redact',
      'secrets',
      'security',
      'logging'
    ]
  },
  {
    type: 'npm',
    name: 'env-alias',
    repo: '47ng/env-alias',
    description:
      'Define aliases for environment variables and bind them at runtime',
    keywords: [
      'twelve-factor',
      'env',
      'environment',
      'environment-variables',
      'alias'
    ]
  },
  {
    type: 'npm',
    name: '@47ng/check-env',
    repo: '47ng/check-env',
    description:
      'Check that required environment variables are set for your app',
    keywords: ['environment', 'environment-variables']
  },
  {
    type: 'npm',
    name: '@47ng/cloak',
    repo: '47ng/cloak',
    description:
      'Serialized AES-GCM 256 encryption, decryption and key management in the browser & Node.js',
    keywords: ['cryptography', 'aes-256-gcm']
  },
  {
    type: 'npm',
    name: '@47ng/codec',
    repo: '47ng/codec',
    description:
      'Universal conversion of Uint8Array from/into UTF-8, base64url and hex in the browser and Node.js',
    keywords: [
      'encoding',
      'decoding',
      'utf-8',
      'base64url',
      'hex',
      'browser',
      'nodejs',
      'int8array'
    ]
  },
  {
    type: 'npm',
    name: 'tapers',
    repo: '47ng/tapers',
    description: 'Transform [0;1] <=> [X,Y] values with custom curves',
    keywords: ['maths', 'curves', 'transforms', 'normalize', 'denormalize']
  }
]

const OpenSourcePage: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Open Source | François Best"
        description="A list of open-source projects &amp; packages I contribute to."
        canonical="https://francoisbest.com/open-source"
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
      <Stack as="main" spacing={16} py={8} px={2}>
        <Stack as="section" id="about" maxW="xl" w="100%" mx="auto" spacing={6}>
          <H2 fontWeight="medium">
            Open Source{' '}
            <OutgoingLink href="https://github.com/47ng">@47ng</OutgoingLink>
          </H2>
          <Text>
            This is a list of open-source projects &amp; packages I have
            published or contribute to:
          </Text>
        </Stack>
        <Stack
          spacing={12}
          as="section"
          id="projects"
          maxW="xl"
          w="100%"
          mx="auto"
        >
          {projects.map((project, i) => (
            <React.Fragment key={project.name}>
              <NpmPackage {...project} key={project.name} />
              {i !== projects.length - 1 && <Divider my={8} />}
            </React.Fragment>
          ))}
        </Stack>
      </Stack>
      <Box textAlign="center" p={8} fontSize="sm" color="gray.500" as="footer">
        This website is open source too !{' - '}
        <Link
          href="https://github.com/franky47/francoisbest.com"
          isExternal
          textDecoration="underline"
        >
          Edit on GitHub
        </Link>
        {' - '}
        Made with{' '}
        <Link href="https://nextjs.org" isExternal textDecoration="underline">
          Next.js
        </Link>{' '}
        {' & '}
        <Link
          href="https://chakra-ui.com"
          isExternal
          textDecoration="underline"
        >
          Chakra UI
        </Link>
      </Box>
    </>
  )
}

export default OpenSourcePage
