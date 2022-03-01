import { BlitzPage, Link, Routes, useMutation, useQuery } from 'blitz'
import { Suspense, useMemo, useState } from 'react'
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
import { isProductSoldOut } from 'app/core/utils/isProductSoldOut'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import deleteProduct from 'app/product/mutations/deleteProduct'
import getProducts from 'app/product/queries/getProducts'
import { ShopProduct } from 'app/shop/components/ShopProduct'
import getCurrentUser from 'app/users/queries/getCurrentUser'

const ManageProductsPage: BlitzPage = () => {
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
        <ShopProducts />
      </Suspense>
    </div>
  )
}

const ShopProducts = () => {
  const [user] = useQuery(getCurrentUser, null)
  const [{ products }] = useQuery(getProducts, {
    where: { shopId: user!.shop!.id },
  })
  const [productList, setProductList] = useState(products)
  const [deleteProductMutation] = useMutation(deleteProduct)

  const [value, setValue] = useState('all')
  const { available, sold } = useMemo(() => {
    const sold = productList.filter((product) => isProductSoldOut(product))
    const available = productList.filter(
      (product) => !isProductSoldOut(product)
    )
    return { available, sold }
  }, [productList])
  const visibleProducts =
    value === 'all' ? productList : value === 'sold out' ? sold : available

  const handleProductDelete = async (id: number) => {
    await deleteProductMutation({ id })
    setProductList(productList.filter((product) => product.id != id))
  }

  return (
    <div>
      <div className="p-6 pb-2">
        <SegmentedControl
          value={value}
          onChange={(newValue) => setValue(newValue)}
        >
          <SegmentedControlItem value="all">{`All (${productList.length})`}</SegmentedControlItem>
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

setupAuthRedirect(ManageProductsPage)
setupLayout(ManageProductsPage)

export default ManageProductsPage
