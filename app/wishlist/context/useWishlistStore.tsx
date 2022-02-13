import { invoke, useSession } from 'blitz'
import produce from 'immer'
import { Suspense, useEffect } from 'react'
import create from 'zustand'

import addToWishlist from 'app/wishlist/mutations/addToWishlist'
import clearSoldOutWishlist from 'app/wishlist/mutations/clearSoldOutWishlist'
import removeFromWishlist from 'app/wishlist/mutations/removeFromWishlist'
import getWishlist from 'app/wishlist/queries/getWishlist'

import { useCurrentUser } from '../../core/hooks/useCurrentUser'
import { ProductWithShop } from '../../core/types/Product'

export type WishlistStore = {
  wishlist: ProductWithShop[]
  addToWishlist: (product: ProductWithShop) => Promise<void>
  removeFromWishlist: (product: ProductWithShop) => Promise<void>
  syncFromStore: () => Promise<void>
  clearSoldOutWishlist: () => Promise<void>
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
    const wishlist = await invoke(addToWishlist, { productId: product.id })
    set({ wishlist })
  },
  removeFromWishlist: async (product) => {
    set(
      produce<WishlistStore>((state) => {
        const index = state.wishlist.findIndex((wish) => wish.id === product.id)
        if (index === -1) return
        state.wishlist.splice(index, 1)
      })
    )
    const wishlist = await invoke(removeFromWishlist, { productId: product.id })
    set({ wishlist })
  },
  clearSoldOutWishlist: async () => {
    set((state) => ({
      wishlist: state.wishlist.filter((product) => product.soldPrice === null),
    }))
    const wishlist = await invoke(clearSoldOutWishlist, null)
    set({ wishlist })
  },
  resetWishlist: () => {
    set({ wishlist: [] })
  },
}))

export function useSyncWishlist() {
  const session = useSession({ suspense: false })
  const syncFromStore = useWishlistStore((state) => state.syncFromStore)
  const resetWishlist = useWishlistStore((state) => state.resetWishlist)

  useEffect(() => {
    if (session.userId) {
      syncFromStore()
    } else {
      resetWishlist()
    }
  }, [session, syncFromStore, resetWishlist])
}
