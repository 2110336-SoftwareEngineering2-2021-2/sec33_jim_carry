import { useCallback, useMemo } from 'react'
import { FiCheck, FiMessageCircle, FiShoppingBag } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import { ProductWithShop } from 'app/core/types/Product'
import { useShoppingCartStore } from 'app/shoppingCart/context/useShoppingCartStore'

export interface FooterButtonProps {
  product: ProductWithShop
}

export function FooterButton({ product }: FooterButtonProps) {
  const { shoppingCart, addToShoppingCart, removeFromShoppingCart } =
    useShoppingCartStore()
  const addCart = useCallback(
    () => addToShoppingCart(product),
    [addToShoppingCart, product]
  )
  const removeCart = useCallback(
    () => removeFromShoppingCart(product),
    [removeFromShoppingCart, product]
  )
  const inCart = useMemo(
    () => shoppingCart.some((cart) => cart.id === product.id),
    [product, shoppingCart]
  )
  return (
    <div className="flex flex-row px-6 py-3 space-x-4 sticky bottom-0 bg-[#FFFFFF]">
      <Button buttonType="secondary" size="large" iconOnly>
        <FiMessageCircle size={24} />
      </Button>
      <Button
        buttonType={inCart ? 'outline' : 'primary'}
        size="large"
        sideIcon
        className="grow w-14 justify-center"
        onClick={inCart ? removeCart : addCart}
      >
        {inCart ? <FiCheck size={24} /> : <FiShoppingBag size={24} />}
        {inCart ? 'Added to Bag' : 'Add to Bag'}
      </Button>
    </div>
  )
}
