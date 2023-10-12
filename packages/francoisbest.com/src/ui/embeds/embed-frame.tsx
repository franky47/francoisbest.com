import { twMerge } from 'tailwind-merge'

export type EmbedFrameProps = React.ComponentProps<'section'> & {
  Icon: React.ComponentType
  children: React.ReactNode
  iconFill?: boolean
  isError?: boolean
}

export const EmbedFrame: React.FC<EmbedFrameProps> = ({
  Icon,
  children,
  className,
  iconFill = false,
  isError = false,
  ...props
}) => {
  return (
    <section
      className={twMerge(
        'relative rounded border px-4 py-3 shadow-md',
        isError
          ? 'border-red-400 bg-red-50/50 dark:border-red-800 dark:bg-red-950/50'
          : 'bg-bgLight dark:border-gray-800 dark:bg-gray-900 dark:shadow-inner',
        className
      )}
      {...props}
    >
      {children}
      <Icon
        // @ts-ignore
        role="presentation"
        aria-hidden
        className={twMerge(
          'absolute -top-1 right-2 !my-0',
          iconFill
            ? isError
              ? 'fill-red-500'
              : 'fill-gray-400 dark:fill-gray-500'
            : isError
            ? 'fill-red-50/50 stroke-red-500 dark:fill-red-950/50'
            : 'fill-white stroke-gray-500 dark:fill-gray-900/50'
        )}
      />
    </section>
  )
}
