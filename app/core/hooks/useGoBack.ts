import { useRouter } from 'blitz'
import { useCallback } from 'react'

export function useGoBack(href?: string) {
  const router = useRouter()

  const goBack = useCallback(() => {
    router.events.on('routeChangeStart', resetTimeout)
    router.back()

    const timeout = setTimeout(() => {
      router.push(href ?? '/')
    }, 10)

    function resetTimeout() {
      router.events.off('routeChangeStart', resetTimeout)
      clearTimeout(timeout)
    }
  }, [router, href])

  return goBack
}
