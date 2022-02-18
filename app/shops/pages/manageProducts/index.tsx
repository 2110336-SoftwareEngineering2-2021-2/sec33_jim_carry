import { Product } from '@prisma/client'
import { BlitzPage, Link, Routes, useQuery } from 'blitz'
import { Suspense } from 'react'
import { FiGrid, FiPlus } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import { EmptyState } from 'app/core/components/EmptyState'
import { Spinner } from 'app/core/components/Spinner'
import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import { ShopProduct } from 'app/shops/components/ShopProduct'
import getCurrentUser from 'app/users/queries/getCurrentUser'

const ManageProductsPage: BlitzPage = () => {
  // TODO : See CRUD for product, R for product list

  return (
    <div>
      <TopBar
        title="My Products"
        largeTitle
        actions={
          <Link href={Routes.CreateProductPage().pathname} passHref>
            <Button as="a" size="small" leftIcon={<FiPlus />}>
              Add
            </Button>
          </Link>
        }
      />
      <Suspense fallback={<Spinner />}>
        <ProductList />
      </Suspense>
    </div>
  )
}

const ProductList = () => {
  const [user] = useQuery(getCurrentUser, null)
  const shop = user!.shop
  console.log(shop)
  // if (products.length === 0) {
  //   return (
  //     <EmptyState
  //       icon={<FiGrid strokeWidth={0.5} size={84} />}
  //       title="There are no products in your shop."
  //       description="Add a new product to start selling!"
  //     />
  //   )
  // }
  return (
    <div className="flex flex-col p-6 space-y-4">
      <ShopProduct />
      <ShopProduct />
      <ShopProduct />
      {/* {products.map((product) => {
        ;<ShopProduct key={product.id} />
      })} */}
    </div>
  )
}

setupAuthRedirect(ManageProductsPage)
setupLayout(ManageProductsPage)

export default ManageProductsPage
