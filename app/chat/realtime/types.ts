import type { Chat, Message } from '@prisma/client'

export type ChatId = Chat['id']

export interface ClientEvents {
  setUserId: (userId: number | null) => void
  observeChats: (chatIds: ChatId[]) => void
  sendTyping: (chatId: ChatId) => void
}

export interface ServerEvents {
  newMessage: (message: Message) => void
  userTyping: (args: { chatId: number; userId: number }) => void
}

export type TextMessage = {
  type: 'TEXT'
  payload: string
}

export type MessageData = TextMessage
