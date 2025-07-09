import { twMerge } from 'tailwind-merge'
import { ThemeControls } from './theme-controls'

export type BrowserWindowFrameProps = React.ComponentProps<'figure'> & {
  url: string
  children: React.ReactNode
}

export const BrowserWindowFrame: React.FC<BrowserWindowFrameProps> = ({
  className,
  children,
  url,
  ...props
}) => {
  const { protocol, host, pathname } = new URL(url)
  return (
    <figure
      className={twMerge(
        'not-prose overflow-hidden rounded-lg shadow-2xl',
        className
      )}
      {...props}
    >
      <header className="flex items-center bg-gray-200 py-2 dark:bg-gray-800">
        <nav className="mx-4 flex space-x-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
        </nav>
        <span className="flex-1 rounded-sm bg-gray-100 px-2 py-0.5 text-sm text-gray-500 dark:bg-gray-900">
          {protocol + '//'}
          <span className="text-gray-900 dark:text-gray-300">{host}</span>
          {pathname === '/' ? null : pathname}
        </span>
        <ThemeControls size="sm" className="-my-2 mx-1.5" />
      </header>
      {children}
    </figure>
  )
}
