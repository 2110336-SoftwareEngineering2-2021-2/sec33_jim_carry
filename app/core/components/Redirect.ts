import { useRouter } from 'blitz'
import { NextRouter } from 'next/dist/client/router'
import { useEffect } from 'react'

type ReplaceParams = Parameters<NextRouter['replace']>

export interface RedirectProps {
  to: ReplaceParams[0]
  as?: ReplaceParams[1]
  options?: ReplaceParams[2]
}

export function Redirect({ to, as, options }: RedirectProps) {
  const router = useRouter()
  useEffect(() => {
    router.replace(to, as, options)
  }, [router, to, as, options])
  return null
}
