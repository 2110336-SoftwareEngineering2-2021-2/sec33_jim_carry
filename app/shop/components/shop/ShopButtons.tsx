import { Link, Routes, useMutation, useQuery, setQueryData } from 'blitz'
import { CgSpinner } from 'react-icons/cg'
import { FiHeart } from 'react-icons/fi'

import { ChatWithButton } from 'app/chat/components/ChatWithButton'
import { Button } from 'app/core/components/Button'
import setFavoriteStatus from 'app/shop/mutations/setFavoriteStatus'
import countFavorites from 'app/shop/queries/countFavorites'
import getFavoriteStatus from 'app/shop/queries/getFavoriteStatus'

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
  const [favorite, { setQueryData: setFavoriteStatusQuery }] = useQuery(
    getFavoriteStatus,
    {
      shopId,
    }
  )
  const [setFavorite, { isLoading }] = useMutation(setFavoriteStatus)

  const icon = isLoading ? (
    <CgSpinner className="animate-spin" size={24} />
  ) : (
    <FiHeart size={24} />
  )

  if (favorite) {
    return (
      <Button
        buttonType="secondary"
        size="large"
        leftIcon={icon}
        onClick={async () => {
          await setFavorite({ shopId, favorite: false })
          setFavoriteStatusQuery(false)
          setQueryData(countFavorites, { shopId }, (prev) =>
            prev ? prev - 1 : 0
          )
        }}
        className="grow justify-center"
      >
        Favorited
      </Button>
    )
  }
  return (
    <Button
      buttonType="primary"
      size="large"
      leftIcon={icon}
      onClick={async () => {
        await setFavorite({ shopId, favorite: true })
        setFavoriteStatusQuery(true)
        setQueryData(countFavorites, { shopId }, (prev) =>
          prev ? prev + 1 : 1
        )
      }}
      className="grow justify-center"
    >
      Favorite
    </Button>
  )
}
