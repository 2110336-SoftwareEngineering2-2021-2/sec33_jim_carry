import { AuthenticationError, GetServerSideProps, Routes } from 'blitz'

export function wrapGetServerSideProps<P = {}>(
  func: GetServerSideProps<P>
): GetServerSideProps<P> {
  return async (context) => {
    try {
      return await func(context)
    } catch (e) {
      if (!(e instanceof AuthenticationError)) {
        throw e
      }
      const params = new URLSearchParams({ next: context.resolvedUrl })
      return {
        redirect: {
          destination: `${Routes.LoginPage().pathname}?${params.toString()}`,
          permanent: false,
        },
      }
    }
  }
}
