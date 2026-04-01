import { Metadata } from 'next'
import { Note } from 'ui/components/note'
import { NpmPackage } from 'ui/embeds/npm-package'

export const metadata: Metadata = {
  title: 'Public keys',
  description: 'PKI for the rest of us'
}

export default function PublicKeysPage() {
  return (
    <>
      <h1>Public keys</h1>

      <h2>ProtonMail</h2>
      <p>
        If you want to send me sensitive email, you can end-to-end encrypt it
        with <strong>PGP</strong> using my public key, and send your encrypted
        message to{' '}
        <a href="mailto:contact@francoisbest.com">contact@francoisbest.com</a>.
      </p>
      <pre>
        <code>{`-----BEGIN PGP PUBLIC KEY BLOCK-----
xjMEXQZrGBYJKwYBBAHaRw8BAQdAKtfWV7ftx6wz695KaVK1P5Uxv5uF9QSk
iKNg5WA7hxLNM2NvbnRhY3RAZnJhbmNvaXNiZXN0LmNvbSA8Y29udGFjdEBm
cmFuY29pc2Jlc3QuY29tPsJ3BBAWCgAfBQJdBmsYBgsJBwgDAgQVCAoCAxYC
AQIZAQIbAwIeAQAKCRDJqWp0dE//yUH3AQDNMweIEqr7vlGTmQ4YdGWIyyLU
H2kvzd+j+Qln3p84jAEArveSnLwUiDwSY8A0nmpyyf8cTABOSmj/DfDf5inZ
5gPOOARdBmsYEgorBgEEAZdVAQUBAQdAgxLRtIBYrllF7ZStXDzKHBDWVzTZ
qF/D7DHH4mb/dDcDAQgHwmEEGBYIAAkFAl0GaxgCGwwACgkQyalqdHRP/8nJ
JQEAo/7eICIapjrYXbW07qjoWgWvguhbUNWZvWg+ZhuITZoBAJqO5xwpUrGl
nEp97ZmKIRYDdsklAepec7jZFZdrUxsB
=60X5
-----END PGP PUBLIC KEY BLOCK-----`}</code>
      </pre>

      <h2>GitHub</h2>
      <p>
        To verify signed commits made by my username{' '}
        <a href="https://github.com/franky47">franky47</a>.
      </p>
      <pre>
        <code>
          ssh-ed25519
          AAAAC3NzaC1lZDI1NTE5AAAAIHab2oWbLJjK8dRsdd2zZHXCqswrDnt2rctUu+f0WBdJ
        </code>
      </pre>

      <Note status="info">
        Also accessible at{' '}
        <a href="https://github.com/franky47.keys">github.com/franky47.keys</a>
      </Note>

      <h2>Chiffre.io</h2>
      <p>
        <a href="https://chiffre.io/analytics.js">Tracker script</a> signature
        public key:
      </p>
      <pre>
        <code>spk.lGrzXbgqN5fEXZhntPyIPJk0mcnbP6viWXQaosIwYHk</code>
      </pre>

      <h2>Sceau</h2>

      <NpmPackage pkg="sceau" repo="47ng/sceau" />

      <ul>
        <li>
          <a href="https://github.com/47ng/sceau">47ng/sceau</a>{' '}
          <small className="text-gray-500">
            <em>(Sceau signs itself, dogfood FTW)</em>
          </small>
          <pre>
            <code>
              c30d5d28b88136c77168fb78bf117948127c4e22f987ab60cd083bbd6c7ac0c9
            </code>
          </pre>
        </li>
        <li>
          <a href="https://github.com/47ng/opaque">47ng/opaque</a>
          <pre>
            <code>
              5ac3e4d721755717f07d2af2fc8814c28b8265390d195644ccbf4141a7483564
            </code>
          </pre>
        </li>
        <li>
          <a href="https://github.com/47ng/fastify-micro">
            47ng/fastify-micro
          </a>
          <pre>
            <code>
              4375fc7bacb2f0a931d3a50367ad79f6562f600aad9dd83545544d9c0b2dc7d3
            </code>
          </pre>
        </li>
        <li>
          <a href="https://github.com/SocialGouv/e2esdk">SocialGouv/e2esdk</a>
          <pre>
            <code>
              82182691aa16fb18c4ee5f502f9067fe486768391d6ad5baa95e7a68913c9ad9
            </code>
          </pre>
        </li>
        <li>
          <a href="https://github.com/SocialGouv/streaming-file-encryption">
            SocialGouv/streaming-file-encryption
          </a>
          <pre>
            <code>
              cc5ce1aae47615906725d9859ae6c9202ca4406e14f242a4d1ef8a5a2cdadfb7
            </code>
          </pre>
        </li>
      </ul>
    </>
  )
}
