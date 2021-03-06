import { BlitzPage, Routes, useMutation } from 'blitz'
import { z } from 'zod'

import Form, { FORM_ERROR } from 'app/core/components/Form'
import LabeledTextField from 'app/core/components/LabeledTextField'
import { TopBar } from 'app/core/components/TopBar'
import { useGoBack } from 'app/core/hooks/useGoBack'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import createAddress from 'app/users/mutations/createAddress'
import { CreateAddress } from 'app/users/validations'

const CreateAddressPage: BlitzPage = () => {
  const [createAddressMutation] = useMutation(createAddress)
  const goBack = useGoBack(Routes.AddressesPage().pathname)

  return (
    <div>
      <TopBar backHref={Routes.AddressesPage().pathname} title="Add Address" />
      <Form
        className="py-3 px-6 flex flex-col gap-6"
        submitText="Save"
        schema={CreateAddress}
        onSubmit={async (values: z.infer<typeof CreateAddress>) => {
          try {
            await createAddressMutation(values)
            await goBack()
          } catch (error: any) {
            return { [FORM_ERROR]: error.toString() }
          }
        }}
      >
        <LabeledTextField name="name" label="Name" />
        <LabeledTextField
          name="address"
          label="Address"
          asTextArea
          style={{ height: 112 }}
        />
        <LabeledTextField name="note" label="Note" />
        <LabeledTextField name="receiverName" label="Contact Name" />
        <LabeledTextField name="phoneNo" label="Contact Number" />
      </Form>
    </div>
  )
}

setupAuthRedirect(CreateAddressPage)
setupLayout(CreateAddressPage)

export default CreateAddressPage
