import React from 'react'
import { twMerge } from 'tailwind-merge'

export const WideContainer: React.FC<React.ComponentProps<'section'>> = ({
  className,
  ...props
}) => {
  return (
    <section
      className={twMerge(
        'mx-0 max-w-full p-0 md:max-w-none lg:-mx-16 lg:max-w-4xl',
        className
      )}
      {...props}
    />
  )
}
