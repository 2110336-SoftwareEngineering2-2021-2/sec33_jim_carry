import { BlitzPage } from "blitz"

import { MainPageLayout } from "app/core/layouts/MainPageLayout"

const Notifications: BlitzPage = () => {
  return <div>Notifications</div>
}

Notifications.getLayout = (page) => <MainPageLayout title="Notifications">{page}</MainPageLayout>

export default Notifications
