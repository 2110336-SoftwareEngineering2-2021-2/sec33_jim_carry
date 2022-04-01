import { OrderStatus } from '@prisma/client'
import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  PromiseReturnType,
} from 'blitz'
import { useMemo, useState } from 'react'

import {
  SegmentedControl,
  SegmentedControlItem,
} from 'app/core/components/SegmentedControl'
import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'

import { OrderView } from '../components/OrderView'
import getOrders from '../queries/getOrders'

interface OrderPageProps {
  orders: PromiseReturnType<typeof getOrders>
}

const OrdersPage: BlitzPage<OrderPageProps> = ({ orders }) => {
  const [value, setvalue] = useState<OrderStatus>('PAID')
  const filteredOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        order.status === value ||
        (order.status === 'REVIEWED' && value === 'COMPLETED')
    )
  }, [orders, value])
  let counts: number[] = []
  const filters = ['PAID', 'SHIPPED', 'COMPLETED', 'CANCELLED']
  filters.forEach((filter) => {
    counts.push(
      orders.filter(
        (order) =>
          order.status === filter ||
          (order.status === 'REVIEWED' && filter === 'COMPLETED')
      ).length
    )
  })
  return (
    <div>
      <TopBar title="My Orders" largeTitle />
      <div className="pt-4 pb-3 px-6">
        <SegmentedControl
          value={value}
          onChange={(newvalue) => {
            setvalue(newvalue)
          }}
        >
          <SegmentedControlItem value={'PAID'}>
            {`Paid (${counts[0]})`}
          </SegmentedControlItem>
          <SegmentedControlItem value={'SHIPPED'}>
            {`Shipping (${counts[1]})`}
          </SegmentedControlItem>
          <SegmentedControlItem value={'COMPLETED'}>
            {`Completed (${counts[2]})`}
          </SegmentedControlItem>
          <SegmentedControlItem value={'CANCELLED'}>
            {`Canceled (${counts[3]})`}
          </SegmentedControlItem>
        </SegmentedControl>
      </div>
      <OrderView orders={filteredOrders} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<OrderPageProps> = async (
  context
) => {
  const orders = await invokeWithMiddleware(getOrders, {}, context)
  return {
    props: { orders },
  }
}

setupAuthRedirect(OrdersPage)
setupLayout(OrdersPage)

export default OrdersPage
