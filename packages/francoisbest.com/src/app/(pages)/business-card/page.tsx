import { decryptPhoneNumber, vcard } from 'app/vcard/vcard'
import { cookies } from 'next/headers'
import { SearchParams } from 'nuqs/server'
import { QRCode } from './qrcode'

export const metadata = {
  title: 'Business card',
  description: 'Why cut trees when you can send a link?'
}

export const dynamic = 'force-dynamic' // SSR

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function BusinessCardPage({ searchParams }: PageProps) {
  const { loadKey } = await searchParams
  let phoneNumber: string | undefined = undefined
  const cookieStore = await cookies()
  const key = cookieStore.get('phoneNumberKey')?.value
  try {
    phoneNumber = decryptPhoneNumber(key ?? '')
  } catch (err) {
    console.error(err)
  }
  const showLoadKey =
    !key &&
    Boolean(loadKey) &&
    Boolean(process.env.ENCRYPTED_PHONE_NUMBER) &&
    loadKey === process.env.ENCRYPTED_PHONE_NUMBER
  return (
    <>
      <QRCode text={vcard(phoneNumber)} className="mx-auto max-w-xs">
        <a href="/vcard" download="francois.best.vcf">
          Add contact
        </a>
      </QRCode>
      {showLoadKey && <LoadKey />}
    </>
  )
}

// --

async function loadKey(form: FormData) {
  'use server'
  const cookiesStore = await cookies()
  cookiesStore.set('phoneNumberKey', form.get('key') as string, {
    httpOnly: true,
    secure: true,
    expires: new Date('2100-01-01'),
    sameSite: 'strict'
  })
}

function LoadKey() {
  return (
    <form action={loadKey}>
      <input type="text" name="key" placeholder="Key" />
      <button type="submit">Send</button>
    </form>
  )
}
