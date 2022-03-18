import { ChatBubble } from '../ChatBubble'
import { MessageItemProps } from './types'

export function TextMessageItem({ userId, message }: MessageItemProps) {
  return (
    <ChatBubble isSelf={userId === message.senderId}>
      {message.payload}
    </ChatBubble>
  )
}
