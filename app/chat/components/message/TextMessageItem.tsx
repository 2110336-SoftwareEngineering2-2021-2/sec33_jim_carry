import { ChatBubble } from '../ChatBubble'
import { MessageItemComponentProps } from './types'

export function TextMessageItem({
  isSelf,
  message,
}: MessageItemComponentProps) {
  return <ChatBubble isSelf={isSelf}>{message.payload}</ChatBubble>
}
