import { RadioGroup } from '@headlessui/react'
import { BlitzPage, Routes, useMutation, useQuery, useRouter } from 'blitz'
import { Suspense, useState } from 'react'
import { z } from 'zod'

import { Button } from 'app/core/components/Button'
import Form, { FORM_ERROR } from 'app/core/components/Form'
import { LabeledTextField } from 'app/core/components/LabeledTextField'
import { RadioOption } from 'app/core/components/RadioOption'
import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import withdraw from 'app/withdrawal/mutations/withdraw'
import getBalance from 'app/withdrawal/queries/getBalance'
import { Withdrawal } from 'app/withdrawal/validations'

function BalanceComponent() {
  const [balance] = useQuery(getBalance, {})
  return (
    <div className="text-large leading-none font-regular"> ฿{balance}.00 </div>
  )
}

const WithdrawalPage: BlitzPage = () => {
  // handcode for now this has to be useQuery
  const banks = [
    { id: 1, name: 'กสิกรไทย' },
    { id: 2, name: 'กรุงเทพ' },
    { id: 3, name: 'กรุงศรี' },
    { id: 4, name: 'ซีโอเอ็มบี' },
    { id: 5, name: 'ทหารไทยธนชาต' },
    { id: 6, name: 'ไทยพาณิชย์' },
  ]
  const [bankId, setBankId] = useState(banks[0]?.id)
  const [withdrawalState, setWithdrawalState] = useState(0)
  const [withdrawMutation] = useMutation(withdraw)
  const router = useRouter()
  return (
    <div>
      <TopBar title={'Withdrawal'} largeTitle />
      <Suspense fallback="null">
        <div className="px-6 my-3 flex flex-row justify-between">
          <div className="font-medium leading-none text-large">
            Total Balance :
          </div>
          {/* <balanceComponent></balanceComponent> */}
          <BalanceComponent />
        </div>
      </Suspense>
      {withdrawalState == 0 && (
        <>
          <div className="px-6 mt-9 mb-5 font-medium leading-none text-large">
            Choose your bank account :
          </div>
          <RadioGroup
            className="w-full"
            value={bankId}
            onChange={(newValue) => {
              setBankId(newValue)
            }}
          >
            {banks.map((item) => (
              <RadioOption key={item.id as unknown as string} value={item.id}>
                {item.name}
              </RadioOption>
            ))}
          </RadioGroup>
          <div className="px-6 my-8">
            <Button fullWidth onClick={(event) => setWithdrawalState(1)}>
              Continue
            </Button>
          </div>
        </>
      )}
      {withdrawalState == 1 && (
        <Form
          className="py-3 px-6 flex flex-col gap-6"
          submitText="Withdraw"
          schema={Withdrawal}
          onSubmit={async (values: z.infer<typeof Withdrawal>) => {
            try {
              await withdrawMutation(values)
              router.push(Routes.FinishWithdrawalPage().pathname)
              setWithdrawalState(0)
            } catch (error: any) {
              return { [FORM_ERROR]: error.toString() }
            }
          }}
        >
          <LabeledTextField name="account" label="Account number" />
          <LabeledTextField name="amount" label="The amount to withdraw" />
        </Form>
      )}
    </div>
  )
}

setupAuthRedirect(WithdrawalPage)
setupLayout(WithdrawalPage)
export default WithdrawalPage
