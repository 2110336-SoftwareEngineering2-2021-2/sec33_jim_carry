import { Prisma } from '@prisma/client'
import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from 'blitz'
import SuperJson from 'superjson'

import LoginPage from 'app/auth/pages/login'
import 'app/core/styles/index.css'
import { useSyncWishlist } from 'app/wishlist/context/useWishlistStore'

SuperJson.registerClass(Prisma.Decimal, { identifier: 'DecimalJS' })

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  useSyncWishlist()
  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      onReset={useQueryErrorResetBoundary().reset}
    >
      {getLayout(<Component {...pageProps} />)}
    </ErrorBoundary>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginPage />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={error.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}
