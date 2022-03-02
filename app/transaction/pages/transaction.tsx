import { TransactionType } from '@prisma/client'
import { BlitzPage, Link, Routes, useQuery } from 'blitz'
import { Suspense } from 'react'

import { Button } from 'app/core/components/Button'
import { Spinner } from 'app/core/components/Spinner'
import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'
import getBalance from 'app/withdrawal/queries/getBalance'

import getTransactions from '../queries/getTransactions'

const TransactionHistory: BlitzPage = () => {
  return (
    <div>
      <TopBar
        title="My Balance"
        largeTitle
        backHref={Routes.Menu().pathname}
        actions={
          <Link href={Routes.WithdrawalPage().pathname} passHref>
            <Button as="a" size="small" buttonType="secondary">
              Withdraw
            </Button>
          </Link>
        }
      />
      <Suspense fallback={<Spinner />}>
        <TotalBalance />
        <TransactionList />
      </Suspense>
    </div>
  )
}

const TotalBalance = () => {
  const [balance] = useQuery(getBalance, null)
  return (
    <div className="flex justify-between font-medium text-large p-6">
      <span>Total Balance</span>
      <span>฿{balance}</span>
    </div>
  )
}

const TransactionList = () => {
  const [transactions] = useQuery(getTransactions, null)
  return (
    <div className="flex flex-col space-y-6">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex justify-between px-6">
          <div className="flex flex-col space-y-2">
            <span className="font-bold text-regular">
              {transaction.type === TransactionType.ORDER
                ? 'รายการโอนเข้า'
                : 'รายการถอน'}
            </span>
            <span className="font-regular text-small text-ink-dark">
              {transaction.type === TransactionType.ORDER
                ? `Order: ${transaction.orderId}`
                : `Account: xxx-x-x${transaction.bankAccount!.slice(5, 9)}-x`}
            </span>
            <span className="font-medium text-large text-primary-dark">
              {transaction.type === TransactionType.ORDER
                ? `฿${transaction.amount}`
                : `-฿${transaction.amount}`}
            </span>
          </div>
          <span className="font-regular text-tiny text-ink-light">
            {transaction.createdAt.toDateString()}
          </span>
        </div>
      ))}
    </div>
  )
}

setupAuthRedirect(TransactionHistory)
setupLayout(TransactionHistory)
export default TransactionHistory
