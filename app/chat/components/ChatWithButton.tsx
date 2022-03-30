import { Link, Routes } from 'blitz'
import { FiMessageCircle } from 'react-icons/fi'

import { Button, ButtonProps } from 'app/core/components/Button'

export interface ChatWithButtonProps {
  shopId: number
  productId?: number
  buttonType?: ButtonProps['buttonType']
}

export function ChatWithButton({
  shopId,
  productId,
  buttonType = 'secondary',
}: ChatWithButtonProps) {
  const query = productId ? { productId } : {}
  return (
    <Link href={Routes.ChatWithPage({ shopId, ...query })} passHref>
      <Button as="a" buttonType={buttonType} size="large" iconOnly>
        <FiMessageCircle size={24} />
      </Button>
    </Link>
  )
}
