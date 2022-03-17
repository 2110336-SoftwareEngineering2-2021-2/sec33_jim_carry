import { Order, OrderItemSnapshot, OrderStatus, Shop } from '@prisma/client'
import { useMemo } from 'react'
import { FiTruck } from 'react-icons/fi'

import { EmptyState } from 'app/core/components/EmptyState'

import { OrderCard } from './OrderCard'

export interface OrderViewProps {
  orders: (Order & { shop: Shop; items: OrderItemSnapshot[] })[]
}

export function OrderView({ orders }: OrderViewProps) {
  if (orders.length == 0) {
    return (
      <EmptyState
        icon={<FiTruck strokeWidth={0.5} size={84} />}
        title={`There are no items in your order.`}
        description={
          <>
            Start browsing now to discover our <br />
            high-quality second hand goods!
          </>
        }
      />
    )
  }
  return (
    <div className="flex flex-col divide-y divide-sky-light">
      {orders.map((e) => (
        <OrderCard key={e.id} order={e} />
      ))}
    </div>
  )
}
