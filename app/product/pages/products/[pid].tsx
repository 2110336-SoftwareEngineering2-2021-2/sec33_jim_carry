import { BlitzPage, useParam } from 'blitz'
import { Suspense } from 'react'
import { FiShoppingBag } from 'react-icons/fi'

import { TopBar } from 'app/core/components/TopBar'
import { TopBarAction } from 'app/core/components/TopBarAction'
import { useProduct } from 'app/core/hooks/useProduct'
import { setupLayout } from 'app/core/utils/setupLayout'
import { ProductView } from 'app/product/components/ProductView'
import { useWishlistStore } from 'app/wishlist/context/useWishlistStore'

const ProductDetail: BlitzPage = () => {
  const param = useParam('pid')
  let pid: number = 0
  if (typeof param == 'string') {
    pid = parseInt(param)
  }

  // const product = useProduct(pid)
  // const wishlist = useWishlistStore((state) => state.wishlist)
  // if (!product) return null
  // const isWish = wishlist.map((wish) => wish.id).includes(product.id)
  return (
    <div>
      <TopBar
        actions={
          <TopBarAction>
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
