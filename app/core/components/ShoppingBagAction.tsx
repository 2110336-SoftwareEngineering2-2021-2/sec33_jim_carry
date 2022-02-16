import { Link, Routes } from 'blitz'
import { FiShoppingBag } from 'react-icons/fi'

import { useShoppingCartStore } from 'app/shoppingCart/context/useShoppingCartStore'

import { TopBarAction } from './TopBarAction'

export function ShoppingBagAction() {
  const count = useShoppingCartStore((state) => state.shoppingCart.length)

  return (
    <Link href={Routes.ShoppingCart()} passHref>
      <TopBarAction as="a" className="relative inline-block">
        {!!count && (
          <span
            className="
              absolute top-0 right-0 px-1.5 py-0.5
              text-tiny text-sky-white bg-error rounded-full"
          >
            {count}
          </span>
        )}
        <FiShoppingBag />
      </TopBarAction>
    </Link>
  )
}
