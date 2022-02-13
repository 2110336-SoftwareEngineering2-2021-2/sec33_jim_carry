import { Product } from '@prisma/client'
import { Image, Link, Routes } from 'blitz'
import { useCallback, useMemo } from 'react'
import { FiMessageCircle } from 'react-icons/fi'
import { RiHeartFill, RiHeartLine } from 'react-icons/ri'

import { Button } from 'app/core/components/Button'
import { useWishlistStore } from 'app/core/context/useWishlistStore'

export function ProductCard({ product }: { product: Product }) {
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
    () => wishlist.map((wish) => wish.id).includes(product.id),
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
        <span className="bold">{product.name}</span>
        <div className="flex justify-between items-center">
          <span className="title3 font-sans text-primary-dark">{`฿${product.price}`}</span>
          <div className="flex">
            <Button iconOnly buttonType="transparent">
              <FiMessageCircle />
            </Button>
            <Button
              iconOnly
              buttonType="transparent"
              onClick={liked ? unlike : like}
            >
              {liked ? <RiHeartFill /> : <RiHeartLine />}
            </Button>
          </div>
        </div>
        <span className="font-regular text-tiny text-ink-light">
          {/* {`1h ago · by ${product.shop.name}`} */}
        </span>
      </div>
    </div>
  )
}
