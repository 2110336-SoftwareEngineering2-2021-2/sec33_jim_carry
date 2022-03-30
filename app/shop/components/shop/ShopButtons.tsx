import { Link, Routes } from 'blitz'
import { FiHeart } from 'react-icons/fi'

import { ChatWithButton } from 'app/chat/components/ChatWithButton'
import { Button } from 'app/core/components/Button'

interface ShopButtonsProps {
  shopId: number
  isOwner?: boolean
}

export const ShopButtons = ({ shopId, isOwner = false }: ShopButtonsProps) => {
  if (isOwner) {
    return (
      <div>
        <ManageProductButton />
      </div>
    )
  }

  return (
    <div className="flex space-x-6">
      <ChatWithButton shopId={shopId} />
      <FavoriteButton shopId={shopId} />
    </div>
  )
}

const ManageProductButton = () => {
  return (
    <Link href={Routes.ManageProductsPage().pathname} passHref>
      <Button
        as="a"
        buttonType="primary"
        size="large"
        className="grow justify-center"
      >
        Manage Products
      </Button>
    </Link>
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
