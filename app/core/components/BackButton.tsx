import { PropsWithChildren } from 'react'

import { useGoBack } from '../hooks/useGoBack'

export type BackButtonProps = PropsWithChildren<{
  className?: string
  href?: string
}>

export function BackButton({ className, href, children }: BackButtonProps) {
  const goBack = useGoBack(href)

  return (
    <button className={className} onClick={goBack}>
      {children}
    </button>
  )
}
