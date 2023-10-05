import qr from 'qrcode'
import { twMerge } from 'tailwind-merge'

export type QRCodeProps = React.ComponentProps<'figure'> & {
  text: string
  children: React.ReactNode
}

export const QRCode: React.FC<QRCodeProps> = async ({
  text,
  className,
  children,
  ...props
}) => {
  const svg = await qr.toString(text, {
    type: 'svg',
    errorCorrectionLevel: 'M',
  })
  return (
    <figure
      aria-label="QR code with contact information"
      className={twMerge('m-8', className)}
      {...props}
    >
      <picture dangerouslySetInnerHTML={{ __html: svg.trim() }} />
      <figcaption className="text-center">{children}</figcaption>
    </figure>
  )
}
