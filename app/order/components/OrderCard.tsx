import { Order, OrderItemSnapshot, OrderStatus, Shop } from '@prisma/client'
import { FiLayout } from 'react-icons/fi'

import { OrderProduct } from './OrderProduct'

export interface OrderCardProps {
  order: Order & { shop: Shop; items: OrderItemSnapshot[] }
}

export function OrderCard({ order }: OrderCardProps) {
  const renameStatus = (status: OrderStatus) => {
    switch (status) {
      case 'PAID':
        return 'Paid'
      case 'SHIPPED':
        return 'Shipping'
      case 'COMPLETED':
        return 'Completed'
      case 'CANCELLED':
        return 'Canceled'
      default:
        return 'Pending'
    }
  }
  return (
    <div className="flex flex-col px-6 py-3 ">
      <div className="flex flex-row items-center justify-between space-x-2">
        <FiLayout className="flex-none w-[24px] h-[24px]" />
        <p className="text-large font-bold grow truncate">{order.shop.name}</p>
        <p className="text-large font-bold text-primary-base">
          {renameStatus(order.status)}
        </p>
      </div>
      <div>
        {order.items.map((e, idx) => (
          <OrderProduct key={idx} item={e} />
        ))}
      </div>
      <div className="flex flex-row justify-between">
        <p className="text-large font-bold">Total</p>
        <p className="text-large font-bold">฿{order.totalPrice}</p>
      </div>
    </div>
  )
}
