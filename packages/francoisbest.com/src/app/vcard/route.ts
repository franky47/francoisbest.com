import { vcard } from './vcard'

export function GET() {
  const res = new Response(vcard)
  res.headers.set('content-type', 'text/vcard')
  return res
}
