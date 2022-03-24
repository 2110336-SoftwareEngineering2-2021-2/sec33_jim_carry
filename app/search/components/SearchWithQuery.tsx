import { Product } from '@prisma/client'
import { Suspense } from 'react'
import { FiArrowDown, FiArrowUp, FiSearch } from 'react-icons/fi'
import { createArrayBindingPattern } from 'typescript'

import { Button } from 'app/core/components/Button'
import { EmptyState } from 'app/core/components/EmptyState'
import { Spinner } from 'app/core/components/Spinner'
import { ProductWithShop } from 'app/core/types/Product'
import { ProductCard } from 'app/product/components/ProductCard'

export const SearchWithQuery = ({ products }) => {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        {products.length > 0 && (
          <div className="p-6 flex flex-col space-y-6">
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        )}
        {products.length == 0 && (
          <div className="mt-40">
            <EmptyState
              icon={<FiSearch strokeWidth={0.5} size={84} />}
              title={`No items found`}
              description={`Please try a different keyword.`}
            />
          </div>
        )}
      </Suspense>
    </div>
  )
}
