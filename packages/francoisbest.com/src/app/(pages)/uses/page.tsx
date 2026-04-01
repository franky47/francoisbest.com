import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Things I use'
}

export default function UsesPage() {
  return (
    <>
      <h1>
        <code>uses</code>
      </h1>
      <p>A collection of things I use to work.</p>

      <h2>Hardware</h2>
      <ul>
        <li>MacBook Pro 2015 (I prefer hardware buttons to the touchbar)</li>
        <li>Beyerdynamic DT-770 Pro</li>
        <li>Note pad + pencil</li>
      </ul>

      <h2>Programming Languages</h2>
      <p>Main:</p>
      <ul>
        <li>TypeScript / JavaScript</li>
        <li>C++</li>
      </ul>
      <p>Notions:</p>
      <ul>
        <li>Rust</li>
        <li>Python</li>
        <li>Ruby</li>
      </ul>

      <h2>Frameworks</h2>
      <ul>
        <li>Next.js / React</li>
        <li>Node.js</li>
        <li>Fastify.io</li>
      </ul>

      <h2>Databases / Datastores</h2>
      <ul>
        <li>PostgreSQL</li>
        <li>Redis</li>
      </ul>

      <h2>UI Frameworks</h2>
      <ul>
        <li>Chakra-UI</li>
        <li>TailwindCSS</li>
      </ul>

      <h2>Browser Extensions</h2>
      <ul>
        <li>Bitwarden</li>
        <li>uBlock Origin</li>
        <li>uMatrix</li>
        <li>PrivacyRedirect</li>
      </ul>

      <h2>Visual Studio Code Extensions</h2>
      <ul>
        <li>Prettier</li>
        <li>ungit</li>
        <li>TodoTree</li>
        <li>Error Lens</li>
      </ul>

      <h2>Services I like to use</h2>
      <ul>
        <li>ProtonMail</li>
        <li>Bitwarden</li>
        <li>GitHub</li>
        <li>Slack</li>
        <li>Excalidraw</li>
        <li>Figma</li>
        <li>Notion</li>
      </ul>

      <h2>Tools</h2>
      <ul>
        <li>Postico (PostgreSQL client)</li>
        <li>Medis (Redis client)</li>
        <li>Insomnia (Postman alternative)</li>
      </ul>
    </>
  )
}
