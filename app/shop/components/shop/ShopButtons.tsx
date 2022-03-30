import { FiHeart } from 'react-icons/fi'

import { ChatWithButton } from 'app/chat/components/ChatWithButton'
import { Button } from 'app/core/components/Button'

interface ShopButtonsProps {
  shopId: number
}

export const ShopButtons = ({ shopId }: ShopButtonsProps) => {
  return (
    <div className="flex space-x-6">
      <ChatWithButton shopId={shopId} />
      <FavoriteButton shopId={shopId} />
    </div>
  )
}

const FavoriteButton = ({ shopId }: ShopButtonsProps) => {
  return (
    <Button
      buttonType="primary"
      size="large"
      leftIcon={<FiHeart size={24} />}
      onClick={() => {
        alert(`favorite shop ${shopId}`)
      }}
      className="grow justify-center"
    >
      Favorite
    </Button>
  )
}
