import { useSession } from 'blitz'
import produce from 'immer'
import { ReactNode, useEffect } from 'react'
import create from 'zustand'

export type LoginPromptStore = {
  isLoggedIn: boolean
  setLoggedIn: (isLoggedIn: boolean) => void
  isOpen: boolean
  message: ReactNode | null
  show: (message: ReactNode) => void
  close: () => void
}

export const useLoginPromptStore = create<LoginPromptStore>((set, get) => ({
  isLoggedIn: false,
  setLoggedIn: (isLoggedIn) => {
    set(
      produce((state) => {
        state.isLoggedIn = isLoggedIn
      })
    )
  },
  isOpen: false,
  message: null,
  show: (message) => {
    set(
      produce((state) => {
        state.isOpen = true
        state.message = message
      })
    )
  },
  close: () => {
    set(
      produce((state) => {
        state.isOpen = false
      })
    )
  },
}))

export function useSyncLoginPrompt() {
  const { userId } = useSession({ suspense: false })
  const isLoggedIn = !!userId
  const setLoggedIn = useLoginPromptStore((state) => state.setLoggedIn)

  useEffect(() => {
    setLoggedIn(isLoggedIn)
  }, [setLoggedIn, isLoggedIn])
}

export function promptLogin(message: ReactNode) {
  const { isLoggedIn, show } = useLoginPromptStore.getState()
  if (isLoggedIn) return true
  show(message)
  return false
}
