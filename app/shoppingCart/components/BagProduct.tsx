import { Image, Link, Routes } from 'blitz'
import { FiTrash2 } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import { ProductWithShop } from 'app/core/types/Product'
import { isProductSoldOut } from 'app/core/utils/isProductSoldOut'

import { useShoppingCartStore } from '../context/useShoppingCartStore'

export function BagProduct({ product }: { product: ProductWithShop }) {
  const removeFromShoppingCart = useShoppingCartStore(
    (state) => state.removeFromShoppingCart
  )
  const remove = () => removeFromShoppingCart(product)
  return (
    <div className="flex space-x-4">
      <Link href={Routes.ProductDetail({ pid: product.id })}>
        <div className="relative aspect-square cursor-pointer">
          <Image
            src={product.images[0] ?? ''}
            alt={product.name}
            width={64}
            height={64}
            objectFit="cover"
          />
        </div>
      </Link>
      <div className="flex-1 flex flex-row space-x-4">
        <div className="flex-1 flex flex-col space-y-1.5">
          <span className="text-small font-sans font-bold">{product.name}</span>
          <Link
            href={Routes.ShopProfilePage({ shopId: product.shopId })}
            passHref
          >
            <a className="text-tiny text-ink-light font-sans font-regular">
              {product.shop.name}
            </a>
          </Link>
          <span
            className={`text-large ${
              !isProductSoldOut(product) ? 'text-primary-dark' : 'text-sky-dark'
            }`}
          >
            {`฿${product.price}`}
          </span>
        </div>
        <Button buttonType="transparent" size="small" iconOnly onClick={remove}>
          <FiTrash2 />
        </Button>
      </div>
    </div>
  )
}
