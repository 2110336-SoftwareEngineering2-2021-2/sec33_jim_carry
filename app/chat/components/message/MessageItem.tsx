import { ChatMessageType } from '@prisma/client'
import { FC } from 'react'

import { ChatBubble } from '../ChatBubble'
import { ProductLinkMesasgeItem } from './ProductLinkMessageItem'
import { ProductLinkMessagePreview } from './ProductLinkMessagePreview'
import { TextMessageItem } from './TextMessageItem'
import { TextMessagePreview } from './TextMessagePreview'
import { MessageItemComponentProps, MessageItemProps } from './types'

const itemComponentMap: Record<
  ChatMessageType,
  FC<MessageItemComponentProps>
> = {
  TEXT: TextMessageItem,
  PRODUCT_LINK: ProductLinkMesasgeItem,
}

const previewComponentMap: Record<
  ChatMessageType,
  FC<MessageItemComponentProps>
> = {
  TEXT: TextMessagePreview,
  PRODUCT_LINK: ProductLinkMessagePreview,
}

export function MessageItem({
  userId,
  message,
  isPreview = false,
  groupedWithTop = false,
  groupedWithBottom = false,
}: MessageItemProps) {
  const isSelf = userId === message.senderId
  const componentMap = isPreview ? previewComponentMap : itemComponentMap
  const Component = componentMap[message.type]
  if (!Component)
    return <ChatBubble isSelf={isSelf}>Unsupported message</ChatBubble>
  return (
    <Component
      isSelf={isSelf}
      userId={userId}
      message={message}
      groupedWithTop={groupedWithTop}
      groupedWithBottom={groupedWithBottom}
    />
  )
}
