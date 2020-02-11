import fs from 'fs'
import path from 'path'
import posthtml, { PostHTML } from 'posthtml'

const filePath = path.resolve(__dirname, '../../out/index.html')

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
      console.log('Dropping link', node.attrs.href)
      ;(node as any).tag = false
      node.content = []
    }
    return node
  })
}

const main = async () => {
  const html = fs.readFileSync(filePath).toString('utf8')
  const result = await posthtml()
    .use(removeNextScripts)
    // .use(
    //   minifier({
    //     collapseWhitespace: true,
    //     conservativeCollapse: true,
    //     removeComments: false,
    //     minifyCSS: true
    //   })
    // )
    .process(html, { sync: true })
  fs.writeFileSync(filePath, result.html)
}

main()
