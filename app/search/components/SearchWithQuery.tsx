import { Suspense } from 'react'

import { Button } from 'app/core/components/Button'
import { Spinner } from 'app/core/components/Spinner'
import { ProductCard } from 'app/product/components/ProductCard'

// this has some problem
// export interface SearchWithQueryProps {
//   order: string
//   setOrder: (order:string) => void
//   products: Product[]
// }
export const SearchWithQuery = ({ order, setOrder, products }) => {
  return (
    <div>
      <div className="flex flex-row">
        {order === 'name' && <Button buttonType="transparent">Name</Button>}
        {order !== 'name' && (
          <button
            className="px-8 text-ink-light"
            onClick={(e) => setOrder('name')}
          >
            Name
          </button>
        )}
        {order === 'createdAt' && (
          <Button buttonType="transparent"> Date </Button>
        )}
        {order !== 'createdAt' && (
          <button
            className="px-8 text-ink-light"
            onClick={(e) => setOrder('createdAt')}
          >
            Date
          </button>
        )}
        {order === 'price' && <Button buttonType="transparent"> Price </Button>}
        {order !== 'price' && (
          <button
            className="px-8 text-ink-light"
            onClick={(e) => setOrder('price')}
          >
            Price
          </button>
        )}
        {order === 'rating' && <Button buttonType="transparent">Rating</Button>}
        {order !== 'rating' && (
          <button
            className="px-8 text-ink-light"
            onClick={(e) => setOrder('rating')}
          >
            Rating
          </button>
        )}
      </div>

      <Suspense fallback={<Spinner />}>
        <div className="p-6 flex flex-col space-y-6">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </Suspense>
    </div>
  )
}
