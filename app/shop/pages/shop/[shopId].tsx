import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  Link,
  PromiseReturnType,
  Routes,
  useMutation,
  useRouter,
  useSession,
} from 'blitz'
import { Suspense, useCallback, useMemo, useState } from 'react'
import { FiGrid, FiEdit2 } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import { EmptyState } from 'app/core/components/EmptyState'
import {
  SegmentedControl,
  SegmentedControlItem,
} from 'app/core/components/SegmentedControl'
import { Spinner } from 'app/core/components/Spinner'
import { TopBar } from 'app/core/components/TopBar'
import { useCurrentUser } from 'app/core/hooks/useCurrentUser'
import { isProductSoldOut } from 'app/core/utils/isProductSoldOut'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import deleteProduct from 'app/product/mutations/deleteProduct'
import { ShopProduct } from 'app/shop/components/ShopProduct'
import getShopProfile from 'app/shop/queries/getShopProfile'
import getCurrentUser from 'app/users/queries/getCurrentUser'

interface ShopProfilePageProps {
  shop: PromiseReturnType<typeof getShopProfile>
}

const ShopProfilePage: BlitzPage<ShopProfilePageProps> = ({ shop }) => {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <ShopTopBar shop={shop} />
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
