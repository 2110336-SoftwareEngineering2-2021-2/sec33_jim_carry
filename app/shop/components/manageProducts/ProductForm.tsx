import { z } from 'zod'

import Form, { FORM_ERROR } from 'app/core/components/Form'
import LabeledTextField from 'app/core/components/LabeledTextField'
import { ProductFormValues } from 'app/product/validations'
import { UploadImagesBlock } from 'app/shop/components/manageProducts/UploadImagesBlock'

interface ProductFormProps {
  onSubmit: (ProductFormValues) => void
  initialValues?: z.infer<typeof ProductFormValues>
}

export const ProductForm = ({ onSubmit, initialValues }: ProductFormProps) => {
  return (
    <Form
      className="py-3 px-6 flex flex-col gap-6"
      submitText="Save"
      schema={ProductFormValues}
      initialValues={initialValues}
      onSubmit={async (values: z.infer<typeof ProductFormValues>) => {
        try {
          await onSubmit(values)
        } catch (error: any) {
          return { [FORM_ERROR]: error.toString() }
        }
      }}
    >
      <LabeledTextField name="name" label="Product name" />
      <LabeledTextField
        name="price"
        label="Price per item (฿)"
        type="number"
        step="0.01"
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
      <UploadImagesBlock />
    </Form>
  )
}
