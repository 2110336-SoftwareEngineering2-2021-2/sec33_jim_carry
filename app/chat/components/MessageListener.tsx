import { ChatMessageType, Message } from '@prisma/client'

import { useObserveChat } from '../realtime/client/useObserveChat'
import { useSocketEvent } from '../realtime/client/useSocketEvent'
import { ChatId } from '../realtime/types'

export interface MessageListenerProps {
  chatId: ChatId
  messageType?: ChatMessageType
  onMessage: (message: Message) => void
}

export function MessageListener({
  chatId,
  messageType,
  onMessage,
}: MessageListenerProps) {
  useObserveChat([chatId])
  useSocketEvent('newMessage', (message) => {
    if (message.chatId !== chatId) return
    if (messageType && message.type !== messageType) return
    onMessage(message)
  })
  return null
}
