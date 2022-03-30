import { useQuery } from 'blitz'
import { Product } from 'db'

import getProducts from 'app/product/queries/getProducts'

import { ShopProductCard } from './ShopProductCard'

interface ShopProductsProps {
  shopId: number
}

export const ShopProducts = ({ shopId }: ShopProductsProps) => {
  const [{ products }] = useQuery(
    getProducts,
    { where: { shopId } },
    { suspense: true }
  )
  return (
    <div className="p-4 grid gap-3 grid-cols-2">
      {products.map((product) => (
        <ShopProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
