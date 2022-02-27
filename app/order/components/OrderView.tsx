import { useQuery } from 'blitz'
import { useMemo } from 'react'
import { FiTruck } from 'react-icons/fi'

import { EmptyState } from 'app/core/components/EmptyState'

import getOrders from '../queries/getOrders'
import { OrderCard } from './OrderCard'

export interface OrderViewProps {
  filter: number
}

export function OrderView({ filter }: OrderViewProps) {
  const status = useMemo(() => {
    switch (filter) {
      case 1:
        return 'PENDING'
      case 2:
        return 'SHIPPED'
      case 3:
        return 'COMPLETED'
      case 4:
        return 'CANCELLED'
      default:
        return 'PENDING'
    }
  }, [filter])
  const [orders] = useQuery(getOrders, {
    status: status,
  })
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
      {orders ? orders.map((e, idx) => <OrderCard key={idx} order={e} />) : ''}
    </div>
  )
}
