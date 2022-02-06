import { useCallback, useState } from "react"

export interface Disclosure {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
  onToggle: () => void
}

export function useDisclosure(): Disclosure {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = useCallback(() => setIsOpen(false), [])
  const onOpen = useCallback(() => setIsOpen(true), [])
  const onToggle = useCallback(() => setIsOpen((prev) => !prev), [])
  return { isOpen, onClose, onOpen, onToggle }
}
