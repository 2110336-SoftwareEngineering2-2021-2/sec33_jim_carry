import { BlitzPage } from 'blitz'

import { TopBar } from 'app/core/components/TopBar'
import { setupAuthRedirect } from 'app/core/utils/setupAuthRedirect'
import { setupLayout } from 'app/core/utils/setupLayout'

const OrdersPage: BlitzPage = () => {
  return (
    <div>
      <TopBar title="Orders" largeTitle />
    </div>
  )
}

setupAuthRedirect(OrdersPage)
setupLayout(OrdersPage)

export default OrdersPage
