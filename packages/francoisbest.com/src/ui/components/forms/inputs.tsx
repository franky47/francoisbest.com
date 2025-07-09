import React from 'react'
import { twMerge } from 'tailwind-merge'
import { useFormControlContext } from './structure'

export type InputProps = React.ComponentProps<'input'> & {}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  const { name } = useFormControlContext()
  return (
    <input
      id={name}
      name={name}
      type="text"
      dir="auto"
      className={twMerge(
        `bg-light dark:bg-dark relative block h-10 w-full appearance-none rounded-sm border border-gray-200 px-4 dark:border-gray-800`,
        className
      )}
      {...props}
    />
  )
}

// --

export type NumberInputProps = InputProps & {}

export const NumberInput: React.FC<NumberInputProps> = ({
  className,
  ...props
}) => {
  return (
    <div className="relative flex">
      <Input
        type="number"
        inputMode="decimal"
        className={twMerge('', className)}
        {...props}
      />
    </div>
  )
}

// --

export type TextareaProps = React.ComponentProps<'textarea'> & {}

export const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => {
  const { name } = useFormControlContext()
  return (
    <textarea
      id={name}
      name={name}
      className={twMerge(
        `bg-light dark:bg-dark relative block w-full appearance-none rounded-sm border border-gray-200 px-2 py-1 dark:border-gray-800`,
        className
      )}
      {...props}
    />
  )
}
