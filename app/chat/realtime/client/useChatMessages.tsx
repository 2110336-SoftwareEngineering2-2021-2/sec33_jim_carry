import { Message } from '@prisma/client'
import { useMutation } from 'blitz'
import { useEffect, useMemo, useState } from 'react'

import markAsRead from 'app/chat/mutations/markAsRead'

import { ChatId } from '../types'
import { useObserveChat } from './useObserveChat'
import { useSocketEvent } from './useSocketEvent'

export function useChatMessages(
  chatId: ChatId,
  messages: Message[],
  doMarkAsRead: boolean = false
): Message[] {
  const [newMessages, setNewMessages] = useState<Message[]>([])
  const [markAsReadMutation] = useMutation(markAsRead)

  useObserveChat([chatId])
  useSocketEvent('newMessage', (message) => {
    if (message.chatId !== chatId) return
    setNewMessages((messages) => [...messages, message])
  })

  const allMessages = useMemo(
    () => [...messages, ...newMessages],
    [messages, newMessages]
  )

  useEffect(() => {
    if (!doMarkAsRead || !allMessages.length) return
    markAsReadMutation({
      chatId,
      messageId: allMessages[allMessages.length - 1]!.id,
    })
  }, [chatId, doMarkAsRead, markAsReadMutation, allMessages])

  return allMessages
}
