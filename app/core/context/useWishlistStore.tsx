import { invoke } from 'blitz'
import produce from 'immer'
import { Suspense, useEffect } from 'react'
import create from 'zustand'

import addToWishlist from 'app/wishlist/mutations/addToWishlist'
import removeFromWishlist from 'app/wishlist/mutations/removeFromWishlist'
import getWishlist from 'app/wishlist/queries/getWishlist'

import { useCurrentUser } from '../hooks/useCurrentUser'
import { ProductWithShop } from '../types/Product'

export type WishlistStore = {
  wishlist: ProductWithShop[]
  addToWishlist: (product: ProductWithShop) => Promise<void>
  removeFromWishlist: (product: ProductWithShop) => Promise<void>
  syncFromStore: () => Promise<void>
  clearSoldFromWishlist: () => Promise<void>
  resetWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  wishlist: [],
  syncFromStore: async () => {
    const wishlist = await invoke(getWishlist, null)
    set({ wishlist })
  },
  addToWishlist: async (product) => {
    set(
      produce<WishlistStore>((state) => {
        state.wishlist.push(product)
      })
    )
    await invoke(addToWishlist, { productId: product.id })
    await get().syncFromStore()
  },
  removeFromWishlist: async (product) => {
    set(
      produce<WishlistStore>((state) => {
        const index = state.wishlist.findIndex((wish) => wish.id === product.id)
        if (index === -1) return
        state.wishlist.splice(index, 1)
      })
    )
    await invoke(removeFromWishlist, { productId: product.id })
    await get().syncFromStore()
  },
  clearSoldFromWishlist: async () => {
    // TODO: actually remove from database
    set((state) => ({
      wishlist: state.wishlist.filter((product) => product.soldPrice === null),
    }))
  },
  resetWishlist: () => {
    set({ wishlist: [] })
  },
}))

export function useWishlistContext() {
  const currentUser = useCurrentUser()
  const syncFromStore = useWishlistStore((state) => state.syncFromStore)
  const resetWishlist = useWishlistStore((state) => state.resetWishlist)

  useEffect(() => {
    if (currentUser) {
      syncFromStore()
    } else {
      resetWishlist()
    }
  }, [currentUser, syncFromStore, resetWishlist])
}

export function WishlistContext() {
  useWishlistContext()
  return null
}

export function WishlistProducer() {
  return (
    <Suspense fallback={null}>
      <WishlistContext />
    </Suspense>
  )
}
