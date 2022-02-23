import { invoke, useSession } from 'blitz'
import produce from 'immer'
import { useEffect } from 'react'
import create from 'zustand'

import { promptLogin } from 'app/core/stores/LoginPromptStore'
import { isProductSoldOut } from 'app/core/utils/isProductSoldOut'
import addToWishlist from 'app/wishlist/mutations/addToWishlist'
import clearSoldOutWishlist from 'app/wishlist/mutations/clearSoldOutWishlist'
import removeFromWishlist from 'app/wishlist/mutations/removeFromWishlist'
import getWishlist from 'app/wishlist/queries/getWishlist'

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
    if (!promptLogin('You need to sign in to add items to your wishlist.'))
      return
    set(
      produce<WishlistStore>((state) => {
        state.wishlist.push(product)
      })
    )
    const wishlist = await invoke(addToWishlist, { productId: product.id })
    set({ wishlist })
  },
  removeFromWishlist: async (product) => {
    if (!promptLogin('You need to sign in to add items to your wishlist.'))
      return
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
      wishlist: state.wishlist.filter((product) => !isProductSoldOut(product)),
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
