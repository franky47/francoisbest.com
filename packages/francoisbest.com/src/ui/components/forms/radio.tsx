import React from 'react'
import { twMerge } from 'tailwind-merge'
import { useFormControlContext } from './structure'

type RadioStateContext = {
  value: string
  onChange: (value: string) => void
}

export type RadioGroupProps = React.ComponentProps<'fieldset'> &
  RadioStateContext & {
    children: React.ReactNode
  }

const RadioStateContext = React.createContext<RadioStateContext>({
  value: '',
  onChange: () => {}
})

export const RadioGroup: React.FC<RadioGroupProps> = ({
  className,
  children,
  onChange,
  value,
  ...props
}) => {
  return (
    <fieldset className={twMerge('', className)} {...props}>
      <RadioStateContext.Provider value={{ value, onChange }}>
        {children}
      </RadioStateContext.Provider>
    </fieldset>
  )
}

// --

export type RadioProps = React.ComponentProps<'input'> & {
  children: React.ReactNode
  value: string
}

export const Radio: React.FC<RadioProps> = ({
  className,
  children,
  value: thisValue,
  ...props
}) => {
  const { name } = useFormControlContext()
  const { value: currentValue, onChange: onCheck } =
    React.useContext(RadioStateContext)
  return (
    <div className={twMerge('flex items-center gap-2', className)}>
      <input
        type="radio"
        id={thisValue}
        name={name}
        value={thisValue}
        checked={currentValue === thisValue}
        onChange={e => {
          if (e.target.checked) {
            onCheck(thisValue)
          }
        }}
        {...props}
      />
      <label htmlFor={thisValue}>{children}</label>
    </div>
  )
}
