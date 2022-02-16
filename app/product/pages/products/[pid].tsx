import { BlitzPage, useParam, Routes, useRouter } from 'blitz'
import { Suspense } from 'react'
import { FiShoppingBag } from 'react-icons/fi'

import { TopBar } from 'app/core/components/TopBar'
import { TopBarAction } from 'app/core/components/TopBarAction'
import { useProduct } from 'app/core/hooks/useProduct'
import { setupLayout } from 'app/core/utils/setupLayout'
import { ProductView } from 'app/product/components/ProductView'
import { useShoppingCartStore } from 'app/shoppingCart/context/useShoppingCartStore'
import { useWishlistStore } from 'app/wishlist/context/useWishlistStore'

const ProductDetail: BlitzPage = () => {
  const param = useParam('pid')
  let pid: number = 0
  if (typeof param == 'string') {
    pid = parseInt(param)
  }
  const shoppingCart = useShoppingCartStore((state) => state.shoppingCart)
  const count = shoppingCart.length
  const router = useRouter()
  // const product = useProduct(pid)
  // const wishlist = useWishlistStore((state) => state.wishlist)
  // if (!product) return null
  // const isWish = wishlist.map((wish) => wish.id).includes(product.id)
  return (
    <div>
      <TopBar
        actions={
          <TopBarAction
            onClick={() => router.push(Routes.ShoppingCart())}
            className="relative inline-block"
          >
            {!!count && (
              <span
                className="absolute top-0 right-0 px-1.5 py-0.5
                   text-tiny text-sky-white bg-error rounded-full"
              >
                {count}
              </span>
            )}
            <FiShoppingBag />
          </TopBarAction>
        }
      />
      <Suspense fallback={null}>
        <ProductView pid={pid} />
      </Suspense>
    </div>
  )
}

setupLayout(ProductDetail)

export default ProductDetail
