import { ChatMessageType } from '@prisma/client'
import { FC } from 'react'

import { ChatBubble } from '../ChatBubble'
import { TextMessageItem } from './TextMessageItem'
import { MessageItemProps } from './types'

const componentMap: Record<ChatMessageType, FC<MessageItemProps>> = {
  TEXT: TextMessageItem,
}

export function MessageItem({ userId, message }: MessageItemProps) {
  const Component = componentMap[message.type]
  if (!Component)
    return (
      <ChatBubble isSelf={userId === message.senderId}>
        Unsupported message
      </ChatBubble>
    )
  return <Component userId={userId} message={message} />
}
