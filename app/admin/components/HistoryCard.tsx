import { PromiseReturnType } from 'blitz'
import { format } from 'date-fns'

import getAdminTransactions from '../queries/getAdminTransactions'

export interface HistoryCardProps {
  transaction: PromiseReturnType<typeof getAdminTransactions>[number]
}

export function HistoryCard({ transaction }: HistoryCardProps) {
  return (
    <div className="flex flex-col px-4 py-2">
      <div className="flex flex-row items-center space-x-2">
        <p className="text-large font-bold grow truncate">
          {transaction.user.name}
        </p>
        <p className="text-ink-light min-w-max">
          {format(transaction.createdAt, 'dd/MM/yyyy HH:mm:ss')}
        </p>
      </div>
      <p className="text-large font-bold">
        {transaction.type == 'ORDER' ? 'รายการโอนเข้า' : 'รายการถอน'}
      </p>
      <p>
        {transaction.type == 'ORDER'
          ? `Order: ${transaction.orderId}`
          : `Account: xxx-x-x${transaction.bankAccount?.number!.slice(5, 9)}-x`}
      </p>
      <p className="text-primary-base text-large font-medium">
        ฿{transaction.amount}
      </p>
    </div>
  )
}
