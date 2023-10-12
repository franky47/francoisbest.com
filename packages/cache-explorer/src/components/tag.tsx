import React from 'react'
import { colors } from '../theme'

export type TagProps = React.ComponentProps<'span'> & {
  children: string
  fixedHash?: number
}

export const Tag: React.FC<TagProps> = ({
  children,
  fixedHash,
  style,
  ...props
}) => {
  const tag = String(children)
  const color = tag.startsWith('/')
    ? colors.gray[500]
    : getColors(tag, fixedHash)
  return (
    <span
      aria-role="tag"
      style={{
        padding: '0.125rem 0.5rem',
        fontFamily: 'monospace',
        position: 'relative',
        color,
        ...style,
      }}
      {...props}
    >
      <span
        aria-hidden
        style={{
          background: color,
          opacity: 0.1,
          position: 'absolute',
          inset: 0,
          borderRadius: '9999px',
        }}
      />
      {tag}
    </span>
  )
}

function getColors(input: string, fixedHash?: number) {
  // Digest the input string into a 4-bit integer.
  let hash = 0x2
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i) & 0xf
    hash ^= (input.charCodeAt(i) >> 4) & 0xf
  }
  // prettier-ignore
  switch (fixedHash ?? hash) {
    case 0x00: return colors.indigo[500]
    case 0x01: return colors.blue[500]
    case 0x02: return colors.cyan[500]
    case 0x03: return colors.green[500]
    case 0x04: return colors.purple[500]
    case 0x05: return colors.red[500]
    case 0x06: return colors.rose[500]
    case 0x07: return colors.teal[500]
    case 0x08: return colors.orange[500]
    case 0x09: return colors.amber[500]
    case 0x0a: return colors.emerald[500]
    case 0x0b: return colors.sky[500]
    case 0x0c: return colors.yellow[500]
    case 0x0d: return colors.violet[500]
    case 0x0e: return colors.fuchsia[500]
    case 0x0f: return colors.pink[500]
    default:   return colors.gray[500]
  }
}
