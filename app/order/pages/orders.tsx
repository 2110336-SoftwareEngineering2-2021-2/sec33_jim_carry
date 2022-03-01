import { OrderStatus } from '@prisma/client'
import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  PromiseReturnType,
} from 'blitz'
import { useState } from 'react'

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
  const [value, setvalue] = useState<OrderStatus>('PENDING')
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
          <SegmentedControlItem value={'PENDING'}>Pending</SegmentedControlItem>
          <SegmentedControlItem value={'SHIPPED'}>
            Shipping
          </SegmentedControlItem>
          <SegmentedControlItem value={'COMPLETED'}>
            Completed
          </SegmentedControlItem>
          <SegmentedControlItem value={'CANCELLED'}>
            Canceled
          </SegmentedControlItem>
        </SegmentedControl>
      </div>
      <OrderView filter={value} orders={orders} />
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
