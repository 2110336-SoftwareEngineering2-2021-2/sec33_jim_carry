import { BlitzPage } from 'blitz'
import { Suspense, useMemo, useState } from 'react'
import { FiHeart } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import {
  SegmentedControl,
  SegmentedControlItem,
} from 'app/core/components/SegmentedControl'
import { Spinner } from 'app/core/components/Spinner'
import { MainPageLayout } from 'app/core/layouts/MainPageLayout'
import { ProductWithShop } from 'app/core/types/Product'
import { useWishlistStore } from 'app/wishlist/context/useWishlistStore'

import { WishProduct } from '../components/WishProduct'

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
  const [value, setValue] = useState('all')
  const { available, sold } = useMemo(() => {
    const sold = wishlist.filter((product) => product.soldPrice !== null)
    const available = wishlist.filter((product) => product.soldPrice === null)
    return { available, sold }
  }, [wishlist])
  const products =
    value === 'all' ? wishlist : value === 'sold out' ? sold : available

  return (
    <div>
      <div className="p-6 pb-2">
        <SegmentedControl
          value={value}
          onChange={(newValue) => setValue(newValue)}
        >
          <SegmentedControlItem value="all">{`All (${wishlist.length})`}</SegmentedControlItem>
          <SegmentedControlItem value="available">
            {`Available (${available.length})`}
          </SegmentedControlItem>
          <SegmentedControlItem value="sold out">{`Sold Out (${sold.length})`}</SegmentedControlItem>
        </SegmentedControl>
      </div>
      <ProductList products={products} value={value} />
    </div>
  )
}

const ProductList = ({
  products,
  value,
}: {
  products: ProductWithShop[]
  value: string
}) => {
  const clearSoldOutWishlist = useWishlistStore(
    (state) => state.clearSoldOutWishlist
  )
  if (products.length === 0) {
    return (
      <div className="flex flex-col py-40 px-6 space-y-3 text-center items-center">
        <FiHeart strokeWidth={0.5} size={84} />
        <span className="text-ink-base">
          {`There are no ${
            value === 'all' ? '' : `${value} `
          }items in your wishlist.`}
        </span>
        <span className="text-ink-base font-regular text-small">
          When you find something you like, <br />
          don’t forget to add it here!
        </span>
      </div>
    )
  }
  return (
    <div className="flex flex-col p-6 space-y-6">
      {products.map((product) => (
        <WishProduct key={product.id} product={product} />
      ))}
      {value === 'sold out' && (
        <Button buttonType="secondary" fullWidth onClick={clearSoldOutWishlist}>
          Clear Items
        </Button>
      )}
    </div>
  )
}

Wishlist.getLayout = (page) => (
  <MainPageLayout title="Wishlist">{page}</MainPageLayout>
)

export default Wishlist
