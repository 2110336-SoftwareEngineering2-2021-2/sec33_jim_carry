import { invoke, useSession } from 'blitz'
import produce from 'immer'
import { useEffect } from 'react'
import create from 'zustand'

import { ProductWithShop } from '../../core/types/Product'
import addToShoppingCart from '../mutations/addToShoppingCart'
import removeFromShoppingCart from '../mutations/removeFromShoppingCart'
import getShoppingCart from '../queries/getShoppingCart'

export type ShoppingCartStore = {
  shoppingCart: ProductWithShop[]
  addToShoppingCart: (product: ProductWithShop) => Promise<void>
  removeFromShoppingCart: (product: ProductWithShop) => Promise<void>
  syncFromStore: () => Promise<void>
  resetShoppingCart: () => void
}

export const useShoppingCartStore = create<ShoppingCartStore>((set, get) => ({
  shoppingCart: [],
  syncFromStore: async () => {
    const shoppingCart = await invoke(getShoppingCart, null)
    set({ shoppingCart })
  },
  addToShoppingCart: async (product) => {
    set(
      produce<ShoppingCartStore>((state) => {
        state.shoppingCart.push(product)
      })
    )
    const shoppingCart = await invoke(addToShoppingCart, {
      productId: product.id,
    })
    set({ shoppingCart })
  },
  removeFromShoppingCart: async (product) => {
    set(
      produce<ShoppingCartStore>((state) => {
        const index = state.shoppingCart.findIndex(
          (wish) => wish.id === product.id
        )
        if (index === -1) return
        state.shoppingCart.splice(index, 1)
      })
    )
    const shoppingCart = await invoke(removeFromShoppingCart, {
      productId: product.id,
    })
    set({ shoppingCart })
  },
  resetShoppingCart: () => {
    set({ shoppingCart: [] })
  },
}))

export function useSyncShoppingCart() {
  const session = useSession({ suspense: false })
  const syncFromStore = useShoppingCartStore((state) => state.syncFromStore)
  const resetShoppingCart = useShoppingCartStore(
    (state) => state.resetShoppingCart
  )

  useEffect(() => {
    if (session.userId) {
      syncFromStore()
    } else {
      resetShoppingCart()
    }
  }, [session, syncFromStore, resetShoppingCart])
}
