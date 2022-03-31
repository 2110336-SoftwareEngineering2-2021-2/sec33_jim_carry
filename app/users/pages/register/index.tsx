import { BlitzPage, Routes, useMutation, useRouter } from 'blitz'
import { z } from 'zod'

import Form, { FORM_ERROR } from 'app/core/components/Form'
import LabeledTextField from 'app/core/components/LabeledTextField'
import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import createShop from 'app/shop/mutations/createShop'
import { CreateShop } from 'app/shop/validations'

const RegisterPage: BlitzPage = () => {
  const router = useRouter()
  const [createShopMutation] = useMutation(createShop)
  return (
    <div>
      <TopBar title="Register Shop" largeTitle />
      <div className="px-6 mb-3">
        <p>Information is for identification and contact purposes.</p>
      </div>
      <div>
        <Form
          className="py-3 px-6 flex flex-col gap-6"
          submitText="Continue"
          schema={CreateShop}
          onSubmit={async (values: z.infer<typeof CreateShop>) => {
            try {
              await createShopMutation(values)
              router.push(Routes.UploadIdPage().pathname)
            } catch (error: any) {
              return { [FORM_ERROR]: error.toString() }
            }
          }}
        >
          <LabeledTextField name="name" label="Shop name" />
          <LabeledTextField
            name="bio"
            label="Shop description"
            asTextArea
            style={{ height: 112 }}
          />
          <LabeledTextField name="citizenId" label="Citizen ID" />
          <LabeledTextField name="phoneNo" label="Phone number" />
        </Form>
      </div>
    </div>
  )
}

setupAuthRedirect(RegisterPage)
setupLayout(RegisterPage)
export default RegisterPage
