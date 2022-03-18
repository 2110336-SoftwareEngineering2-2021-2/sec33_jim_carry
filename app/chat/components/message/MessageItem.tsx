import { ChatMessageType } from '@prisma/client'
import { FC } from 'react'

import { ChatBubble } from '../ChatBubble'
import { TextMessageItem } from './TextMessageItem'
import { TextMessagePreview } from './TextMessagePreview'
import { MessageItemComponentProps, MessageItemProps } from './types'

const itemComponentMap: Record<
  ChatMessageType,
  FC<MessageItemComponentProps>
> = {
  TEXT: TextMessageItem,
}

const previewComponentMap: Record<
  ChatMessageType,
  FC<MessageItemComponentProps>
> = {
  TEXT: TextMessagePreview,
}

export function MessageItem({
  userId,
  message,
  isPreview = false,
}: MessageItemProps) {
  const isSelf = userId === message.senderId
  const componentMap = isPreview ? previewComponentMap : itemComponentMap
  const Component = componentMap[message.type]
  if (!Component)
    return <ChatBubble isSelf={isSelf}>Unsupported message</ChatBubble>
  return <Component isSelf={isSelf} userId={userId} message={message} />
}
