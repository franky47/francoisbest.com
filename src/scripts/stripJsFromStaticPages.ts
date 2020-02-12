import fs from 'fs'
import path from 'path'
import posthtml, { PostHTML } from 'posthtml'

function removeNextScripts(tree: PostHTML.Node) {
  tree.match({ tag: 'script' }, node => {
    if (
      node.attrs &&
      node.attrs['src'] &&
      node.attrs.src.startsWith('/_next/static') &&
      node.attrs.src.endsWith('.js')
    ) {
      console.log('Dropping script', node.attrs.src)
      ;(node as any).tag = false
      node.content = []
    }
    return node
  })

  tree.match({ tag: 'link' }, node => {
    if (
      node.attrs &&
      node.attrs['href'] &&
      node.attrs.href.startsWith('/_next/static') &&
      node.attrs.href.endsWith('.js')
    ) {
      console.log('Dropping link  ', node.attrs.href)
      ;(node as any).tag = false
      node.content = []
    }
    return node
  })
}

async function processFile(filePath: string) {
  const html = fs.readFileSync(filePath).toString('utf8')
  const result = await posthtml()
    .use(removeNextScripts)
    .process(html, { sync: true })
  fs.writeFileSync(filePath, result.html)
}

const main = async () => {
  await processFile(path.resolve(__dirname, '../../out/index.html'))
  await processFile(path.resolve(__dirname, '../../out/open-source.html'))
  await processFile(path.resolve(__dirname, '../../out/404.html'))
}

if (require.main === module) {
  main()
}
