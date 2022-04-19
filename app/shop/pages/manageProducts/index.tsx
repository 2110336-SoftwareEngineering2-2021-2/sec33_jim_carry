import {
  BlitzPage,
  invokeWithMiddleware,
  Link,
  PromiseReturnType,
  Routes,
  useMutation,
  useRouter,
} from 'blitz'
import { Suspense, useCallback, useMemo, useState } from 'react'
import { FiGrid, FiPlus } from 'react-icons/fi'

import { Button } from 'app/core/components/Button'
import { EmptyState } from 'app/core/components/EmptyState'
import {
  SegmentedControl,
  SegmentedControlItem,
} from 'app/core/components/SegmentedControl'
import { Spinner } from 'app/core/components/Spinner'
import { TopBar } from 'app/core/components/TopBar'
import { ProductWithShop } from 'app/core/types/Product'
import { wrapGetServerSideProps } from 'app/core/utils'
import { isProductSoldOut } from 'app/core/utils/isProductSoldOut'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import deleteProduct from 'app/product/mutations/deleteProduct'
import getProducts from 'app/product/queries/getProducts'
import { ShopProduct } from 'app/shop/components/manageProducts/ShopProduct'
import getCurrentUser from 'app/users/queries/getCurrentUser'

interface ManageProductsPageProps {
  data: PromiseReturnType<typeof getProducts>
}

const ManageProductsPage: BlitzPage<ManageProductsPageProps> = ({ data }) => {
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
        <ShopProducts products={data.products} />
      </Suspense>
    </div>
  )
}

const ShopProducts = ({ products }: { products: ProductWithShop[] }) => {
  const { replace, asPath } = useRouter()
  const [deleteProductMutation] = useMutation(deleteProduct)

  const [value, setValue] = useState('all')
  const { available, sold } = useMemo(() => {
    const sold = products.filter((product) => isProductSoldOut(product))
    const available = products.filter((product) => !isProductSoldOut(product))
    return { available, sold }
  }, [products])
  const visibleProducts =
    value === 'all' ? products : value === 'sold out' ? sold : available

  const handleProductDelete = useCallback(
    async (id: number) => {
      await deleteProductMutation({ id })
      replace(asPath)
    },
    [deleteProductMutation, replace, asPath]
  )

  return (
    <div>
      <div className="p-6 pb-2">
        <SegmentedControl
          value={value}
          onChange={(newValue) => setValue(newValue)}
        >
          <SegmentedControlItem value="all">{`All (${products.length})`}</SegmentedControlItem>
          <SegmentedControlItem value="available">
            {`Available (${available.length})`}
          </SegmentedControlItem>
          <SegmentedControlItem value="sold out">{`Sold Out (${sold.length})`}</SegmentedControlItem>
        </SegmentedControl>
      </div>
      <ProductList
        products={visibleProducts}
        value={value}
        onProductDelete={handleProductDelete}
      />
    </div>
  )
}

const ProductList = ({
  products,
  value,
  onProductDelete,
}: {
  products: ProductWithShop[]
  value: string
  onProductDelete: (number) => void
}) => {
  if (products.length === 0) {
    return (
      <EmptyState
        icon={<FiGrid strokeWidth={0.5} size={84} />}
        title={`There are no ${
          value === 'all' ? '' : `${value} `
        }products in your shop.`}
        description="Add a new product to start selling!"
      />
    )
  }
  return (
    <div className="flex flex-col p-6 space-y-4">
      {products.map((product) => (
        <ShopProduct
          key={product.id}
          product={product}
          onDelete={onProductDelete}
        />
      ))}
    </div>
  )
}

export const getServerSideProps = wrapGetServerSideProps(async (context) => {
  const user = await invokeWithMiddleware(getCurrentUser, {}, context)
  const data = await invokeWithMiddleware(
    getProducts,
    {
      where: { shopId: user!.shop!.id },
    },
    context
  )
  return {
    props: { data },
  }
})

setupAuthRedirect(ManageProductsPage)
setupLayout(ManageProductsPage)

export default ManageProductsPage
