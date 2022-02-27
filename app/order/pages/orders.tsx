import { BlitzPage } from 'blitz'
import { Suspense, useState } from 'react'

import {
  SegmentedControl,
  SegmentedControlItem,
} from 'app/core/components/SegmentedControl'
import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'

import { OrderView } from '../components/OrderView'

const OrdersPage: BlitzPage = () => {
  const [value, setvalue] = useState(1)
  return (
    <div>
      <TopBar title="My Orders" largeTitle />
      <div className="pt-4 pb-3 px-6">
        <SegmentedControl
          value={value}
          onChange={(newvalue) => {
            setvalue(newvalue)
            console.log(value)
          }}
        >
          <SegmentedControlItem value={1}>Pending</SegmentedControlItem>
          <SegmentedControlItem value={2}>Shipping</SegmentedControlItem>
          <SegmentedControlItem value={3}>Completed</SegmentedControlItem>
          <SegmentedControlItem value={4}>Canceled</SegmentedControlItem>
        </SegmentedControl>
      </div>
      <Suspense fallback="">
        <OrderView filter={value} />
      </Suspense>
    </div>
  )
}

setupAuthRedirect(OrdersPage)
setupLayout(OrdersPage)

export default OrdersPage
