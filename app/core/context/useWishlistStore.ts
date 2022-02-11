import { Product } from '@prisma/client'
import produce, { Immutable } from 'immer'
import create from 'zustand'

export type WishlistStore = Immutable<{
  wishlist: number[]
  addToWishlist: (id: number) => void
  removeFromWishlist: (id: number) => void
}>

export const useWishlistStore = create<WishlistStore>((set) => ({
  wishlist: [],
  addToWishlist: (id) => {
    set(
      produce<WishlistStore>((state) => {
        state.wishlist.push(id)
      })
    )
  },
  removeFromWishlist: (id) => {
    set(
      produce<WishlistStore>((state) => {
        const index = state.wishlist.findIndex((product) => product === id)
        if (index === -1) return
        state.wishlist.splice(index, 1)
      })
    )
  },
}))
