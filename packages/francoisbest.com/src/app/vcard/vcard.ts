import { hex, utf8 } from '@47ng/codec'
import nacl from 'tweetnacl'

// export function encryptPhoneNumber() {
//   const phoneNumber = process.env.PHONE_NUMBER
//   if (!phoneNumber) {
//     throw new Error('Missing PHONE_NUMBER environment variable')
//   }
//   const key = nacl.randomBytes(nacl.secretbox.keyLength)
//   const nonce = nacl.randomBytes(nacl.secretbox.nonceLength)
//   const ciphertext = nacl.secretbox(utf8.encode(phoneNumber), nonce, key)
//   return {
//     encrypted: [hex.encode(nonce), hex.encode(ciphertext)].join('.'),
//     key: hex.encode(key),
//   }
// }

export function decryptPhoneNumber(key: string) {
  const encrypted = process.env.ENCRYPTED_PHONE_NUMBER
  if (!encrypted) {
    throw new Error('Missing ENCRYPTED_PHONE_NUMBER environment variable')
  }
  const [nonce, ciphertext] = encrypted.split('.')
  const phoneNumber = nacl.secretbox.open(
    hex.decode(ciphertext),
    hex.decode(nonce),
    hex.decode(key)
  )
  if (!phoneNumber) {
    throw new Error('Failed to decrypt phone number')
  }
  return utf8.decode(phoneNumber)
}

export const vcard = (phoneNumber?: string) =>
  `
BEGIN:VCARD
VERSION:3.0
SOURCE:https://francoisbest.com/vcard
FN:François Best
N:Best;François
PHOTO;TYPE=JPEG;VALUE=URI:https://res.47ng.com/francois.best.jpg
ORG:47ng
TITLE:Freelance Software Engineer${
    phoneNumber
      ? `
TEL;CELL:${phoneNumber}`
      : ''
  }
EMAIL;WORK;INTERNET:hi@francoisbest.com
URL:https://francoisbest.com
TZ:Europe/Paris
END:VCARD
`.trim()
