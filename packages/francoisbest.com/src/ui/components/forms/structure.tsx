import React from 'react'
import { twMerge } from 'tailwind-merge'

type FormControlContext = {
  name?: string
}

export type FormControlProps = React.ComponentProps<'div'> &
  FormControlContext & {
    children: React.ReactNode
  }

const FormControlContext = React.createContext<FormControlContext>({})

export function useFormControlContext() {
  return React.useContext(FormControlContext)
}

export const FormControl: React.FC<FormControlProps> = ({
  name,
  children,
  ...props
}) => (
  <div {...props}>
    <FormControlContext.Provider value={{ name }}>
      {children}
    </FormControlContext.Provider>
  </div>
)

export const FormLabel: React.FC<React.ComponentProps<'label'>> = ({
  className,
  ...props
}) => {
  const { name } = useFormControlContext()
  return (
    <label
      htmlFor={name}
      className={twMerge('mb-1 block font-semibold', className)}
      {...props}
    />
  )
}

export const FormHelperText: React.FC<React.ComponentProps<'div'>> = ({
  className,
  ...props
}) => (
  <div
    className={twMerge('mt-1 text-sm text-gray-500', className)}
    {...props}
  />
)
