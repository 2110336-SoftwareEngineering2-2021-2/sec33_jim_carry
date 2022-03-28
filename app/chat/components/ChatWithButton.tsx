import { Link, Routes } from 'blitz'
import { FiMessageCircle } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'

export interface ChatWithButtonProps {
  shopId: number
}

export function ChatWithButton({ shopId }: ChatWithButtonProps) {
  return (
    <Link href={Routes.ChatWithPage({ shopId })} passHref>
      <Button as="a" buttonType="secondary" size="large" iconOnly>
        <FiMessageCircle size={24} />
      </Button>
    </Link>
  )
}
