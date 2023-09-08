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
        'appearance-none block w-full h-1 my-2 cursor-pointer border-transparent',
        className
      )}
      onInput={e => onChange(e.currentTarget.valueAsNumber)}
      {...props}
    />
  )
}
