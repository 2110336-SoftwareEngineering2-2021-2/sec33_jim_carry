import { Order } from '@prisma/client'
import {
  BlitzPage,
  GetServerSideProps,
  invokeWithMiddleware,
  PromiseReturnType,
} from 'blitz'
import { useMemo, useState } from 'react'
import { FiTruck } from 'react-icons/fi'

import { EmptyState } from 'app/core/components/EmptyState'
import {
  SegmentedControl,
  SegmentedControlItem,
} from 'app/core/components/SegmentedControl'
import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'

import { isProcessed } from '../../core/utils/isProcessed'
import { ShopOrderCard } from '../components/shopOrderCard'
import getShopOrders from '../queries/getShopOrders'

interface ShopOrderProps {
  shopOrders: PromiseReturnType<typeof getShopOrders>
}

const ShopOrderPage: BlitzPage<ShopOrderProps> = ({ shopOrders }) => {
  const [value, setValue] = useState('to process')
  const { toProcess, processed } = useMemo(() => {
    const processed = shopOrders.filter((order) => isProcessed(order))
    const toProcess = shopOrders.filter((order) => !isProcessed(order))
    return { toProcess, processed }
  }, [shopOrders])
  const orders =
    value === 'all'
      ? shopOrders
      : value === 'to process'
      ? toProcess
      : processed
  return (
    <div>
      <TopBar title="Ordered Products" largeTitle />
      <div className="p-6 pb-2">
        <SegmentedControl
          value={value}
          onChange={(newValue) => setValue(newValue)}
        >
          <SegmentedControlItem value="all">{`All (${shopOrders.length})`}</SegmentedControlItem>
          <SegmentedControlItem value="to process">
            {`To Process (${toProcess.length})`}
          </SegmentedControlItem>
          <SegmentedControlItem value="processed">{`Processed (${processed.length})`}</SegmentedControlItem>
        </SegmentedControl>
      </div>
      <ShopOrderList shopOrders={orders} value={value} />
    </div>
  )
}
const ShopOrderList = ({ shopOrders, value }) => {
  if (shopOrders.length === 0) {
    return (
      <EmptyState
        icon={<FiTruck strokeWidth={0.5} size={84} />}
        title={`There are no ${value === 'all' ? '' : `${value} `}orders.`}
      />
    )
  }
  return (
    <div className="flex flex-col p-6 space-y-6">
      {shopOrders.map((order) => (
        <ShopOrderCard key={order.id} order={order} />
      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<ShopOrderProps> = async (
  context
) => {
  const shopOrders = await invokeWithMiddleware(getShopOrders, {}, context)
  return {
    props: { shopOrders },
  }
}

setupAuthRedirect(ShopOrderPage)
setupLayout(ShopOrderPage)

export default ShopOrderPage
