import { Prisma } from '@prisma/client'
import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  Routes,
  useRouter,
} from 'blitz'
import SuperJson from 'superjson'

import { LoginPrompt } from 'app/core/components/LoginPrompt'
import { Redirect } from 'app/core/components/Redirect'
import { useSyncLoginPrompt } from 'app/core/stores/LoginPromptStore'
import 'app/core/styles/index.css'
import { useSyncShoppingCart } from 'app/shoppingCart/context/useShoppingCartStore'
import { useSyncWishlist } from 'app/wishlist/context/useWishlistStore'

SuperJson.registerClass(Prisma.Decimal, { identifier: 'DecimalJS' })

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  useSyncWishlist()
  useSyncShoppingCart()
  useSyncLoginPrompt()
  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      onReset={useQueryErrorResetBoundary().reset}
    >
      {getLayout(<Component {...pageProps} />)}
      <LoginPrompt />
    </ErrorBoundary>
  )
}

function RootErrorFallback({ error }: ErrorFallbackProps) {
  const { pathname, asPath } = useRouter()
  if (error instanceof AuthenticationError) {
    if (pathname === Routes.LoginPage().pathname) return null
    const params = new URLSearchParams({ next: asPath })
    return (
      <Redirect to={`${Routes.LoginPage().pathname}?${params.toString()}`} />
    )
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
