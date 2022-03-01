import { BlitzPage, Router, Routes, useMutation } from 'blitz'
import { Suspense } from 'react'
import { z } from 'zod'

import { Spinner } from 'app/core/components/Spinner'
import { TopBar } from 'app/core/components/TopBar'
import { useGoBack } from 'app/core/hooks/useGoBack'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import createProduct from 'app/product/mutations/createProduct'
import { ProductFormValues } from 'app/product/validations'
import { ProductForm } from 'app/shop/components/ProductForm'

const CreateProductPage: BlitzPage = () => {
  return (
    <div>
      <TopBar
        backHref={Routes.ManageProductsPage().pathname}
        title="Add Product"
      />
      <Suspense fallback={<Spinner />}>
        <CreateProductForm />
      </Suspense>
    </div>
  )
}

const CreateProductForm = () => {
  const [createProductMutation] = useMutation(createProduct)
  const goBack = useGoBack(Routes.ManageProductsPage().pathname)
  return (
    <ProductForm
      onSubmit={async (values: z.infer<typeof ProductFormValues>) => {
        await createProductMutation(values)
        await goBack()
        Router.reload()
      }}
    />
  )
}

setupAuthRedirect(CreateProductPage)
setupLayout(CreateProductPage)

export default CreateProductPage
