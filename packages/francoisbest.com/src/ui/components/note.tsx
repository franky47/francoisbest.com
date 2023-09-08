import {
  FiAlertCircle,
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
  FiPaperclip,
} from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'

type NoteStatus = 'default' | 'info' | 'success' | 'warning' | 'error'
type NoteConfig = {
  colors: string
  stroke: string
  icon: any
}

const noteConfigs: Record<NoteStatus, NoteConfig> = {
  default: {
    colors:
      'border-l-gray-400 bg-gray-50 dark:border-l-gray-600 dark:bg-gray-800',
    stroke: 'stroke-gray-500',
    icon: FiPaperclip,
  },
  info: {
    colors:
      'border-l-blue-500 bg-sky-50 text-blue-950 dark:bg-sky-950 dark:text-blue-100',
    stroke: 'stroke-blue-500',
    icon: FiInfo,
  },
  success: {
    colors:
      'border-l-green-500 bg-green-50 text-green-950 dark:bg-green-950/30 dark:text-green-100',
    stroke: 'stroke-green-500',
    icon: FiCheckCircle,
  },
  warning: {
    colors:
      'border-l-amber-500 bg-amber-50 text-amber-950 dark:bg-amber-950 dark:text-amber-100',
    stroke: 'stroke-amber-500',
    icon: FiAlertTriangle,
  },
  error: {
    colors:
      'border-l-red-500 bg-red-50 text-red-950 dark:bg-red-950 dark:text-red-100',
    stroke: 'stroke-red-500',
    icon: FiAlertCircle,
  },
}

// --

export type NoteProps = React.ComponentProps<'aside'> & {
  status?: NoteStatus
  title?: string
  icon?: any
  children: React.ReactNode
  titleClass?: string
  outerClass?: string
  innerClass?: string
}

export const Note: React.FC<NoteProps> = ({
  status = 'default',
  title = 'Note',
  icon,
  children,
  titleClass = '',
  outerClass = '',
  innerClass = '',
  ...props
}) => {
  const { colors, stroke, icon: defaultIcon } = noteConfigs[status]
  const Icon = icon ?? defaultIcon
  return (
    <aside
      role="note"
      aria-details={status}
      className={twMerge(
        '-mx-2 my-6 rounded-sm border-l-4 bg-opacity-50 dark:bg-opacity-40 px-4 pt-3 pb-4 md:mx-0',
        colors,
        outerClass
      )}
      {...props}
    >
      <p className="not-prose !my-1 text-lg leading-snug">
        <Icon
          className={`-mt-1 mr-1 inline-block ${stroke}`}
          role="presentation"
          aria-hidden
        />{' '}
        <span className={twMerge('font-semibold', titleClass)}>{title}</span>
      </p>
      <div className={twMerge('!prose-base text-current', innerClass)}>
        {children}
      </div>
    </aside>
  )
}
