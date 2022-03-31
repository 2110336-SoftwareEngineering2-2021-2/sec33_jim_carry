import { ProductLink, ProductLinkData } from '../ProductLink'
import { MessageItemComponentProps } from './types'

export function ProductLinkMesasgeItem({
  isSelf,
  message,
}: MessageItemComponentProps) {
  const data = message.payload as unknown as ProductLinkData
  return <ProductLink data={data} sent={isSelf} />
}
