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
  Script,
} from 'blitz'
import SuperJson from 'superjson'
import { z } from 'zod'

import { useSyncChat } from 'app/chat/context/useChatStore'
import { ObservationProvider } from 'app/chat/realtime/client/ObservationManager'
import { SocketProvider } from 'app/chat/realtime/client/SocketProvider'
import { LoginPrompt } from 'app/core/components/LoginPrompt'
import { Redirect } from 'app/core/components/Redirect'
import { useSyncLoginPrompt } from 'app/core/stores/LoginPromptStore'
import 'app/core/styles/index.css'
import { useSyncShoppingCart } from 'app/shoppingCart/context/useShoppingCartStore'
import { useSyncWishlist } from 'app/wishlist/context/useWishlistStore'

SuperJson.registerClass(Prisma.Decimal, { identifier: 'DecimalJS' })
SuperJson.registerCustom<z.ZodError, any[]>(
  {
    isApplicable: (e): e is z.ZodError => e instanceof z.ZodError,
    serialize: (e) => e.issues,
    deserialize: (issues) => new z.ZodError(issues),
  },
  'ZodError'
)

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  useSyncWishlist()
  useSyncShoppingCart()
  useSyncLoginPrompt()
  useSyncChat()
  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      onReset={useQueryErrorResetBoundary().reset}
    >
      <SocketProvider>
        <ObservationProvider>
          {getLayout(<Component {...pageProps} />)}
        </ObservationProvider>
      </SocketProvider>
      <LoginPrompt />
      <Script src="https://cdn.omise.co/omise.js" />
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
