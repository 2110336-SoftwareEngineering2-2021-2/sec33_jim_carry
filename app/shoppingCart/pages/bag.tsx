import { BlitzPage, Routes } from 'blitz'
import { FiShoppingBag } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import { EmptyState } from 'app/core/components/EmptyState'
import { TopBar } from 'app/core/components/TopBar'
import { ProductWithShop } from 'app/core/types/Product'
import { setupLayout } from 'app/core/utils/setupLayout'

import { BagProduct } from '../components/BagProduct'
import { useShoppingCartStore } from '../context/useShoppingCartStore'

const ShoppingCart: BlitzPage = () => {
  const shoppingCart = useShoppingCartStore((state) => state.shoppingCart)
  return (
    <div>
      <TopBar
        backHref={Routes.AddressesPage().pathname}
        title="Bag"
        largeTitle
      />
      <ProductList products={shoppingCart} />
      <TotalFooter products={shoppingCart} />
    </div>
  )
}

function ProductList({ products }: { products: ProductWithShop[] }) {
  if (products.length === 0) {
    return (
      <EmptyState
        icon={<FiShoppingBag strokeWidth={0.5} size={84} />}
        title="There are no items in your bag."
        description={
          <>
            Start browsing now to discover our
            <br />
            high-quality second hand goods!
          </>
        }
      />
    )
  }
  return (
    <div className="flex flex-col p-6 space-y-4">
      {products.map((product) => (
        <BagProduct key={product.id} product={product} />
      ))}
    </div>
  )
}

function TotalFooter({ products }: { products: ProductWithShop[] }) {
  if (products.length === 0) {
    return null
  }
  const total = products.reduce(
    (current, product) => current + Number(product.price),
    0
  )
  return (
    <div className="flex flex-col px-6 py-5 space-y-4 sticky bottom-0 bg-sky-white border-t border-y-sky-light">
      <div className="flex flex-row justify-between text-large font-bold">
        <span>Subtotal</span>
        <span>{`฿${total}`}</span>
      </div>
      <Button fullWidth>Checkout</Button>
    </div>
  )
}

setupLayout(ShoppingCart)

export default ShoppingCart
