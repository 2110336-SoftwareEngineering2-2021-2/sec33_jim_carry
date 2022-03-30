import { Order, Shop, Transaction, User } from '@prisma/client'

export interface HistoryCardProps {
  transaction: Transaction & {
    Order: (Order & { shop: Shop }) | null
    user: User
  }
}

export function HistoryCard({ transaction }: HistoryCardProps) {
  return (
    <div className="flex flex-row justify-between px-5 py-2">
      <div className="flex flex-col">
        <p className="text-large font-bold">{transaction.user.name}</p>
        <p className="text-large font-bold">
          {transaction.type == 'ORDER' ? 'รายการโอนเข้า' : 'รายการถอน'}
        </p>
        <p>
          {transaction.type == 'ORDER'
            ? `Order: ${transaction.orderId}`
            : `Account: xxx-x-x${transaction.bankAccount!.slice(5, 9)}-x`}
        </p>
        <p className="text-primary-base text-large font-medium">
          ฿{transaction.amount}
        </p>
      </div>
      <p>{`${transaction.createdAt
        .getDay()
        .toString()
        .padStart(2, '0')}/${transaction.createdAt
        .getMonth()
        .toString()
        .padStart(2, '0')}/${transaction.createdAt.getFullYear()}
      ${transaction.createdAt
        .getHours()
        .toString()
        .padStart(2, '0')}:${transaction.createdAt
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${transaction.createdAt
        .getSeconds()
        .toString()
        .padStart(2, '0')}`}</p>
    </div>
  )
}
