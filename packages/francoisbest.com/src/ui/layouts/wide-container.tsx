import React from 'react'
import { twMerge } from 'tailwind-merge'

export const WideContainer: React.FC<React.ComponentProps<'section'>> = ({
  className,
  ...props
}) => {
  return (
    <section
      className={twMerge(
        'mx-0 lg:-mx-16 p-0 max-w-full md:max-w-none lg:max-w-4xl',
        className
      )}
      {...props}
    />
  )
}
