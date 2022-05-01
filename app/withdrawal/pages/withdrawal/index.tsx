import {
  BlitzPage,
  formatZodError,
  invokeWithMiddleware,
  PromiseReturnType,
  Routes,
  useMutation,
  useQuery,
  useRouter,
} from 'blitz'
import { Suspense, useState } from 'react'
import { z } from 'zod'

import { SelectSection } from 'app/checkout/components/SelectSection'
import Form, { FORM_ERROR } from 'app/core/components/Form'
import { LabeledTextField } from 'app/core/components/LabeledTextField'
import { TopBar } from 'app/core/components/TopBar'
import { wrapGetServerSideProps } from 'app/core/utils'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import { FormWithdrawal } from 'app/withdrawal/formValidations'
import withdraw from 'app/withdrawal/mutations/withdraw'
import getBalance from 'app/withdrawal/queries/getBalance'
import getBankAccounts from 'app/withdrawal/queries/getBankAccounts'

interface WithdrawalPageProps {
  bankAccounts: PromiseReturnType<typeof getBankAccounts>
}

const WithdrawalPage: BlitzPage<WithdrawalPageProps> = ({ bankAccounts }) => {
  const [withdrawMutation] = useMutation(withdraw)
  const router = useRouter()
  const [bankAccountId, setBankAccountId] = useState<number | null>(null)
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
      <div className="my-6">
        <SelectSection
          sectionName="Bank account"
          items={bankAccounts}
          value={bankAccountId}
          onChange={setBankAccountId}
          title="Bank Account"
          description="Select your bank account."
          getLabel={(account) => `${account.bank} | ${account.number}`}
          addText="Add your bank account"
          addLink={Routes.CreateBankAccountPage().pathname}
        >
          {(account) => (
            <div className="flex-1 text-regular leading-normal font-regular text-ink-darkest">
              <p>{`${account.name}`}</p>
              <p>{`${account.number} | ${account.bank}`}</p>
            </div>
          )}
        </SelectSection>
      </div>
      <Form
        className="py-3 px-6 flex flex-col gap-6"
        submitText="Withdraw"
        schema={FormWithdrawal}
        onSubmit={async (values: z.infer<typeof FormWithdrawal>) => {
          if (bankAccountId === null) return
          const amount = parseInt(values.amount)
          try {
            await withdrawMutation({ amount, bankAccountId })
            router.push(Routes.FinishWithdrawalPage().pathname)
          } catch (error: any) {
            if (error instanceof z.ZodError) {
              return formatZodError(error)
            }
            return { [FORM_ERROR]: error.toString() }
          }
        }}
      >
        <LabeledTextField name="amount" label="The amount to withdraw" />
      </Form>
    </div>
  )
}

function BalanceComponent() {
  const [balance] = useQuery(getBalance, {})
  return (
    <div className="text-large leading-none font-regular"> ฿{balance} </div>
  )
}

export const getServerSideProps = wrapGetServerSideProps<WithdrawalPageProps>(
  async (context) => {
    const bankAccounts = await invokeWithMiddleware(
      getBankAccounts,
      {},
      context
    )
    return {
      props: { bankAccounts },
    }
  }
)
setupAuthRedirect(WithdrawalPage)
setupLayout(WithdrawalPage)
export default WithdrawalPage
