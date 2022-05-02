import { AuthenticationError, GetServerSideProps, Routes } from 'blitz'

import { RedirectableErorr } from './RedirectableError'

export function wrapGetServerSideProps<P = {}>(
  func: GetServerSideProps<P>
): GetServerSideProps<P> {
  return async (context) => {
    try {
      return await func(context)
    } catch (e) {
      if (e instanceof AuthenticationError) {
        const params = new URLSearchParams({ next: context.resolvedUrl })
        return {
          redirect: {
            destination: `${Routes.LoginPage().pathname}?${params.toString()}`,
            permanent: false,
          },
        }
      }
      if (e instanceof RedirectableErorr) {
        return {
          redirect: e.redirectTo,
        }
      }
      throw e
    }
  }
}
