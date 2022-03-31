import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  PromiseReturnType,
} from 'blitz'
import { Suspense, useMemo, useState } from 'react'

import { AdminHistoryView } from 'app/admin/components/AdminHistoryView'
import { Dropdownlist } from 'app/admin/components/Dropdownlist'
import getAdminTransactions from 'app/admin/queries/getAdminTransactions'
import { Spinner } from 'app/core/components/Spinner'
import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'

interface AdminTransactionHistoryProps {
  transactions: PromiseReturnType<typeof getAdminTransactions>
}

const AdminTransactionHistory: BlitzPage<AdminTransactionHistoryProps> = ({
  transactions,
}) => {
  var months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  var years: string[] = []
  for (let i = 2020; i <= new Date().getFullYear(); i++) {
    years.push(i.toString())
  }
  const [selectedMonth, setSelectedMonth] = useState(
    months[new Date().getMonth()]
  )
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  )
  var filteredTransactions = useMemo(() => {
    return transactions.filter(
      (transaction) =>
        transaction.createdAt.getFullYear().toString() === selectedYear &&
        transaction.createdAt.toLocaleDateString('default', {
          month: 'long',
        }) === selectedMonth
    )
  }, [transactions, selectedYear, selectedMonth])
  return (
    <div>
      <TopBar title="Payment History" largeTitle />
      <div className="flex flex-row items-center space-x-3 px-5 pb-2">
        <p className="font-bold w-24">Filter month</p>
        <Dropdownlist
          data={months}
          firstVal={selectedMonth ?? 'January'}
          onChange={(e) => setSelectedMonth(e)}
        />
      </div>
      <div className="flex flex-row items-center space-x-3 px-5 pb-4">
        <p className="font-bold w-24">Filter year</p>
        <Dropdownlist
          data={years}
          firstVal={selectedYear ?? '2020'}
          onChange={(e) => setSelectedYear(e)}
        />
      </div>
      <AdminHistoryView transactions={filteredTransactions} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<
  AdminTransactionHistoryProps
> = async (context) => {
  const transactions = await invokeWithMiddleware(
    getAdminTransactions,
    {},
    context
  )
  return {
    props: { transactions },
  }
}

setupAuthRedirect(AdminTransactionHistory)
setupLayout(AdminTransactionHistory)
export default AdminTransactionHistory
