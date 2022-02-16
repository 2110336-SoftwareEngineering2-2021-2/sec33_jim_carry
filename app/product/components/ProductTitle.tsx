import { useCallback, useMemo } from 'react'
import { FiHeart } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import { ProductWithShop } from 'app/core/types/Product'
import { useWishlistStore } from 'app/wishlist/context/useWishlistStore'

export interface ProductTitleProps {
  product: ProductWithShop
}

export function ProductTitle({ product }: ProductTitleProps) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore()
  const wish = useCallback(
    () => addToWishlist(product),
    [addToWishlist, product]
  )
  const unwish = useCallback(
    () => removeFromWishlist(product),
    [removeFromWishlist, product]
  )
  const isWish = useMemo(
    () => !!wishlist.find((wish) => wish.id === product.id),
    [product, wishlist]
  )
  return (
    <div className="flex flex-col pt-4 pb-2 px-6">
      <p className="text-large leading-normal font-bold">{product.name}</p>
      <div className="flex flex-row justify-between items-center mt-2">
        <p className="text-large leading-normal font-medium text-primary-dark">
          {'฿' + product.price}
        </p>
        <Button
          buttonType="transparent"
          size="small"
          iconOnly
          onClick={isWish ? unwish : wish}
        >
          <FiHeart className={isWish ? 'fill-primary-base' : ''} />
        </Button>
      </div>
    </div>
  )
}
