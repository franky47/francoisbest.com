// Source:
// https://stackoverflow.com/questions/55393226/disable-hydration-only-partially-hydrate-a-next-js-app

import React from 'react'

function useStaticContent() {
  const ref = React.useRef<any>(null)
  const [render, setRender] = React.useState(typeof window === 'undefined')

  React.useEffect(() => {
    // check if the innerHTML is empty as client side navigation
    // need to render the component without server-side backup
    const isEmpty = ref.current.innerHTML === ''
    if (isEmpty) {
      setRender(true)
    }
  }, [])

  return [render, ref]
}

export interface StaticContentProps {
  as?: keyof React.ReactHTML
}

export const StaticContent: React.FC<StaticContentProps> = ({
  children,
  as = 'div',
  ...props
}) => {
  const [render, ref] = useStaticContent()

  // if we're in the server or a spa navigation, just render it
  if (render) {
    return React.createElement(as, {
      ...props,
      children
    })
  }

  // avoid re-render on the client
  return React.createElement(as, {
    ...props,
    ref,
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: { __html: '' }
  })
}
