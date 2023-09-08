import React from 'react'
import { twMerge } from 'tailwind-merge'

export const Stat: React.FC<React.ComponentProps<'dl'>> = ({
  className,
  ...props
}) => {
  return <dl className={twMerge('me-auto', className)} {...props} />
}

export const StatLabel: React.FC<React.ComponentProps<'dt'>> = ({
  className,
  ...props
}) => <dt className={twMerge('font-medium text-sm', className)} {...props} />

export const StatNumber: React.FC<React.ComponentProps<'dd'>> = ({
  className,
  ...props
}) => <dd className={twMerge('text-2xl font-semibold', className)} {...props} />

export const StatHelpText: React.FC<React.ComponentProps<'dd'>> = ({
  className,
  ...props
}) => <dd className={twMerge('text-sm text-gray-500', className)} {...props} />
