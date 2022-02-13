import { BlitzPage } from 'blitz'
import { Suspense } from 'react'

import { Spinner } from 'app/core/components/Spinner'
import {
  useWishlistContext,
  useWishlistStore,
} from 'app/core/context/useWishlistStore'
import { MainPageLayout } from 'app/core/layouts/MainPageLayout'

const Wishlist: BlitzPage = () => {
  return (
    <main>
      <Suspense fallback={<Spinner />}>
        <WishProducts />
      </Suspense>
    </main>
  )
}
const WishProducts = () => {
  const wishlist = useWishlistStore((state) => state.wishlist)
  return (
    <ul>
      {wishlist.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  )
}

Wishlist.getLayout = (page) => (
  <MainPageLayout title="Wishlist">{page}</MainPageLayout>
)

export default Wishlist
