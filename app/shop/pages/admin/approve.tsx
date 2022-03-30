import { Shop, User } from '@prisma/client'
import { BlitzPage, Image, Routes, useMutation, useQuery } from 'blitz'
import { Suspense } from 'react'
import { FiLayout } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import { EmptyState } from 'app/core/components/EmptyState'
import { Spinner } from 'app/core/components/Spinner'
import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import approveShop from 'app/shop/mutations/approveShop'
import declineShop from 'app/shop/mutations/declineShop'
import getRequestShops from 'app/shop/queries/getRequestShops'

const ApproveShop: BlitzPage = () => {
  return (
    <div>
      <TopBar
        backHref={Routes.Menu().pathname}
        title="Shop Requests"
        largeTitle
      />
      <Suspense fallback={<Spinner />}>
        <ShopRequests />
      </Suspense>
    </div>
  )
}

const ShopRequests = () => {
  const [shops, { refetch }] = useQuery(getRequestShops, null)
  const mutate = async () => {
    return refetch()
  }
  return (
    <div className="flex flex-col px-6 space-y-6 divide-y divide-sky-lighter">
      {shops.map((shop) => (
        <ShopRequest shop={shop} key={shop.id} mutate={mutate} />
      ))}
      {shops.length === 0 && (
        <EmptyState
          icon={<FiLayout strokeWidth={0.5} size={84} />}
          title="There is currently no request."
        />
      )}
    </div>
  )
}

interface ShopRequestProps {
  shop: Shop & { user: User }
  mutate: () => void
}

const ShopRequest = ({ shop, mutate }: ShopRequestProps) => {
  const [approveShopMutation] = useMutation(approveShop)
  const [declineShopMutation] = useMutation(declineShop)
  const onApprove = async () => {
    await approveShopMutation({ shopId: shop.id })
    mutate()
  }
  const onDecline = async () => {
    await declineShopMutation({ shopId: shop.id })
    mutate()
  }
  return (
    <div key={shop.id} className="flex flex-col py-6 space-y-2">
      <div className="flex w-full space-x-4 items-center">
        <div className="flex flex-col space-y-1 flex-1">
          <p className="font-bold text-title3 mb-1">{shop.name}</p>
          <p className="text-small">{shop.phoneNo}</p>
          <p className="text-small">{shop.user.citizenId}</p>
          <p className="text-small">{shop.bio}</p>
        </div>
        {shop.citizenIdImage ? (
          <div className=" w-36 aspect-square relative">
            <Image
              src={shop.citizenIdImage}
              objectFit="cover"
              layout="fill"
              alt="citizen id image"
              className="bg-ink-lighter rounded-md"
            />
          </div>
        ) : (
          <div className="aspect-square bg-ink-lighter rounded-md w-36" />
        )}
      </div>
      <div className="flex w-full space-x-2">
        <Button onClick={onApprove}>Accept</Button>
        <Button onClick={onDecline} buttonType="secondary">
          Decline
        </Button>
      </div>
    </div>
  )
}
setupAuthRedirect(ApproveShop)
setupLayout(ApproveShop)

export default ApproveShop
