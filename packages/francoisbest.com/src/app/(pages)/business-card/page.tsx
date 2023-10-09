import { decryptPhoneNumber, vcard } from 'app/vcard/vcard'
import { cookies } from 'next/headers'
import { QRCode } from './qrcode'

export const metadata = {
  title: 'Business card',
  description: 'Why cut trees when you can send a link?',
}

export const dynamic = 'force-dynamic' // SSR

type PageProps = {
  searchParams: {
    loadKey: string
  }
}

export default function BusinessCardPage({
  searchParams: { loadKey },
}: PageProps) {
  let phoneNumber: string | undefined = undefined
  const key = cookies().get('phoneNumberKey')?.value
  try {
    phoneNumber = decryptPhoneNumber(key ?? '')
  } catch (err) {
    console.error(err)
  }
  return (
    <>
      <QRCode text={vcard(phoneNumber)} className="mx-auto max-w-xs">
        <a href="/vcard" download="francois.best.vcf">
          Add contact
        </a>
      </QRCode>
      {!key && loadKey === process.env.ENCRYPTED_PHONE_NUMBER && <LoadKey />}
    </>
  )
}

// --

async function loadKey(form: FormData) {
  'use server'
  cookies().set('phoneNumberKey', form.get('key') as string, {
    httpOnly: true,
    secure: true,
    expires: new Date('2100-01-01'),
    sameSite: 'strict',
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
