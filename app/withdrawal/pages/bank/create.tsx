import { RadioGroup } from '@headlessui/react'
import { BlitzPage, Routes, useMutation } from 'blitz'
import { useState } from 'react'
import { z } from 'zod'

import Form, { FORM_ERROR } from 'app/core/components/Form'
import LabeledTextField from 'app/core/components/LabeledTextField'
import { RadioOption } from 'app/core/components/RadioOption'
import { TopBar } from 'app/core/components/TopBar'
import { useGoBack } from 'app/core/hooks/useGoBack'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import createBankAccount, {
  CreateBankAccount,
} from 'app/withdrawal/mutations/createBankAccount'

const banks = [
  'กสิกรไทย',
  'กรุงเทพ',
  'กรุงศรี',
  'ซีไอเอ็มบี',
  'ทหารไทยธนชาต',
  'ไทยพาณิชย์',
]

const CreateBankAccountPage: BlitzPage = () => {
  const [createAddressMutation] = useMutation(createBankAccount)
  const goBack = useGoBack(Routes.WithdrawalPage().pathname)
  const [bank, setBank] = useState('')

  return (
    <div>
      <TopBar
        title="Add Bank Account"
        backHref={Routes.AddressesPage().pathname}
      />
      <div className="px-6 mt-9 mb-5 font-medium leading-none text-large">
        Choose your bank
      </div>
      <div className="mb-6">
        <RadioGroup
          className="w-full"
          value={bank}
          onChange={(newValue) => {
            setBank(newValue)
          }}
        >
          {banks.map((item) => (
            <RadioOption key={item} value={item}>
              {item}
            </RadioOption>
          ))}
        </RadioGroup>
      </div>
      <Form
        className="py-3 px-6 flex flex-col gap-6"
        submitText="Save"
        schema={CreateBankAccount}
        onSubmit={async (values: z.infer<typeof CreateBankAccount>) => {
          try {
            await createAddressMutation({ ...values, bank })
            await goBack()
          } catch (error: any) {
            return { [FORM_ERROR]: error.toString() }
          }
        }}
      >
        <LabeledTextField name="name" label="Bank Account Name" />
        <LabeledTextField name="number" label="Bank Account Number" />
      </Form>
    </div>
  )
}

setupAuthRedirect(CreateBankAccountPage)
setupLayout(CreateBankAccountPage)

export default CreateBankAccountPage
