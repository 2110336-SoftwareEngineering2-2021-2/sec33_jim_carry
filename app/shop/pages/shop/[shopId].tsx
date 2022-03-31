import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  PromiseReturnType,
  useSession,
} from 'blitz'
import { Suspense, useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import { Divider } from 'app/core/components/Divider'
import {
  SegmentedControl,
  SegmentedControlItem,
} from 'app/core/components/SegmentedControl'
import { Spinner } from 'app/core/components/Spinner'
import { TopBar } from 'app/core/components/TopBar'
import { setupLayout } from 'app/core/utils/setupLayout'
import ShowReviews from 'app/reviews/components/ShowReviews'
import { ShopBio } from 'app/shop/components/shop/ShopBio'
import { ShopButtons } from 'app/shop/components/shop/ShopButtons'
import { ShopProducts } from 'app/shop/components/shop/ShopProducts'
import { ShopStats } from 'app/shop/components/shop/ShopStats'
import getShop from 'app/shop/queries/getShop'

interface ShopProfilePageProps {
  shop: PromiseReturnType<typeof getShop>
}

const ShopProfilePage: BlitzPage<ShopProfilePageProps> = ({ shop }) => {
  return (
    <div>
      <ShopTopBar shop={shop} />
      <Suspense fallback={<Spinner />}>
        <ShopContainer shop={shop} />
        <ShopProductsOrReview shop={shop} />
      </Suspense>
    </div>
  )
}

const ShopTopBar = ({ shop }: ShopProfilePageProps) => {
  return <TopBar title={shop.name} />
}

const ShopContainer = ({ shop }: ShopProfilePageProps) => {
  const { userId } = useSession()
  const isOwner = shop.userId === userId
  return (
    <div className="px-6 py-4 space-y-6">
      <ShopStats shop={shop} />
      <ShopBio shopId={shop.id} bio={shop.bio} />
      <ShopButtons shopId={shop.id} isOwner={isOwner} />
      <Divider />
    </div>
  )
}

const ShopProductsOrReview = ({ shop }: ShopProfilePageProps) => {
  const [tab, setTab] = useState('products')
  return (
    <div>
      <div className="px-4">
        <SegmentedControl
          value={tab}
          onChange={(newTab) => {
            setTab(newTab)
          }}
        >
          <SegmentedControlItem value="products">Products</SegmentedControlItem>
          <SegmentedControlItem value="reviews">Reviews</SegmentedControlItem>
        </SegmentedControl>
      </div>
      <Suspense fallback={Spinner}>
        {tab === 'products' && <ShopProducts shopId={shop.id} />}
        {tab === 'reviews' && <ShowReviews shopId={shop.id} />}
      </Suspense>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const shopId = parseInt(context.query.shopId as string)
  const shop = await invokeWithMiddleware(
    getShop,
    {
      id: shopId,
    },
    context
  )
  return {
    props: { shop },
  }
}

setupLayout(ShopProfilePage)

export default ShopProfilePage
