import { MainPageLayout } from "app/core/layouts/MainPageLayout"
import { BlitzPage } from "blitz"

const Notifications: BlitzPage = () => {
  return <div>Notifications</div>
}

Notifications.getLayout = (page) => <MainPageLayout title="Notifications">{page}</MainPageLayout>

export default Notifications
