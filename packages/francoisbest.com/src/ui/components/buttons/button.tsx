// Inspired from Chakra-UI's buttons.
// Source:
// https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/theme/src/components/button.ts
// https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/button/src/button.tsx

import React from 'react'
import { twMerge } from 'tailwind-merge'
import { ButtonSpinner } from './button-spinner'

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link'
export type ButtonColor = 'gray' | 'green' | 'blue' | 'red'
export type ButtonProps = React.ComponentProps<'button'> & {
  size?: ButtonSize
  color?: ButtonColor
  variant?: ButtonVariant
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isLoading?: boolean
  spinnerPlacement?: 'start' | 'center' | 'end'
  loadingText?: string
  children?: React.ReactNode
}

export function Button({
  size = 'md',
  color = 'gray',
  variant = 'solid',
  leftIcon = null,
  rightIcon = null,
  isLoading = false,
  spinnerPlacement = 'start',
  loadingText,
  className,
  children,
  ...props
}: ButtonProps) {
  const sizeClass = sizeClasses[size]
  let colorClass = colorClasses[`${variant}_${color}` as const]
  if (variant === 'outline') {
    colorClass += colorClasses[`ghost_${color}`]
  }
  if (isLoading) {
    if (loadingText) {
      children = loadingText
    }
    if (spinnerPlacement === 'start') {
      leftIcon = <ButtonSpinner />
      rightIcon = null
    }
    if (spinnerPlacement === 'center') {
      leftIcon = null
      children = <ButtonSpinner />
      rightIcon = null
    }
    if (spinnerPlacement === 'end') {
      leftIcon = null
      rightIcon = <ButtonSpinner />
    }
  }
  return (
    <button
      className={twMerge(
        `
      appearance-none font-medium
      inline-flex justify-center items-center
      rounded
      leading-5
      transition-colors ease-out
      disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
      `,
        sizeClass,
        colorClass,
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {leftIcon && <ButtonIcon className="mr-2">{leftIcon}</ButtonIcon>}
      {children}
      {rightIcon && <ButtonIcon className="ml-2">{rightIcon}</ButtonIcon>}
    </button>
  )
}

const ButtonIcon: React.FC<React.ComponentProps<'span'>> = ({
  className,
  ...props
}) => (
  <span
    aria-hidden
    className={twMerge('inline-flex self-center shrink-0', className)}
    {...props}
  />
)

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'text-xs min-w-[1.5rem] h-6  px-2',
  sm: 'text-sm min-w-[2rem]   h-8  px-3',
  md: 'text-md min-w-[2.5rem] h-10 px-4',
  lg: 'text-lg min-w-[3rem]   h-12 px-6',
}

type ButtonStyle = `${ButtonVariant}_${ButtonColor}`

const colorClasses: Record<ButtonStyle, string> = {
  solid_gray: `
    bg-gray-100                   dark:bg-white/20
    text-gray-800                 dark:text-white/90
    hover:bg-gray-200             dark:hover:bg-white/30
    hover:disabled:bg-gray-100    dark:hover:disabled:bg-white/20
    active:bg-gray-300            dark:active:bg-white/40
  `,
  solid_blue: `
    bg-blue-500                   dark:bg-blue-200
    text-white                    dark:text-gray-800
    hover:bg-blue-600             dark:hover:bg-blue-300
    hover:disabled:bg-blue-500    dark:hover:disabled:bg-blue-200
    active:bg-blue-700            dark:active:bg-blue-400
  `,
  solid_green: `
    bg-emerald-500                dark:bg-emerald-200
    text-white                    dark:text-gray-800
    hover:bg-emerald-600          dark:hover:bg-emerald-300
    hover:disabled:bg-emerald-500 dark:hover:disabled:bg-emerald-200
    active:bg-emerald-700         dark:active:bg-emerald-400
  `,
  solid_red: `
    bg-red-500                    dark:bg-red-200
    text-white                    dark:text-gray-800
    hover:bg-red-600              dark:hover:bg-red-300
    hover:disabled:bg-red-500     dark:hover:disabled:bg-red-200
    active:bg-red-700             dark:active:bg-red-400
  `,
  // Note: slight deviation from the hover & active states in dark mode
  ghost_gray: `
    text-gray-800                 dark:text-white/90
    hover:bg-gray-100             dark:hover:bg-gray-800
    active:bg-gray-200            dark:active:bg-gray-700
  `,
  ghost_blue: `
    text-blue-600                 dark:text-blue-200
    bg-transparent
    hover:bg-blue-50              dark:hover:bg-blue-200/10
    active:bg-blue-100            dark:active:bg-blue-200/20
  `,
  ghost_green: `
    text-emerald-600              dark:text-emerald-200
    bg-transparent
    hover:bg-emerald-50           dark:hover:bg-emerald-200/10
    active:bg-emerald-100         dark:active:bg-emerald-200/20
  `,
  ghost_red: `
    text-red-600                  dark:text-red-200
    bg-transparent
    hover:bg-red-50               dark:hover:bg-red-200/10
    active:bg-red-100             dark:active:bg-red-200/20
  `,
  outline_gray: `
    border
    border-gray-200               dark:border-white/30
  `,
  outline_blue: `
    border
    border-current
  `,
  outline_green: `
    border
    border-current
  `,
  outline_red: `
    border
    border-current
  `,
  link_gray: `
    p-0 h-auto leading-normal align-baseline
    text-gray-500             dark:text-gray-200
    active:text-gray-700      dark:active:text-gray-500
    hover:underline
    hover:disabled:no-underline
  `,
  link_blue: `
    p-0 h-auto leading-normal align-baseline
    text-blue-500             dark:text-blue-200
    active:text-blue-700      dark:active:text-blue-500
    hover:underline
    hover:disabled:no-underline
  `,
  link_red: `
    p-0 h-auto leading-normal align-baseline
    text-red-500              dark:text-red-200
    active:text-red-700       dark:active:text-red-500
    hover:underline
    hover:disabled:no-underline
  `,
  link_green: `
    p-0 h-auto leading-normal align-baseline
    text-emerald-500          dark:text-emerald-200
    active:text-emerald-700   dark:active:text-emerald-500
    hover:underline
    hover:disabled:no-underline
  `,
}
