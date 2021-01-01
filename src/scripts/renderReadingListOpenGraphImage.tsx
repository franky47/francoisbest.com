import path from 'path'
import { renderToString } from 'react-dom/server'
import { AppCore } from 'src/pages/_app'
import fs from 'fs'
import mkdirp from 'make-dir'
import { makeTheme } from 'src/ui/theme'
import htmlToImage from 'node-html-to-image'
import { ReadingListPageProps, ReadingListStats } from 'src/pages/reading-list'
import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { H2 } from 'src/components/primitives/Typography'
import { Logo } from 'src/components/Logo'
import { formatDate } from 'src/ui/format'

interface Args {
  stats: ReadingListPageProps['stats']
}

const theme = makeTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark'
  }
})

export async function renderReadingListOpenGraphImage({ stats }: Args) {
  const outputDir = path.resolve(process.cwd(), 'public/images/reading-list')
  const outputHtml = path.resolve(outputDir, 'og.html')
  const react = renderToString(
    <AppCore theme={theme}>
      <Box w="600px" h="315px" p={8} pos="relative">
        <H2 textAlign="center" mb={12} mt={0}>
          Blog Articles I Read In 2021
        </H2>
        <ReadingListStats stats={stats} />
        <Flex
          px={8}
          pb={12}
          pos="absolute"
          bottom={0}
          left={0}
          right={0}
          h={8}
          alignItems="center"
        >
          <Logo mr={4} />
          <Text mr="auto" flexShrink={0}>
            francoisbest.com
          </Text>
          <Text fontSize="xs" textAlign="right" color="gray.600">
            Dynamic OpenGraph image
            <br />
            generated on {formatDate(new Date(), '', { month: 'short' })}
          </Text>
        </Flex>
      </Box>
    </AppCore>
  )
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Document</title>
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap" rel="stylesheet">
</head>
<body>
<div id="__next">${react}</div>
</body>
</html>
`
  mkdirp.sync(path.dirname(outputHtml))
  fs.writeFileSync(outputHtml, html)
  await htmlToImage({
    html,
    output: path.resolve(outputDir, 'og.jpg'),
    puppeteerArgs: {
      defaultViewport: {
        width: 600,
        height: 315,
        deviceScaleFactor: 2
      }
    }
  })
}
