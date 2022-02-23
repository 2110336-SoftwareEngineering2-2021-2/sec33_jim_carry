import { useRouter } from 'blitz'
import { useCallback } from 'react'

export function useGoBack(href?: string) {
  const router = useRouter()

  const goBack = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      router.events.on('routeChangeStart', resetTimeout)
      router.events.on('routeChangeComplete', onComplete)
      router.events.on('routeChangeError', onError)
      router.back()

      const timeout = setTimeout(() => {
        router.push(href ?? '/')
      }, 10)

      function resetTimeout() {
        router.events.off('routeChangeStart', resetTimeout)
        clearTimeout(timeout)
      }

      function onComplete() {
        router.events.off('routeChangeComplete', onComplete)
        router.events.off('routeChangeError', onError)
        resolve()
      }

      function onError() {
        router.events.off('routeChangeComplete', onComplete)
        router.events.off('routeChangeError', onError)
        reject()
      }
    })
  }, [router, href])

  return goBack
}
