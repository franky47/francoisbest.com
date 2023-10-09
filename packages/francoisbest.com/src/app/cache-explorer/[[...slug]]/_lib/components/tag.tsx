import { twMerge } from 'tailwind-merge'

export type TagProps = React.ComponentProps<'span'> & {
  children: string
}

export const Tag: React.FC<TagProps> = ({ className, children, ...props }) => {
  const tag = String(children)
  const colors = tag.startsWith('/')
    ? 'text-gray-500 bg-gray-500/10'
    : getColors(tag)
  return (
    <span
      className={twMerge(
        'font-mono px-2 py-0.5 rounded-full',
        colors,
        className
      )}
      {...props}
    >
      {tag}
    </span>
  )
}

function getColors(input: string) {
  // Digest the input string into a 4-bit integer.
  let hash = 0x2
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i) & 0xf
    hash ^= (input.charCodeAt(i) >> 4) & 0xf
  }
  // prettier-ignore
  switch (hash) {
    case 0x00: return 'text-indigo-500  bg-indigo-500/10'
    case 0x01: return 'text-blue-500    bg-blue-500/10'
    case 0x02: return 'text-cyan-500    bg-cyan-500/10'
    case 0x03: return 'text-green-500   bg-green-500/10'
    case 0x04: return 'text-purple-500  bg-purple-500/10'
    case 0x05: return 'text-red-500     bg-red-500/10'
    case 0x06: return 'text-rose-500    bg-rose-500/10'
    case 0x07: return 'text-teal-500    bg-teal-500/10'
    case 0x08: return 'text-orange-500  bg-orange-500/10'
    case 0x09: return 'text-amber-500   bg-amber-500/10'
    case 0x0a: return 'text-emerald-500 bg-emerald-500/10'
    case 0x0b: return 'text-sky-500     bg-sky-500/10'
    case 0x0c: return 'text-yellow-500  bg-yellow-500/10'
    case 0x0d: return 'text-violet-500  bg-violet-500/10'
    case 0x0e: return 'text-fuchsia-500 bg-fuchsia-500/10'
    case 0x0f: return 'text-pink-500    bg-pink-500/10'
    default:   return 'text-gray-500    bg-gray-500/10'
  }
}
