import {
  BlitzPage,
  Router,
  Routes,
  useMutation,
  useParam,
  useQuery,
} from 'blitz'
import { Suspense } from 'react'
import { z } from 'zod'

import { Spinner } from 'app/core/components/Spinner'
import { TopBar } from 'app/core/components/TopBar'
import { useGoBack } from 'app/core/hooks/useGoBack'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import createProduct from 'app/product/mutations/createProduct'
import getProduct from 'app/product/queries/getProduct'
import { ProductFormValues } from 'app/product/validations'
import { ProductForm } from 'app/shop/components/ProductForm'

const UpdateProductPage: BlitzPage = () => {
  return (
    <div>
      <TopBar
        backHref={Routes.ManageProductsPage().pathname}
        title="Edit Product"
      />
      <Suspense fallback={<Spinner />}>
        <UpdateProductForm />
      </Suspense>
    </div>
  )
}

const UpdateProductForm = () => {
  const param = useParam('pid')
  let pid: number = 0
  if (typeof param == 'string') {
    pid = parseInt(param)
  }
  const [product] = useQuery(getProduct, { id: pid })
  const [updateProductMutation] = useMutation(createProduct)
  const goBack = useGoBack(Routes.ManageProductsPage().pathname)

  return (
    <ProductForm
      initialValues={{
        name: product.name,
        price: product.price.toString(),
        stock: product.stock.toString(),
        hashtags: product.hashtags.join(', '),
        description: product.description ? product.description : '',
      }}
      onSubmit={(values: z.infer<typeof ProductFormValues>) => {
        console.log(values)
      }}
    />
  )
}

setupAuthRedirect(UpdateProductPage)
setupLayout(UpdateProductPage)

export default UpdateProductPage
