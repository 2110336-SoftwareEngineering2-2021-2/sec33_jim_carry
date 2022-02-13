import { Product } from '@prisma/client'
import { invoke } from 'blitz'
import produce, { Immutable } from 'immer'
import { Suspense, useEffect } from 'react'
import create from 'zustand'

import addToWishlist from 'app/wishlist/mutations/addToWishlist'
import removeFromWishlist from 'app/wishlist/mutations/removeFromWishlist'
import getWishlist from 'app/wishlist/queries/getWishlist'

import { useCurrentUser } from '../hooks/useCurrentUser'

export type WishlistStore = Immutable<{
  wishlist: Product[]
  addToWishlist: (id: Product) => Promise<void>
  removeFromWishlist: (id: Product) => Promise<void>
  syncFromStore: () => Promise<void>
  clearWishlist: () => void
}>

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  wishlist: [],
  syncFromStore: async () => {
    const wishlist = await invoke(getWishlist, null)
    console.log('fetch')

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
  clearWishlist: () => {
    set({ wishlist: [] })
  },
}))

export function useWishlistContext() {
  const currentUser = useCurrentUser()
  const syncFromStore = useWishlistStore((state) => state.syncFromStore)
  const clearWishlist = useWishlistStore((state) => state.clearWishlist)

  useEffect(() => {
    if (currentUser) {
      syncFromStore()
    } else {
      clearWishlist()
    }
  }, [currentUser, syncFromStore, clearWishlist])
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
