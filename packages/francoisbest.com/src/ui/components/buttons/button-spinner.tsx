// Source:
// https://tailwind-elements.com/docs/standard/components/spinners/

import React from 'react'
import { twMerge } from 'tailwind-merge'

export const ButtonSpinner: React.FC<React.ComponentProps<'div'>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        'inline-block h-[1em] w-[1em] animate-spin rounded-full border-[0.15em] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
        className
      )}
      role="status"
      {...props}
    />
  )
}
