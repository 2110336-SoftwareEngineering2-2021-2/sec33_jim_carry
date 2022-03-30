import { ChatBubble } from '../ChatBubble'
import { MessageItemComponentProps } from './types'

export function TextMessageItem({
  isSelf,
  message,
  groupedWithTop,
  groupedWithBottom,
}: MessageItemComponentProps) {
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
