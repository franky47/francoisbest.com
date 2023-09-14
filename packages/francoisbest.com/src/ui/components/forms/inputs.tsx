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
        `appearance-none block w-full px-4 h-10 rounded border relative bg-bgLight dark:bg-bgDark`,
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
    <div className="flex relative">
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
        `appearance-none block w-full px-2 py-1 rounded border relative bg-bgLight dark:bg-bgDark`,
        className
      )}
      {...props}
    />
  )
}
