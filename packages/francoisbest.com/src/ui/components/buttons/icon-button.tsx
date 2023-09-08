import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Button, ButtonProps } from './button'

export type IconButtonProps = Omit<
  ButtonProps,
  'leftIcon' | 'rightIcon' | 'children' | 'loadingText' | 'spinnerPlacement'
> & {
  icon: React.ReactNode
  ['aria-label']: string
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  className,
  isLoading = false,
  ...props
}) => {
  return (
    <Button
      className={twMerge('rounded-full p-0', className)}
      isLoading={isLoading}
      spinnerPlacement="center"
      {...props}
    >
      {!isLoading && icon}
    </Button>
  )
}
