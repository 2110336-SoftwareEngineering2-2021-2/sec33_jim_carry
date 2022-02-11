import { Product } from '@prisma/client'
import produce, { Immutable } from 'immer'
import create from 'zustand'

export type ShoppingCartStore = Immutable<{
  shoppingCart: number[]
  addToShoppingCart: (id: number) => void
  removeFromShoppingCart: (id: number) => void
}>

export const useShoppingCartStore = create<ShoppingCartStore>((set) => ({
  shoppingCart: [],
  addToShoppingCart: (id) => {
    set(
      produce<ShoppingCartStore>((state) => {
        state.shoppingCart.push(id)
      })
    )
  },
  removeFromShoppingCart: (id) => {
    set(
      produce<ShoppingCartStore>((state) => {
        const index = state.shoppingCart.findIndex((product) => product === id)
        if (index === -1) return
        state.shoppingCart.splice(index, 1)
      })
    )
  },
}))
