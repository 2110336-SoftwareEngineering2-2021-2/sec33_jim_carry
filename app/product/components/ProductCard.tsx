import { Image, Link, Routes } from 'blitz'
import { useCallback, useMemo } from 'react'
import { FiHeart, FiMessageCircle } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import { ProductWithShop } from 'app/core/types/Product'
import { useWishlistStore } from 'app/wishlist/context/useWishlistStore'

export function ProductCard({ product }: { product: ProductWithShop }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore()
  const like = useCallback(
    () => addToWishlist(product),
    [addToWishlist, product]
  )
  const unlike = useCallback(
    () => removeFromWishlist(product),
    [removeFromWishlist, product]
  )
  const liked = useMemo(
    () => !!wishlist.find((wish) => wish.id === product.id),
    [product, wishlist]
  )
  return (
    <div className="flex-col space-y-3">
      {/* Note: you can override to different aspect-ratio */}
      <Link href={Routes.ProductDetail({ pid: product.id })}>
        <div className="w-full relative aspect-video bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer">
          <Image
            src={product.image ?? ''}
            alt={product.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </Link>
      <div className="flex-col">
        <span className="font-bold text-regular">{product.name}</span>
        <div className="flex justify-between items-center">
          <span className="text-title3 font-sans text-primary-dark">{`฿${product.price}`}</span>
          <div className="flex">
            <Button iconOnly buttonType="transparent">
              <FiMessageCircle />
            </Button>
            <Button
              iconOnly
              buttonType="transparent"
              onClick={liked ? unlike : like}
            >
              <FiHeart className={liked ? 'fill-primary-base' : ''} />
            </Button>
          </div>
        </div>
        <span className="font-regular text-tiny text-ink-light">
          {`1h ago · by ${product.shop.name}`}
        </span>
      </div>
    </div>
  )
}
