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
        `bg-bgLight dark:bg-bgDark relative block h-10 w-full appearance-none rounded border px-4`,
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
        `bg-bgLight dark:bg-bgDark relative block w-full appearance-none rounded border px-2 py-1`,
        className
      )}
      {...props}
    />
  )
}
