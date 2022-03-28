import { MessageItemComponentProps } from './types'

export function ProductLinkMessagePreview({
  isSelf,
}: MessageItemComponentProps) {
  return <span>{isSelf ? 'Product link sent' : 'Product link received'}</span>
}
