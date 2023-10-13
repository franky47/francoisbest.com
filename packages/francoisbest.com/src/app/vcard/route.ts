import { NextRequest } from 'next/server'
import { decryptPhoneNumber, vcard } from './vcard'

export const dynamic = 'force-dynamic'

export function GET(req: NextRequest) {
  const key = req.cookies.get('phoneNumberKey')?.value
  let phoneNumber: string | undefined = undefined
  try {
    phoneNumber = decryptPhoneNumber(key ?? '')
  } catch {}
  console.info(
    JSON.stringify({
      GET: '/vcard',
      ua: req.headers.get('user-agent') ?? 'anonymous',
      geo: req.geo,
      ref: req.referrer,
      key: phoneNumber ? 'valid' : Boolean(key) ? 'invalid' : 'not-provided'
    })
  )
  const res = new Response(vcard(phoneNumber))
  res.headers.set('content-type', 'text/vcard')
  return res
}
