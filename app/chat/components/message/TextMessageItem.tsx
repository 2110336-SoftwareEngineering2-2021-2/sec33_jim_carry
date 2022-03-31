import { useMemo } from 'react'

import { emojiPattern } from 'app/chat/utils'

import { ChatBubble } from '../ChatBubble'
import { EmojiContainer } from '../EmojiContainer'
import { MessageItemComponentProps } from './types'

export function TextMessageItem({
  isSelf,
  message,
  groupedWithTop,
  groupedWithBottom,
}: MessageItemComponentProps) {
  const text = message.payload as string
  const isEmoji = useMemo(() => emojiPattern.test(text), [text])
  if (isEmoji && text.length <= 12) {
    return (
      <EmojiContainer isSelf={isSelf} createdAt={message.createdAt}>
        {text}
      </EmojiContainer>
    )
  }
  return (
    <ChatBubble
      isSelf={isSelf}
      createdAt={message.createdAt}
      groupedWithTop={groupedWithTop}
      groupedWithBottom={groupedWithBottom}
    >
      {message.payload}
    </ChatBubble>
  )
}
