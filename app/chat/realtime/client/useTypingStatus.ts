import { useEffect, useRef, useState } from 'react'

import { ChatId } from '../types'
import { useObserveChat } from './useObserveChat'
import { useSocketEvent } from './useSocketEvent'

export function useTypingStatus(chatId: ChatId) {
  useObserveChat([chatId])
  const timestampsRef = useRef<Record<number, number>>({})
  const typingsRef = useRef<number[]>([])
  const [_, setForce] = useState(false)

  const update = () => {
    const timestamps = timestampsRef.current
    const now = Date.now()
    const typings: number[] = []
    Object.entries(timestamps).forEach(([key, timestamp]) => {
      const userId = Number(key)
      if (now - timestamp <= 5000) {
        typings.push(userId)
      }
    })
    const old = JSON.stringify(typingsRef.current)
    const newStringified = JSON.stringify(typings)
    if (old === newStringified) return
    typingsRef.current = typings
    setForce((force) => !force)
  }

  useObserveChat([chatId])
  useSocketEvent('userTyping', ({ chatId: typingChatId, userId, isTyping }) => {
    if (typingChatId !== chatId) return
    timestampsRef.current[userId] = isTyping ? Date.now() : 0
    update()
  })

  useEffect(() => {
    const interval = setInterval(() => update(), 5000)
    return () => clearInterval(interval)
  }, [])

  return typingsRef.current
}
