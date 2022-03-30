import { Product } from 'db'

import { ShopProductCard } from './ShopProductCard'

interface ShopProductsProps {
  products: Product[]
}

export const ShopProducts = ({ products }: ShopProductsProps) => {
  return (
    <div className="p-4 grid gap-3 grid-cols-2">
      {products.map((product) => (
        <ShopProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
