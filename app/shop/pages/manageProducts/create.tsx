import { BlitzPage, Routes, useMutation } from 'blitz'
import { z } from 'zod'

import Form, { FORM_ERROR } from 'app/core/components/Form'
import LabeledTextField from 'app/core/components/LabeledTextField'
import { TopBar } from 'app/core/components/TopBar'
import { useGoBack } from 'app/core/hooks/useGoBack'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import createProduct from 'app/product/mutations/createProduct'
import { CreateProduct } from 'app/product/validations'
import { UploadImagesBlock } from 'app/shop/components/UploadImagesBlock'

const CreateProductPage: BlitzPage = () => {
  const [createProductMutation] = useMutation(createProduct)
  const goBack = useGoBack(Routes.ManageProductsPage().pathname)

  const compileInputValues = (values: z.infer<typeof CreateProduct>) => {
    const hidden = false
    const price = Number(values.price)
    const stock = Number(values.price)

    const hashtags = values.hashtags!.split(',').map((s) => s.trim())

    // TODO : Handle images
    const images = ['https://picsum.photos/500', 'https://picsum.photos/500']
    return { ...values, hidden, price, stock, hashtags, images }
  }

  return (
    <div>
      <TopBar
        backHref={Routes.ManageProductsPage().pathname}
        title="Add Product"
      />
      <Form
        className="py-3 px-6 flex flex-col gap-6"
        submitText="Save"
        schema={CreateProduct}
        onSubmit={async (values: z.infer<typeof CreateProduct>) => {
          try {
            await createProductMutation(compileInputValues(values))
            goBack()
          } catch (error: any) {
            return { [FORM_ERROR]: error.toString() }
          }
        }}
      >
        <LabeledTextField name="name" label="Product name" />
        <LabeledTextField name="price" label="Price per item (฿)" />
        <LabeledTextField name="stock" label="Number of items in stock" />
        <LabeledTextField
          name="hashtags"
          label="Hashtags"
          asTextArea
          style={{ height: 84 }}
          caption="Separate each tag with a comma e.g. Shoes, Bag, Women, Accessories"
        />
        <LabeledTextField
          name="description"
          label="Product description"
          asTextArea
          style={{ height: 144 }}
        />
        <UploadImagesBlock />
      </Form>
    </div>
  )
}

setupAuthRedirect(CreateProductPage)
setupLayout(CreateProductPage)

export default CreateProductPage
