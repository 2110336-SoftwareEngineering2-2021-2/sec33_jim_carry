import { BlitzPage, useQuery } from 'blitz'
import { Suspense } from 'react'

import { TopBar } from 'app/core/components/TopBar'
import { setupLayout } from 'app/core/utils/setupLayout'

import getTransactions from '../queries/getTransactions'

const TransactionHistory: BlitzPage = () => {
  return (
    <div>
      <TopBar />
      <Suspense fallback={null}>
        <TransactionList />
      </Suspense>
    </div>
  )
}

const TransactionList = () => {
  const [transactions] = useQuery(getTransactions, null)
  return (
    <>
      {JSON.stringify(transactions)}
      {transactions.map((transaction) => (
        <div key={transaction.id}>
          <span>{transaction.type}</span>
          <span>{transaction.amount}</span>
          <span>{transaction.Order?.shop.name}</span>
          <span>{transaction.bank}</span>
        </div>
      ))}
    </>
  )
}

setupLayout(TransactionHistory)
export default TransactionHistory
