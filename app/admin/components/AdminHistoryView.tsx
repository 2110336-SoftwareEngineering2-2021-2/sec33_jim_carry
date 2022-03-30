import { Order, Shop, Transaction, User } from '@prisma/client'
import { FiSearch, FiTruck } from 'react-icons/fi'

import { EmptyState } from 'app/core/components/EmptyState'

import { HistoryCard } from './HistoryCard'

export interface AdminHistoryViewProps {
  transactions: (Transaction & {
    Order: (Order & { shop: Shop }) | null
    user: User
  })[]
}

export function AdminHistoryView({ transactions }: AdminHistoryViewProps) {
  if (transactions.length === 0) {
    return (
      <EmptyState
        icon={<FiSearch strokeWidth={0.75} size={84} />}
        title={`No result`}
      />
    )
  }
  return (
    <div>
      {transactions.map((e) => (
        <HistoryCard key={e.id} transaction={e} />
      ))}
    </div>
  )
}
