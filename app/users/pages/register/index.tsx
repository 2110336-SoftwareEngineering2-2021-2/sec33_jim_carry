import { BlitzPage, Image, Routes } from 'blitz'

import Form, { FORM_ERROR } from 'app/core/components/Form'
import LabeledTextField from 'app/core/components/LabeledTextField'
import { TopBar } from 'app/core/components/TopBar'
import { useGoBack } from 'app/core/hooks/useGoBack'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'

const RegisterPage: BlitzPage = () => {
  // const goBack = useGoBack(Routes.FinishRegisterPage().pathname)
  return (
    <div>
      <TopBar title="Register Shop" largeTitle />
      <div className="px-6 mb-3">
        <p>Information is for identification and contact purposes.</p>
      </div>
      <div>
        {/* <Form
          className="py-3 px-6 flex flex-col gap-6"
          submitText="Continue"
          // schema={????}
          // onSubmit={async (values: z.infer<typeof ????>) => {
          //   try {
          //     // await create???Mutation(values)
          //     goNext()
          //   } catch (error: any) {
          //     return { [FORM_ERROR]: error.toString() }
          //   }
          // }}
        >
          <LabeledTextField name="First name" label="First name" />
          <LabeledTextField name="Last name" label="Last name" />
          <LabeledTextField name="Citizen ID" label="CItizen ID" />
          <LabeledTextField name="Phone number" label="Phone number" />
        </Form> */}
      </div>
    </div>
  )
}

setupAuthRedirect(RegisterPage)
setupLayout(RegisterPage)
export default RegisterPage
