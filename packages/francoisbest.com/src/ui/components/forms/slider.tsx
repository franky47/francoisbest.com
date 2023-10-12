import React from 'react'
import { twMerge } from 'tailwind-merge'

export type SliderProps = Omit<React.ComponentProps<'input'>, 'onChange'> & {
  onChange: (value: number) => void
}

export const Slider: React.FC<SliderProps> = ({
  className,
  onChange,
  ...props
}) => {
  return (
    <input
      type="range"
      className={twMerge(
        'my-2 block h-1 w-full cursor-pointer appearance-none border-transparent',
        className
      )}
      onInput={e => onChange(e.currentTarget.valueAsNumber)}
      {...props}
    />
  )
}
