import path from 'path'
import { renderToString } from 'react-dom/server'
import { NpmPackageOGImage } from 'src/components/embeds/npm/NpmPackageOGImage'
import { AppCore } from 'src/pages/_app'
import { github, npm } from 'src/data/.storage/manifests'
import fs from 'fs'
import mkdirp from 'make-dir'
import { ColorKeys, makeTheme } from 'src/ui/theme'
import htmlToImage from 'node-html-to-image'

interface Args {
  slug: github.ContentIDs
  packageName: npm.ContentIDs
  accentKey?: ColorKeys
}

const theme = makeTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark'
  }
})

export async function renderPackageOpenGraphImage({
  slug,
  packageName,
  accentKey = 'twitter'
}: Args) {
  const outputDir = path.resolve(process.cwd(), 'public/images/repos', slug)
  const outputHtml = path.resolve(outputDir, 'og.html')
  const react = renderToString(
    <AppCore theme={theme}>
      <NpmPackageOGImage
        github={github.manifest[slug]}
        npm={npm.manifest[packageName]}
        accentKey={accentKey}
      />
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
