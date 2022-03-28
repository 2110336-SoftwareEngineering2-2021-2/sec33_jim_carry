import { invoke, useSession } from 'blitz'
import { useEffect } from 'react'
import create from 'zustand'

import listChats, { ChatData } from 'app/chat/queries/listChats'

export type ChatStore = {
  chats: ChatData[]
  isLoading: boolean
  shopChats: ChatData[]
  syncFromStore: () => Promise<void>
  resetChat: () => void
}

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  shopChats: [],
  isLoading: false,
  syncFromStore: async () => {
    set({ isLoading: true })
    const chats = await invoke(listChats, { isShopChat: false })
    const shopChats = await invoke(listChats, { isShopChat: true })
    set({ chats })
    set({ shopChats })
    set({ isLoading: false })
  },
  resetChat: () => {
    set({ chats: [] })
    set({ shopChats: [] })
  },
}))

export function useSyncChat() {
  const session = useSession({ suspense: false })
  const { syncFromStore, resetChat } = useChatStore((state) => ({
    syncFromStore: state.syncFromStore,
    resetChat: state.resetChat,
  }))

  useEffect(() => {
    if (session.userId) {
      syncFromStore()
    } else {
      resetChat()
    }
  }, [session, syncFromStore, resetChat])
}