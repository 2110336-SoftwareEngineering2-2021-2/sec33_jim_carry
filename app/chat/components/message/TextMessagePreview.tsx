import { MessageItemComponentProps } from './types'

export function TextMessagePreview({
  isSelf,
  message,
}: MessageItemComponentProps) {
  return <span>{`${isSelf ? 'You: ' : ''}${message.payload}`}</span>
}
