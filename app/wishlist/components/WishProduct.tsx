import { Image, Link, Routes } from 'blitz'
import { FiCheck, FiShoppingBag, FiTrash2 } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import { ProductWithShop } from 'app/core/types/Product'
import { useWishlistStore } from 'app/wishlist/context/useWishlistStore'

export function WishProduct({ product }: { product: ProductWithShop }) {
  const inBag = false
  const sold = product.soldPrice !== null
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  )
  const remove = () => removeFromWishlist(product)
  return (
    <div className="flex space-x-4">
      <Link href={Routes.ProductDetail({ pid: product.id })}>
        <div className="relative aspect-square bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer">
          <Image
            src={product.image ?? ''}
            alt={product.name}
            width={64}
            height={64}
            objectFit="cover"
          />
        </div>
      </Link>
      <div className="flex flex-col space-y-2">
        <span className="text-small font-sans font-bold">{product.name}</span>
        <span className="text-tiny text-ink-light font-sans font-regular">{`฿ ${product.price} · by ${product.shop.name}`}</span>
        <div className="flex space-x-4">
          <Button
            buttonType={inBag && !sold ? 'outline' : 'primary'}
            size="small"
            sideIcon={inBag ? <FiCheck /> : <FiShoppingBag />}
            disabled={sold}
          >
            {sold ? 'Sold' : inBag ? 'In Bag' : 'Add to Bag'}
          </Button>
          <Button buttonType="secondary" size="small" iconOnly onClick={remove}>
            <FiTrash2 />
          </Button>
        </div>
      </div>
    </div>
  )
}
