import { Link, Routes } from 'blitz'
import { FiMessageCircle } from 'react-icons/fi'

import { Button, ButtonProps } from 'app/core/components/Button'

export interface ChatWithButtonProps {
  shopId: number
  buttonType?: ButtonProps['buttonType']
}

export function ChatWithButton({
  shopId,
  buttonType = 'secondary',
}: ChatWithButtonProps) {
  return (
    <Link href={Routes.ChatWithPage({ shopId })} passHref>
      <Button as="a" buttonType={buttonType} size="large" iconOnly>
        <FiMessageCircle size={24} />
      </Button>
    </Link>
  )
}
