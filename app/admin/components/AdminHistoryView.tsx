import { useQuery } from 'blitz'

import getAdminTransactions from '../queries/getAdminTransactions'
import { HistoryCard } from './HistoryCard'

export function AdminHistoryView() {
  const [transactions] = useQuery(getAdminTransactions, {})
  console.log(transactions)

  return (
    <div>
      <ul>
        {transactions.map((e) => (
          <HistoryCard key={e.id} transaction={e} />
        ))}
      </ul>
    </div>
  )
}
