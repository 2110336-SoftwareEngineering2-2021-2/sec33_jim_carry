import { BlitzPage, Routes } from 'blitz'

import Form from 'app/core/components/Form'
import LabeledTextField from 'app/core/components/LabeledTextField'
import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'

const CreateProductPage: BlitzPage = () => {
  return (
    <div>
      <TopBar
        backHref={Routes.ManageProductsPage().pathname}
        title="Add Product"
      />
      <Form className="py-3 px-6 flex flex-col gap-6" submitText="Save">
        <LabeledTextField name="name" label="Product name" />
        <LabeledTextField
          name="price"
          label="Price per item (฿)"
          type="number"
        />
        <LabeledTextField
          name="stock"
          label="Number of items in stock"
          type="number"
        />
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
      </Form>
    </div>
  )
}

setupAuthRedirect(CreateProductPage)
setupLayout(CreateProductPage)

export default CreateProductPage
