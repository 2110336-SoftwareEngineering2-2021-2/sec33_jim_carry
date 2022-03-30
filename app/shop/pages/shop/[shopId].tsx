import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  PromiseReturnType,
  useSession,
} from 'blitz'
import { Suspense } from 'react'
import { FiEdit2 } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import { Spinner } from 'app/core/components/Spinner'
import { TopBar } from 'app/core/components/TopBar'
import { setupLayout } from 'app/core/utils/setupLayout'
import { ShopBio } from 'app/shop/components/shop/ShopBio'
import { ShopStats } from 'app/shop/components/shop/ShopStats'
import getShopProfile from 'app/shop/queries/getShopProfile'

interface ShopProfilePageProps {
  shop: PromiseReturnType<typeof getShopProfile>
}

const ShopProfilePage: BlitzPage<ShopProfilePageProps> = ({ shop }) => {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <ShopTopBar shop={shop} />
        <ShopContainer shop={shop} />
      </Suspense>
    </div>
  )
}

const ShopTopBar = ({ shop }: ShopProfilePageProps) => {
  const { userId } = useSession()
  const isOwner = shop.userId === userId
  return (
    <TopBar
      title={shop.name}
      actions={
        isOwner && (
          // <Link href={Routes.CreateProductPage().pathname} passHref>
          <Button as="a" buttonType="transparent" size="large" iconOnly>
            <FiEdit2 className="text-ink-dark" />
          </Button>
          // </Link>
        )
      }
    />
  )
}

const ShopContainer = ({ shop }: ShopProfilePageProps) => {
  return (
    <div className="px-6 py-4 space-y-6">
      <ShopStats shop={shop} />
      <ShopBio bio={shop.bio} rating={shop.rating} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const shopId = parseInt(context.query.shopId as string)
  const shop = await invokeWithMiddleware(
    getShopProfile,
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
