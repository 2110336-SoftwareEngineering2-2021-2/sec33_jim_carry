import { useQuery } from 'blitz'
import { Product } from 'db'
import { FiGrid } from 'react-icons/fi'

import { EmptyState } from 'app/core/components/EmptyState'
import getProducts from 'app/product/queries/getProducts'

import { ShopProductCard } from './ShopProductCard'

interface ShopProductsProps {
  shopId: number
}

export const ShopProducts = ({ shopId }: ShopProductsProps) => {
  const [{ products }] = useQuery(getProducts, { where: { shopId } })
  if (products.length === 0)
    return (
      <EmptyState
        icon={<FiGrid strokeWidth={0.5} size={84} />}
        title={`There are products in this shop (yet!)`}
        description={<>Check back later for new products!</>}
      />
    )
  return (
    <div className="p-4 grid gap-3 grid-cols-2">
      {products.map((product) => (
        <ShopProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
