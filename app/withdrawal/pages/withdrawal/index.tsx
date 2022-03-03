import { RadioGroup } from '@headlessui/react'
import {
  BlitzPage,
  formatZodError,
  Routes,
  useMutation,
  useQuery,
  useRouter,
} from 'blitz'
import { Suspense, useState } from 'react'
import { z } from 'zod'

import { Button } from 'app/core/components/Button'
import Form, { FORM_ERROR } from 'app/core/components/Form'
import { LabeledTextField } from 'app/core/components/LabeledTextField'
import { RadioOption } from 'app/core/components/RadioOption'
import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import { FormWithdrawal } from 'app/withdrawal/formValidations'
import withdraw from 'app/withdrawal/mutations/withdraw'
import getBalance from 'app/withdrawal/queries/getBalance'

function BalanceComponent() {
  const [balance] = useQuery(getBalance, {})
  return (
    <div className="text-large leading-none font-regular"> ฿{balance} </div>
  )
}

const banks = [
  { id: 1, name: 'กสิกรไทย' },
  { id: 2, name: 'กรุงเทพ' },
  { id: 3, name: 'กรุงศรี' },
  { id: 4, name: 'ซีไอเอ็มบี' },
  { id: 5, name: 'ทหารไทยธนชาต' },
  { id: 6, name: 'ไทยพาณิชย์' },
]

const WithdrawalPage: BlitzPage = () => {
  const [bankId, setBankId] = useState(banks[0]?.id)
  const [withdrawalState, setWithdrawalState] = useState(0)
  const [withdrawMutation] = useMutation(withdraw)
  const router = useRouter()
  return (
    <div>
      <TopBar
        title="Withdrawal"
        largeTitle
        backHref={Routes.TransactionHistory().pathname}
      />
      <Suspense fallback="null">
        <div className="px-6 my-3 flex flex-row justify-between">
          <div className="font-medium leading-none text-large">
            Total Balance :
          </div>
          <BalanceComponent />
        </div>
      </Suspense>
      {withdrawalState === 0 && (
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
              <RadioOption key={item.id} value={item.id}>
                {item.name}
              </RadioOption>
            ))}
          </RadioGroup>
          <div className="px-6 my-8">
            <Button fullWidth onClick={() => setWithdrawalState(1)}>
              Continue
            </Button>
          </div>
        </>
      )}
      {withdrawalState === 1 && (
        <Form
          className="py-3 px-6 flex flex-col gap-6"
          submitText="Withdraw"
          schema={FormWithdrawal}
          onSubmit={async (values: z.infer<typeof FormWithdrawal>) => {
            try {
              const bank = banks[(bankId ? bankId : 1) - 1]!.name
              const vals = {
                bankAccount: values.bankAccount,
                amount: Number(values.amount),
                bank,
              }
              await withdrawMutation(vals)
              router.push(Routes.FinishWithdrawalPage().pathname)
              setWithdrawalState(0)
            } catch (error: any) {
              if (error instanceof z.ZodError) {
                return formatZodError(error)
              }
              return { [FORM_ERROR]: error.toString() }
            }
          }}
        >
          <LabeledTextField name="bankAccount" label="Account number" />
          <LabeledTextField name="amount" label="The amount to withdraw" />
        </Form>
      )}
    </div>
  )
}

setupAuthRedirect(WithdrawalPage)
setupLayout(WithdrawalPage)
export default WithdrawalPage
